import progress from 'progress'

import UrlUtils from './utils/UrlUtils'

class ProgressBar {
  constructor(length) {
    this.bar
  }

  init(length, url) {
    const totalLength = parseInt(length, 10)
    const fileName = UrlUtils.getFileNameFromUrl(url)

    this.bar = new progress(`Downloading ${fileName} [:bar] :percent`, {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: totalLength
    })
  }

  tick(length) {
    this.bar.tick(length)
  }
}

export default ProgressBar
