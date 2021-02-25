const program = require('commander')
const { promisify } = require('util')
const path = require('path')
// callback -> promisify(函数) -> Promise -> async await
const download = promisify(require('download-git-repo'))
const open = require('open')
const { commandSpawn } = require('../utils/terminal')
const { vueRepo } = require('../config/repo-config')
const { compile, 
  writeToFile,
  createDirSync } = require('../utils/utils')
const createProjectAction = async (project, others) => {
  console.log(project, others)
  console.log('help you create you project')
  // 创建create
  // 1.clone项目


  await download(vueRepo, project, { clone: true });
  // 2.执行npm i
  const command = process.platform === 'win32' ? 'npm.cmd' : 'npm'
  await commandSpawn(command, ['install'], { cwd: `./${project}` })

  // 3. 运行npm run serve
  commandSpawn(command, ['run', 'serve'], { cwd: `./${project}` })
  // 4.打开浏览器
  open('http://localhost:8080/')

}
// 添加组件的action
const addComponentAction = async (name, dest) => {
  // 1.有对应的ejs模块

  // 1.编译ejs模版 result
  const result = await compile("vue-component.ejs", { name, lowerName: name.toLowerCase() })
  // console.log(result)
  // 2.写入文件的操作
  const targetPath = path.resolve(dest, `${name}.vue`)
  console.log(targetPath)
  writeToFile(targetPath, result)
  // 4.放到对应的文件夹中
}

// 添加组件和路由
const addPageAndRouteAction = async (name, dest) => {
  // 编译ejs模版
  const data = { name, lowerName: name.toLowerCase() }
  const pageResult = await compile("vue-component.ejs", data)
  const routeResult = await compile("vue-router.ejs", data)
  // 写入文件
  const targetDest =path.resolve(dest,name.toLowerCase())
  if(createDirSync(dest)){
    const targetPagePath = path.resolve(targetDest, `${name}.vue`)
    const targetRoutePath = path.resolve(targetDest, 'router.js')
    writeToFile(targetPagePath,pageResult)
    writeToFile(targetRoutePath,routeResult)
  }
 
}

const addStoreAction = async (name,dest) => {
  // 1.遍历的过程
  const storeResult =await compile('vue-store.ejs',{});
  const typesResult =await compile('vue-types.ejs',{});

  // 2 创建文件
  const targetDest =path.resolve(dest,name.toLowerCase())
  if(createDirSync(dest)){
    const targetPagePath = path.resolve(targetDest, `${name}.js`)
    const targetRoutePath = path.resolve(targetDest, 'types.js')
    writeToFile(targetPagePath,storeResult)
    writeToFile(targetRoutePath,typesResult)
  }
}







module.exports = {
  createProjectAction,
  addComponentAction,
  addPageAndRouteAction,
  addStoreAction
}