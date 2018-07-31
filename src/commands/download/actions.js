import HttpUtils from '../../common/utils/HttpUtils'
import UrlUtils from '../../common/utils/UrlUtils'
import FtpUtils from '../../common/utils/FtpUtils'

export const downloadFileFromProtocol = (protocol, url, folderName) => {
  switch (protocol) {
    case 'http:':
      HttpUtils.download(url, folderName)
      break
    case 'https:':
      HttpUtils.download(url, folderName)
      break
    case 'ftp:':
      FtpUtils.download(url, folderName)
      break
    case 'sftp:':
      FtpUtils.download(url, folderName)
      break
    default:
      console.log(`This ${protocol} protocol doesn't supported`)
      return `This ${protocol} protocol doesn't supported`
      break
  }
}

export default ({ urls, folderName }) => {
  const urlLists = UrlUtils.getSeperatedUrlLists(urls)

  urlLists.forEach(url => {
    const protocol = UrlUtils.getProtocolFromUrl(url)

    downloadFileFromProtocol(protocol, url, folderName)
  })
}
