import { expect } from 'chai'
import sinon from 'sinon'
import path from 'path'
import fs from 'fs'
import ftp from 'ftp'

import FtpUtils from '../../../src/common/utils/FtpUtils'

import inputData from '../../fixtures/inputData'

describe('FtpUtils', () => {
  const { ftpUrl, folderName } = inputData

  describe('getTargetFilePath()', () => {
    const result = FtpUtils.getTargetFilePath(ftpUrl, folderName)

    const expectedPath = path.resolve(folderName, 'rfc959.txt')

    expect(result).to.be.eq(expectedPath)
  })
})
