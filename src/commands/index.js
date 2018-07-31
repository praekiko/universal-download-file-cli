import setUpDownloadCommand from './download'
import setUpListCommand from './list'

export default program => {
  setUpDownloadCommand(program)
  setUpListCommand(program)
}
