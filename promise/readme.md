<!--
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-07-29 15:54:28
-->
### 异步编程的问题
  - 产生回调地狱, 难于维护和扩展
  - `try catch` 只能捕获同步代码中的问题
  - 同步并发的异步存在一定的问题

### 异步编程的解决办法
  - `Promise` 可以解决回调地狱以及同步并发的异步问题, 但依旧会有一些明显的回调痕迹(`async await`)

### 宏任务 & 微任务
 - `宏任务` setTimeout ajax, 宏任务会被优先放在任务队列中(task queue)
 - `微任务` 也在任务队列中, 但是有优先执行权

### Promise
  - `then`
    - `then` 的状态由上一个状态决定
    - `then` 中的返回值作为下一个 `then` 注册函数的执行参数
    - `then` 中返回 `Promise` 对象, 下一个 `then` 由 `Promise` 对象中的状态决定
    - `then` 中不管是哪个注册函数中抛出错误, 都会执行下一个 `then` 的第二个回调
  - `catch`
    - 捕获异常
    - `catch` 不代表链式调用的结束, 后面可以继续 `then` 等操作
  - `finally`
    - 不管 `promise` 返回的是什么状态, `finally` 都会被执行
    - `finally` 回调函数不接受任何参数
  - `all`
    - 参数实例状态都成功了, 将他们的各自返回值组成数组返回
    - 只有有一个实例状态变成 `reject`, 整体返回的状态就是 `reject`, 并返回失败返回值
  - `race`
    ```js
      const p = Promise.race([p1, p2, p3]);
    ```
    - p1, p2, p3 之中有一个实例率先改变状态, p 的状态就跟着改变
  - `allSettled`
    - 接受一组 `promise` 实例, 只有等所有的参数实例都返回结果, 无论参数实例的状态是 `fulfilled` or `fulfilled`, 包装实例才会结束
  - `any`
    - 只要有一个实例状态变成 `fulfilled`, 包装实例就会变成 `fulfilled` 状态
    - 所有参数实例状态都变成 `rejected`, 包装实例就会变成 `rejected` 状态