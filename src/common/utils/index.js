import FileSystemUtils from './FileSystemUtils'

export default {
  handleErrorAndRemoveFile(error, filePath) {
    FileSystemUtils.removeFilePathIfAnyErrorOccure(filePath)
    console.log(error)
  }
}
