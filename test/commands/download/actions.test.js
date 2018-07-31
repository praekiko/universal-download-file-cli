import { expect } from 'chai'
import sinon from 'sinon'

import HttpUtils from '../../../src/common/utils/HttpUtils'
import FtpUtils from '../../../src/common/utils/FtpUtils'
import { downloadFileFromProtocol } from '../../../src/commands/download/actions'

import inputData from '../../fixtures/inputData'

describe('download actions', () => {
  const { multipleUrls, folderName } = inputData

  describe('downloadFileFromProtocol()', () => {
    let httpDownloadStub
    let ftpDownloadStub

    beforeEach(() => {
      httpDownloadStub = sinon
        .stub(HttpUtils, 'download')
        .returns(Promise.resolve({}))

      ftpDownloadStub = sinon
        .stub(FtpUtils, 'download')
        .returns(Promise.resolve({}))
    })

    afterEach(() => {
      httpDownloadStub.restore()
      ftpDownloadStub.restore()
    })

    it('http:', () => {
      downloadFileFromProtocol('http:', multipleUrls, folderName)
      expect(httpDownloadStub.calledOnce)
    })

    it('https:', () => {
      downloadFileFromProtocol('https:', multipleUrls, folderName)
      expect(httpDownloadStub.calledOnce)
    })

    it('ftp:', () => {
      downloadFileFromProtocol('ftp:', multipleUrls, folderName)
      expect(ftpDownloadStub.calledOnce)
    })

    it('sftp:', () => {
      downloadFileFromProtocol('sftp:', multipleUrls, folderName)
      expect(ftpDownloadStub.calledOnce)
    })

    it('no matched protocol', () => {
      const protocol = 'abc:'

      const result = downloadFileFromProtocol(
        protocol,
        multipleUrls,
        folderName
      )
      expect(result).to.equal(`This ${protocol} protocol doesn't supported`)
    })
  })
})
