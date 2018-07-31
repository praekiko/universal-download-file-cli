import fs from 'fs'

import PathUtils from '../../common/utils/PathUtils'

export default folderName => {
  const targetPath = PathUtils.getTargetFolderByName(folderName)

  fs.readdir(targetPath, function(error, items) {
    if (error) {
      throw new Error(error)
    }

    if (items.length === 0) {
      console.log('No file in this folder')
    } else {
      items.forEach(item => {
        console.log(item)
      })
    }
  })
}
