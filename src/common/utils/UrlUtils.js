import path from 'path'
import { URL } from 'url'

export default {
  getSeperatedUrlLists(urls) {
    return urls.split(/\s*,\s*/)
  },
  getProtocolFromUrl(url) {
    const urlObject = new URL(url)
    return urlObject.protocol
  },
  getFileNameFromUrl(url) {
    return path.basename(url)
  },
  getPathnameFromUrl(url) {
    const urlObject = new URL(url)
    return urlObject.pathname
  },
  getFtpConnectionOptions(url) {
    const urlObject = new URL(url)
    const options = {
      host: urlObject.hostname,
      port: urlObject.port || 21,
      keepalive: 3000
    }

    if (urlObject.username) {
      options.user = urlObject.username
    }

    if (urlObject.password) {
      options.password = urlObject.password
    }

    return options
  }
}
