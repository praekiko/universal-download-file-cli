import { expect } from 'chai'
import fs from 'fs'
import path from 'path'

import CommonUtils from '../../../src/common/utils/index'

import inputData from '../../fixtures/inputData'

describe('CommonUtils', () => {
  it('handleErrorAndRemoveFile()', () => {
    const { fileNameWithExtName } = inputData
    const filePath = path.resolve(__dirname, fileNameWithExtName)
    fs.writeFileSync(filePath, 'Test write file')

    CommonUtils.handleErrorAndRemoveFile('error text', filePath)

    const removedFile = fs
      .readdirSync(__dirname)
      .find(file => file === fileNameWithExtName)

    expect(removedFile).to.be.undefined
  })
})
