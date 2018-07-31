import { expect } from 'chai'
import path from 'path'
import fs from 'fs'

import FileSystemUtils from '../../../src/common/utils/FileSystemUtils'

import inputData from '../../fixtures/inputData'

describe('FileSystemUtils', () => {
  const { folderName } = inputData

  describe('isExists()', () => {
    it('file exists', () => {
      const filePath = path.resolve(__dirname, 'FileSystemUtils.test.js')
      const result = FileSystemUtils.isExists(filePath)

      expect(result).to.be.true
    })

    it('file is not exist', () => {
      const filePath = path.resolve(__dirname, 'FileSystemUtils.js')
      const result = FileSystemUtils.isExists(filePath)

      expect(result).to.be.false
    })
  })

  it('createFolder()', () => {
    const folderPath = path.resolve(__dirname, folderName)
    FileSystemUtils.createFolder(folderPath)

    const result = fs
      .readdirSync(__dirname)
      .find(folder => folder === folderName)

    expect(result).to.be.eq(folderName)
    fs.rmdirSync(folderPath)
  })

  describe('setUpTargetFolderToSaveFile()', () => {
    it('folder exists', () => {
      const testExistsFolderName = 'test exist folder'
      const targetFolder = path.resolve(__dirname, testExistsFolderName)

      fs.mkdirSync(targetFolder)
      FileSystemUtils.setUpTargetFolderToSaveFile(targetFolder)

      const result = fs
        .readdirSync(__dirname)
        .find(folder => folder === testExistsFolderName)

      expect(result).to.be.eq(testExistsFolderName)
      fs.rmdirSync(targetFolder)
    })
  })

  describe('removeFilePathIfAnyErrorOccure()', () => {
    it('file exists', () => {
      const { fileNameWithExtName } = inputData
      const targetFilePath = path.resolve(__dirname, fileNameWithExtName)
      fs.writeFileSync(targetFilePath, 'Test write file')

      FileSystemUtils.removeFilePathIfAnyErrorOccure(targetFilePath)

      const result = fs
        .readdirSync(__dirname)
        .find(file => file === fileNameWithExtName)

      expect(result).to.be.undefined
    })
  })
})
