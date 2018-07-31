export default {
  multipleUrls:
    'ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt,https://www.sample-videos.com/text/Sample-text-file-50kb.txt, https://images.unsplash.com/photo-1532753876631-2d5cf129df39',
  expectedUrlLists: [
    'ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt',
    'https://www.sample-videos.com/text/Sample-text-file-50kb.txt',
    'https://images.unsplash.com/photo-1532753876631-2d5cf129df39'
  ],
  singleUrlWithoutExtName:
    'https://images.unsplash.com/photo-1532753876631-2d5cf129df39',
  singleUrlWithExtName: 'http://ipv4.download.thinkbroadband.com/5MB.zip',
  ftpUrlWithUserAndPass: 'ftp://test:test1234@localhost:21/testfile.txt',
  ftpUrl: 'ftp://ftp.funet.fi/pub/standards/RFC/rfc959.txt',
  folderName: 'test',
  fileNameWithoutExtName: 'testFileName',
  fileNameWithExtName: 'testFileName.txt'
}
