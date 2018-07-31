import fs from 'fs'
import request from 'request'
import path from 'path'

import ProgressBar from '../ProgressBar'

import PathUtils from './PathUtils'
import FileSystemUtils from './FileSystemUtils'
import UrlUtils from './UrlUtils'
import CommonUtils from './index'

export const getTargetFilePath = (url, folderName, response) => {
  const fileName = UrlUtils.getFileNameFromUrl(url)

  if (path.extname(fileName)) {
    return PathUtils.getFilePath(folderName, fileName)
  } else {
    const { headers } = response
    const contentType = headers['content-type']

    return PathUtils.getFilePathWithExtname(folderName, fileName, contentType)
  }
}

const download = (url, folderName) => {
  const targetFolder = PathUtils.getTargetFolderByName(folderName)
  FileSystemUtils.setUpTargetFolderToSaveFile(targetFolder)

  const progressBar = new ProgressBar()
  let targetFilePath

  const requestPromise = new Promise((resolve, reject) => {
    request
      .get({ url, timeout: 3000 })
      .on('error', error => {
        CommonUtils.handleErrorAndRemoveFile(error, targetFilePath)
      })
      .on('finish', () => {
        return { success: true }
      })
      .on('response', response => {
        targetFilePath = getTargetFilePath(url, folderName, response)

        if (FileSystemUtils.isExists(targetFilePath)) {
          reject(`${targetFilePath} is already downloaded`)
        } else {
          const { headers } = response
          const totalLength = headers['content-length']
          progressBar.init(totalLength, url)

          response.pause()
          resolve(response)
        }
      })
  })

  requestPromise
    .then(response => {
      return response
        .on('data', data => {
          progressBar.tick(data.length)
        })
        .pipe(fs.createWriteStream(targetFilePath))
    })
    .catch(error => {
      console.log(error)
    })

  return requestPromise
}

export default {
  download,
  getTargetFilePath
}
