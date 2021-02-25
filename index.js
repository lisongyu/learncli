#!/usr/bin/env node

console.log('哈哈')
const program = require('commander')
const helpOptions =require('./lib/core/help')
// 创建其他指令
const createCommands =require('./lib/core/create')
// 帮助可选信息
helpOptions()
createCommands()
const getVersion =require('./package.json').version
program.version(getVersion)

program.parse(process.argv)