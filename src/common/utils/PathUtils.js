import path from 'path'
import mime from 'mime-types'

import UrlUtils from './UrlUtils'

export default {
  getTargetFolderByName(name) {
    return path.resolve(name)
  },
  getFilePathWithExtname(folderName, fileName, contentType) {
    const extname = mime.extension(contentType)

    return path.resolve(
      this.getTargetFolderByName(folderName),
      `${fileName}.${extname}`
    )
  },
  getFilePath(folderName, fileName) {
    return path.resolve(this.getTargetFolderByName(folderName), fileName)
  }
}
