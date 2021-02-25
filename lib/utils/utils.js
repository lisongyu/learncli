
const ejs = require('ejs')
const fs = require('fs')
const path = require('path')
const compile = (templateName, data) => {
  const templatePosition = `../templates/${templateName}`
  const templatePath = path.resolve(__dirname, templatePosition)
  console.log(templatePath)
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, { data }, {}, (err, result) => {
      if (err) {
        console.log(err);
        reject(err)
        return;
      }
      resolve(result)
    })
  })

}

// source/components.category
const createDirSync = (dirname) => {
  console.log(dirname)
  if (fs.existsSync(dirname)) {
    return true
  } else {
    // 不存在,判断父亲文件夹是否存在？
    if (createDirSync(path.dirname(dirname))) {
      console.log('速度速度')
      // 存在父亲文件，就直接新建该文件
      fs.mkdirSync(dirname)
      return true
    }
  }
}

const writeToFile = (path, content) => {
  // 判断path是否存在，如果不存在，创建对应的文件夹

  return fs.promises.writeFile(path, content)


}

module.exports = {
  compile,
  writeToFile,
  createDirSync
}