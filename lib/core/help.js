
const program = require('commander')

const helpOptions = ()=>{
  program.option('-w --why', 'a why cli')
  program.option('-d --dest <dest>', 'a destination folder, 例如: -d src/pages, 错误/src/pages')
  program.option('-f --framework <framework>', 'your frameword')
}

module.exports=helpOptions
