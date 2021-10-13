/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-08-25 14:03:46
 */
const http = require('http');
const fs = require('fs');

http.createServer((request, response) => {
  console.log('request', request.url)
  if(request.url === '/') {
    const html = fs.readFileSync('test.html', 'utf-8')
    response.writeHead(200, {
      'Content-type': 'text/html',
      'Cache-Control': 'no-catch, no-store'
    })
    response.end(html)
  }
  if(request.url === '/script.js') {
    response.writeHead(200, {
      'Content-type': 'text/javascript',
      'Cache-Control': 'no-cache, no-store, max-age=200',
    })
    response.end('console.log("script loaded 111")')
  }
}).listen(8888)
console.log('server listening on 8888')