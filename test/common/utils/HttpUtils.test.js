import { expect } from 'chai'
import sinon from 'sinon'
import path from 'path'
import fs from 'fs'
import request from 'request'

import HttpUtils from '../../../src/common/utils/HttpUtils'
import FileSystemUtils from '../../../src/common/utils/FileSystemUtils'

import inputData from '../../fixtures/inputData'
import StreamMock from '../../fixtures/StreamMock'

describe('HttpUtils', () => {
  const {
    singleUrlWithExtName,
    singleUrlWithoutExtName,
    folderName
  } = inputData

  const response = {
    headers: {
      ['content-type']: 'image/jpeg'
    }
  }

  describe('download()', () => {
    let FileSystemUtilsStub
    let fsStub
    let requestStub
    let requestStreamMock

    beforeEach(() => {
      requestStreamMock = new StreamMock()

      FileSystemUtilsStub = sinon
        .stub(FileSystemUtils, 'setUpTargetFolderToSaveFile')
        .returns('success')
      fsStub = sinon.stub(fs, 'createWriteStream').returns('success')
      requestStub = sinon.stub(request, 'get').returns(requestStreamMock)
    })

    afterEach(() => {
      FileSystemUtilsStub.restore()
      fsStub.restore()
      requestStub.restore()
    })

    it('on success', () => {
      // Emit the async finish event
      setTimeout(() => {
        requestStreamMock.emit('finish')
      }, 0)

      const result = HttpUtils.download(singleUrlWithExtName, folderName)

      result.then(response => {
        sinon.assert.calledOnce(FileSystemUtilsStub)
        sinon.assert.calledOnce(fsStub)
        sinon.assert.calledOnce(requestStub)
        expect(response).to.be.eq(Promise.resolve)
      })
    })

    it('on error', () => {
      // Emit the async error event
      setTimeout(() => {
        requestStreamMock.emit('error', 'testError')
      }, 0)

      const result = HttpUtils.download(singleUrlWithExtName, folderName)
      result.catch(error => {
        sinon.assert.calledOnce(FileSystemUtilsStub)
        sinon.assert.calledOnce(fsStub)
        sinon.assert.calledOnce(requestStub)
        expect(error).to.be.eq('testError')
      })
    })
  })

  describe('getTargetFilePath()', () => {
    it('url already have extname', () => {
      const result = HttpUtils.getTargetFilePath(
        singleUrlWithExtName,
        folderName,
        response
      )

      const expectedPath = path.resolve(folderName, '5MB.zip')

      expect(result).to.be.eq(expectedPath)
    })

    it(`url doesn't have extname`, () => {
      const result = HttpUtils.getTargetFilePath(
        singleUrlWithoutExtName,
        folderName,
        response
      )

      const expectedPath = path.resolve(
        folderName,
        'photo-1532753876631-2d5cf129df39.jpeg'
      )

      expect(result).to.be.eq(expectedPath)
    })
  })
})
