/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-08-28 15:04:53
 */

/**
 * apply 和 call 的唯一区别就是传参格式不同
 */
var value = 'window'

var foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value, name, age)
  return 123
}

bar.apply(null,['zhang'])
console.log(bar.apply(null, ['zhang', 20]))

Function.prototype.myApply = function(context, res = []) {
  if(Object.prototype.toString.call(res) !== '[object Array]') {
    throw new Error(`${res} is not a Array` )
  }
  var context = context || window
  context.fn = this
  var result = context.fn(...res)
  delete context.fn
  return result
}

bar.myApply(null, ['zhang', 20])