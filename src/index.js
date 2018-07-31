import program from 'commander'

import setUpCommands from './commands'

program
  .version('0.0.1')
  .description('Download file from http, ftp, sftp protocols')

setUpCommands(program)

program.parse(process.argv)
