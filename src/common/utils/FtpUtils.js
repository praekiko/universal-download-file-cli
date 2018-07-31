import fs from 'fs'
import ftp from 'ftp'

import ProgressBar from '../ProgressBar'

import PathUtils from './PathUtils'
import FileSystemUtils from './FileSystemUtils'
import UrlUtils from './UrlUtils'
import CommonUtils from './index'

const getTargetFilePath = (url, folderName) => {
  const fileName = UrlUtils.getFileNameFromUrl(url)

  return PathUtils.getFilePath(folderName, fileName)
}

const download = (url, folderName) => {
  const targetFolder = PathUtils.getTargetFolderByName(folderName)
  FileSystemUtils.setUpTargetFolderToSaveFile(targetFolder)

  const progressBar = new ProgressBar()
  const targetFilePath = getTargetFilePath(url, folderName)
  const pathname = UrlUtils.getPathnameFromUrl(url)

  const ftpConnection = new ftp()
  const ftpPromise = new Promise((resolve, reject) => {
    ftpConnection.on('ready', () => {
      ftpConnection.list(pathname, (error, list) => {
        if (FileSystemUtils.isExists(targetFilePath)) {
          reject(`${targetFilePath} is already downloaded`)
          ftpConnection.destroy()
        } else {
          const totalLength = list.find(
            resultList => resultList.name === pathname
          ).size
          progressBar.init(totalLength, url)

          resolve(ftpConnection)
        }
      })
    })
  })

  ftpPromise
    .then(ftpConnection => {
      return ftpConnection.get(pathname, (error, stream) => {
        stream
          .on('data', data => {
            progressBar.tick(data.length)
          })
          .on('error', error => {
            CommonUtils.handleErrorAndRemoveFile(error, targetFilePath)
            ftpConnection.destroy()
          })
          .on('close', () => {
            ftpConnection.end()
          })
          .pipe(fs.createWriteStream(targetFilePath))
      })
    })
    .catch(error => console.log(error))

  const connectionOptions = UrlUtils.getFtpConnectionOptions(url)
  ftpConnection.connect(connectionOptions)
}

export default {
  download,
  getTargetFilePath
}
