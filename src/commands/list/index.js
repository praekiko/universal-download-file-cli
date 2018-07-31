import actions from './actions'

export default program => {
  program
    .command('list <folderName>')
    .alias('ls')
    .description('List all files in folder')
    .action(folderName => actions(folderName))

  return program
}
