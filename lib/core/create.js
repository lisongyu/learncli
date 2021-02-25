const program = require('commander')

const {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
} = require('./actions')
const createCommands = () => {
  program
    .command('create <project> [others...]')
    .description('clone a repository into a folder')
    .action(createProjectAction);

  program
    .command('addcpn <name>')
    .description('add vue component,例如:lsy addcpn HelloWorld -d src/components')
    .action((name) => {
      addComponentAction(name, program.dest || 'src/components')
    })


  program
    .command('addpage <page>')
    .description('add vue page and router config,例如:lsy addpage Home [-d src/page]')

    .action((page) => {
      console.log(program._optionValues.dest)
      console.log('我是获取的值')
      addPageAndRouteAction(page, program._optionValues.dest || 'src/pages')
    })
  

    program
    .command('addstore <store>')
    .description('add vue component,例如:lsy addcpn HelloWorld -d src/components')
    .action((store) => {
      addStoreAction(store, program.dest || 'src/store/modules')
    })


}

module.exports = createCommands