import { prompt } from 'inquirer'

import questions from './questions'
import actions from './actions'

export default program => {
  program
    .command('download')
    .alias('d')
    .description('Download file from url to specific folder')
    .action(() => {
      prompt(questions).then(answers => actions(answers))
    })

  return program
}
