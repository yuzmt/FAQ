/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-09-06 15:57:48
 */

/**
 * bind
 * 1. bind()方法会创建一个新的函数, 但这个新的函数被调用时, bind()的第一个参数将作为它运行时的this, 之后的一序列参数将会在传递实参前作为它的参数
 * 2. 当bind的返回函数作为构造函数的时候, bind初始指定的this会失效, 但传入的参数依然生效
 * 3. 来自: https://juejin.cn/post/6844903476623835149#heading-0
 */

var value = 'window'
var foo = {
  value: 1
}

function bar(name, age) {
  console.log(this.value, name, age)
}

Function.prototype.myBind = function(context) {
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }

  var self = this;
  var args = Array.prototype.slice.call(arguments, 1);
  var fNOP = function () {};
  var fbound = function () {
    self.apply(this instanceof self ? this : context, args.concat(Array.prototype.slice.call(arguments)));
  }

  fNOP.prototype = this.prototype;
  fbound.prototype = new fNOP();

  return fbound;
}

let funRes = bar.myBind(foo, 'zhang')
let fn = new funRes(3)
fn()