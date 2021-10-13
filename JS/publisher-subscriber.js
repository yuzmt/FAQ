/*
 * @Description: 发布-订阅模式
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-09-13 14:36:20
 */

/**
 * 发布-订阅模式的优缺点
 * 
 * 优点: 
 *  1. 时间上的解耦: 注册的订阅行为由消息的发布方来决定何时调用, 订阅者不用持续关注, 当消息发生时, 发布者负责通知;
 *  2. 对象上的解耦: 发布者不用提前知道消息的接受者是谁, 发布者主需要遍历处理所有的订阅该消息类型的订阅者发布消息即可(迭代器模式), 由此解耦了发布者和订阅者之间的联系, 互不持有, 都依赖于抽象, 不再依赖于具体;
 * 
 * 缺点: 
 *  1. 增加消耗: 创建结构和缓存订阅者这两个过程这两个过程需要消耗计算机和内存资源, 即使订阅后始终没有触发, 订阅者也会始终存在于内存;
 *  2. 增加复杂度: 订阅者被缓存在一起, 如果多个订阅者和发布者层层嵌套, 那么程序将变得难以追踪和调试, 出现多对多的情况总是会很复杂
 */

// function Publisher() {
//   this.subs = {}
// }

// Publisher.prototype = {
//   // 订阅
//   subscribe: function(type, cb) {
//     if(this.subs[type]) {
//       if(!this.subs[type].includes(cb)) {
//         this.subs[type].push(cb)
//       }
//     } else {
//       this.subs[type] = [cb]
//     }
//   },

//   // 取消订阅
//   unsubscribe: function(type, cb) {
//     if(this.subs[type] && this.subs[type].includes(cb)) {
//       const index = this.subs[type].indexOf(cb)
//       this.subs[type].splice(index, 1)
//     }
//   },

//   // 发布
//   notify: function(type, args) {
//     if(this.subs[type]) {
//       this.subs[type].forEach(cb => cb(args))
//     }
//   }
// }

// 订阅
// pub.subscribe('公众号1', fn1 = msg => console.log(`孙悟空订阅的公众号1: ${msg}`));
// pub.subscribe('公众号1', fn2 = msg => console.log(`猪八戒订阅的公众号1: ${msg}`));
// pub.subscribe('公众号2', fn3 = msg => console.log(`沙悟净订阅的公众号2: ${msg}`));

// pub.notify('公众号1', '今天我们的粉丝查过100万啦！！！');
// pub.notify('公众号2', '明天给粉丝们寄礼物喽～～');

function Publisher2() {
  this.subs = []
}

Publisher2.prototype = {
  subscribe: function(sub) {
    this.subs.push(sub)
  },
  unsubscribe: function(sub) {
    const index = this.subs.indexOf(sub)
    if(index !== -1) {
      this.subs.splice(index, 1)
    }
  },
  notify: function() {
    this.subs.forEach(sub => sub())
  }
}



const pub = new Publisher2()

function fn1 () {
  console.log('fn1')
}
function fn2 () {
  console.log('fn2')
}

pub.subscribe(fn1)
pub.subscribe(fn2)
pub.unsubscribe(fn1)
pub.notify()
