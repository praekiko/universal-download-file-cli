import { expect } from 'chai'
import { URL } from 'url'
import path from 'path'

import UrlUtils from '../../../src/common/utils/UrlUtils'

import inputData from '../../fixtures/inputData'

describe('UrlUtils', () => {
  const { multipleUrls, expectedUrlLists, singleUrlWithExtName } = inputData

  it('getSeperatedUrlLists()', () => {
    const result = UrlUtils.getSeperatedUrlLists(multipleUrls)

    expect(result).to.be.deep.eq(expectedUrlLists)
  })

  it('getProtocolFromUrl()', () => {
    const result = UrlUtils.getProtocolFromUrl(singleUrlWithExtName)

    expect(result).to.be.deep.eq('http:')
  })

  it('getFileNameFromUrl()', () => {
    const result = UrlUtils.getFileNameFromUrl(singleUrlWithExtName)

    expect(result).to.be.deep.eq('5MB.zip')
  })

  it('getPathnameFromUrl()', () => {
    const result = UrlUtils.getPathnameFromUrl(singleUrlWithExtName)

    expect(result).to.be.deep.eq('/5MB.zip')
  })

  describe('getFtpConnectionOptions', () => {
    it('options for ftp link with username & password', () => {
      const { ftpUrlWithUserAndPass } = inputData

      const result = UrlUtils.getFtpConnectionOptions(ftpUrlWithUserAndPass)
      const expectedOptions = {
        host: 'localhost',
        port: 21,
        keepalive: 3000,
        user: 'test',
        password: 'test1234'
      }

      expect(result).to.be.deep.eq(expectedOptions)
    })

    it('options for ftp link without username & password', () => {
      const { ftpUrl } = inputData

      const result = UrlUtils.getFtpConnectionOptions(ftpUrl)
      const expectedOptions = {
        host: 'ftp.funet.fi',
        port: 21,
        keepalive: 3000
      }

      expect(result).to.be.deep.eq(expectedOptions)
    })
  })
})
