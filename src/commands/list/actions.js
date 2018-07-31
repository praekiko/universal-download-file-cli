import fs from 'fs'

import PathUtils from '../../common/utils/PathUtils'

export default folderName => {
  const targetPath = PathUtils.getTargetFolderByName(folderName)

  fs.readdir(targetPath, function(error, items) {
    items.forEach(item => {
      console.log(item)
    })
  })
}
