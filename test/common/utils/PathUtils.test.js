import { expect } from 'chai'
import path from 'path'

import PathUtils from '../../../src/common/utils/PathUtils'

import inputData from '../../fixtures/inputData'

describe('PathUtils', () => {
  const { folderName, fileNameWithoutExtName, fileNameWithExtName } = inputData

  it('getTargetFolderByName()', () => {
    const result = PathUtils.getTargetFolderByName(fileNameWithExtName)

    expect(result).to.be.eq(path.resolve(fileNameWithExtName))
  })

  it('getFilePathWithExtname()', () => {
    const contentType = 'image/jpeg'
    const result = PathUtils.getFilePathWithExtname(
      folderName,
      fileNameWithoutExtName,
      contentType
    )

    expect(result).to.be.eq(
      path.resolve(folderName, `${fileNameWithoutExtName}.jpeg`)
    )
  })

  it('getFilePath()', () => {
    const result = PathUtils.getFilePath(folderName, fileNameWithExtName)

    expect(result).to.be.eq(path.resolve(folderName, fileNameWithExtName))
  })
})
