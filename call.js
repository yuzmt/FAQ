/*
 * @Description: Call
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-08-28 14:44:18
 */

/**
 * call 的几个关注点
 * 1. call改变this指向
 * 2. 函数使用call之后直接执行了 e.g bar.call(foo)
 * 3. 第一个参数传null/undefined的时候, 调用函数内部的this指向window, 严格模式下指向undefined
 * 4. 返回值: 使用调用者提供的this值和参数调用改函数的返回值, 若该方法没有返回值, 则返回undefined
 */

var value = 'window'

var foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value, name, age)
  return {a: 1}
}

// bar.call(foo, 'zhang', 20)
// console.log(bar.call(foo, 'zhang', 20))

Function.prototype.myCall = function (context, ...args) {
  console.log('context', context)
  console.log('args', args)
  // this 指向的就是bar(谁调用this就指向谁)
  var context = context || window
  context.fn = this
  var result = context.fn(...args)
  delete context.fn
  return result
}

bar.myCall(null, 'zhang', 20)