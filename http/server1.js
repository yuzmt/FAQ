/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-08-25 13:59:29
 */
const http = require('http')

http.createServer((request, response) => {
  console.log('url', request.url)
  response.writeHead(200, {
    'Access-Control-Allow-Origin': 'http://172.31.10.244:8888',
    'Access-Control-Allow-Headers': 'X-Test-Cors',
    'Access-Control-Allow-Methods': 'PUT, DELETE',
    'Access-Control-Max-Age': '1000',
  })
  response.end('8887')
}).listen(8887)
console.log('server listening on 8887')