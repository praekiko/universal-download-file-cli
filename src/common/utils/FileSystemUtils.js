import fs from 'fs'

export default {
  isExists(path) {
    return fs.existsSync(path)
  },
  createFolder(path) {
    console.log(`${path} folder doesn't exist`)
    console.log('start creating new folder')
    fs.mkdirSync(path)
  },
  removeFile(path) {
    fs.unlinkSync(path)
  },
  setUpTargetFolderToSaveFile(targetFolder) {
    if (!this.isExists(targetFolder)) {
      this.createFolder(targetFolder)
    }
  },
  removeFilePathIfAnyErrorOccure(targetFilePath) {
    if (this.isExists(targetFilePath)) {
      this.removeFile(targetFilePath)
    }
  }
}
