/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-07-27 14:33:44
 */
let fs = require('fs')

// 读取文件异步操作
fs.readFile('./data/number.txt', 'utf-8', (err, data) => {
  if(data) {
    fs.readFile(data, 'utf-8', (err, data) => {
      if(data) {
        fs.readFile(data, 'utf-8', (err, data) => {
          console.log(data)
        })
      }
    })
  }
})