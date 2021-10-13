<!--
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-09-13 16:26:22
-->
### 盒模型
  - 盒模型由`content`, `padding`, `border`, `margin`组成, 但盒子的大小由`content`, `padding`, `border`决定
  - 盒模型分为`W3C标准盒模型`和`IE盒模型`; 可以通过`box-sizing`去切换两种模型
  - `W3C标准盒模型(content-box)`的宽高, 就是设置的宽高
  - `IE盒模型(border-box)`的宽高, 包含content, padding, border
  - 尽可能使用标准的W3C模型, 避免多个浏览器对同一页面的不兼容
### BFC(Block Formatting Context 块级格式化上下文)
  - 它是一块独立的渲染区域, 它规定了在该区域中, 常规流块盒的布局
    - 常规流块盒
      - 在水平方向上, 必须撑满包含块
      - 在垂直方向上依次摆放
      - 若外边距无缝相邻, 则进行外边距合并
      - 常规流块盒的自动高度和摆放位置, 无视浮动元素
  - 不同的BFC区域, 他们进行渲染的时候互不干扰
  - 创建BFC的元素, 隔绝了它内部和外部的联系, 内部的渲染不会影响到外部
  - BFC渲染区域(这个区域由某个HTML元素创建, 以下元素会在其内部创建BFC区域)
    - 根元素: 意味着, `<html>`元素创建的BFC区域, 覆盖了网页中所有的元素
    - 浮动和绝对定位元素
    - overflow不等于`visible`的块盒
    - display: flex/inline-block/table-cell
    - ...
  - BFC的具体规则
    - 创建BFC的元素, 它的自动高度需要计算浮动元素
    - 创建BFC的元素, 它的边框盒不会与浮动元素重叠
    - 创建BFC的元素, 不会和它的子元素进行外边距合并
### JS的数据类型
  - 原始值: `Number`, `String`, `Boolean`, `Null`, `Undefined` (不可改变, 存放于栈中)
  - 引用值: `Object`, `Function` (存放于堆中)
### 关于类型转换
  ```js
  Boolean(undefined) // false
  Boolean(null) // false
  Number(undefined) // NaN
  Number(null) // 0
  undefined === undefined // true
  null === null // true
  NaN === NaN // false
  ```
### 元素水平垂直居中的方式
  ```html
    <head>
      <style>
        .wrapper {
          width: 500px;
          height: 500px;
          background-color: antiquewhite;
        }
        .inner {
          width: 100px;
          height: 100px;
          background-color: aqua;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="inner"></div>
      </div>
    </body>
  ```
  - `position + left/top/right/bottom` (定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
        position: relative;
      }
      .inner {
        width: 100px;
        height: 100px;
        background-color: aqua;
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
      }
    </style>
  ```
  - `transform` (定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
      }
      .inner {
        width: 100px;
        height: 100px;
        background-color: aqua;
        /* (父元素宽高 - 自身元素宽高) / 2 */
        transform: translate(200px, 200px);
      }
    </style>
  ```
  - `line-height` (不定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
      }
      .inner {
        text-align: center;
        line-height: 500px;
      }
    </style>
  ```
  - `display: flex` (定宽高/不定宽高)
  ```html
    <style>
      .wrapper {
        /* 省略 */
        display: flex;
        justify-content: center;
        align-items: center;
      }
    </style>
  ```
  - `position` (定宽高/不定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
        position: relative;
      }
      .inner {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    </style>
  ```
  - `display + margin` (定宽高/不定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
        display: flex;
        /* or display: grid*/
      }
      .inner {
        margin: auto;
      }
    </style>
  ```
  - `grid` (定宽高/不定宽高)
  ```html
    <style>
      .wrapper {
        width: 500px;
        height: 500px;
        background-color: antiquewhite;
        display: grid;
      }
      .inner {
        align-self: center;
        justify-self: center;
      }
    </style>
  ```
### 防抖/节流
  - 防抖
    - 在事件触发n秒之后执行
  - 节流
    - 如果持续触发一个事件, 每隔一段时间, 只执行一次
    - 实现方式: 使用时间戳 or 设置定时器
### 事件循环(Event Loop)
  - 事件循环是js实现异步的一种方法, 也是js的`执行机制`
### 你对原型链有什么了解?
 - javaScript语言的一种继承机制, 原型描述的就是一种继承关系
 - 利用原型的特点和概念, 可以提取共有属性
 - 通过构造出来的对象去改原型的东西是不可能的, 除非使用 `prototype` 更改
 - 在原型上面加一个原型再加一个原型的方法, 把原型串成链就叫原型链
### bind, call, apply区别? 返回值有什么不同?
  - `bind`返回函数
  - `call`和`apply`作用都是改变`this`指向, 唯一的区别就是传参格式的不同; `call`接收的是一个参数列表, `apply`接收的是包含多个参数的数组
  - `call` 第一个参数传`null`的时候, 默认指向`window`
### 闭包
  - 闭包就是能够读取其他函数内部变量的函数, 本质上, 闭包就是将函数内部和外部连接起来的一座桥梁
  - 闭包的作用
    - 可以读取函数内部的变量
    - 让这些变量的值始终保持在内存中(返回的函数[f2]被保存在全局变量中, [f2]又依赖于[f1], 因此[f1]也始终保存在内存中, 不会在调用之后就结束)
  - 闭包的注意点
    - 由于闭包会使得函数中的变量都被保存在内存中, 内存消耗很大, 解决办法在退出函数之前, 将不适用的局部变量全部删除
    - 闭包会在父函数外部改变父函数内部变量的值
### http和https区别
  - 安全性不同: https比http多了一层`SSL/TLS`协议, 旨在为浏览器和服务器之间的通信加密
  - 端口号不同: http协议的端口号是80, https端口号是443
  - 网站申请流程不同: https协议需要到CA申请证书, 一般免费较少
  - 搜索排名不同: https网站比起http网站在搜索排名中更有优势
### react和vue的区别
  - react单向数据流
  - vue双向绑定(`v-model`, `.sync`)
### 你是怎么理解双向绑定的?
  - vue采用数据劫持结合发布者-订阅者模式的方式, 通过 `Object.defineProperty()` 来劫持个属性的 `getter` `setter`, 在数据变动时发布消息给订阅者, 触发响应的数据回调
  - 实现的核心是通过 `Object.defineProperty()`, 对data的每一个属性进行了get, set的拦截

  - 主要从以下几个方面来实现数据的双向绑定, **首先是监听器`observer`**, 通过核心API `Object.defineProperty` 对data中每一个属性进行get, set拦截, 监听属性的变化; **其次是订阅者`Watcher`**, 可以接收到属性的变化通知, 更新视图; 然而一个属性肯定不止被一个订阅者订阅, 所以这就存在一个一对多的关系, 因此一个属性变化了, 不可能依次取通知订阅者, **这就有了订阅器`Dep`**, 订阅器是监听器和订阅者之间的一个桥梁, 此时有属性变化之后, 监听器直接通知订阅器(在每次获取属性的时候, 植入订阅器), 然后由订阅器去通知所有的订阅者更新(循环调用订阅者上的update方法), 更新视图主要是通过**指令解析器Compile**, 对每个元素节点的指令进行扫描和解析, 根据指令模板替换数据;
### `Object.defineProperty`的缺陷
  - 无法监测到对象的新增/删除操作
  - 无法监测到数组通过索引值直接设置一个数组项, 以及直接修改数组的长度(`splice`来解决)
    - 为什么就可以通过`splice`来解决?
  - 通过`$set`基本可以解决以上的问题
### react组件通信的方式
  - 组件通信的几种情况
    - 父组件向子组件通信
      - 通过`props`向子组件传递需要的信息
    - 子组件向父组件通信
      - 父组件向子组件传递一个回调函数, 子组件内部自定义事件绑定该回调函数
    - 跨级组件通信
      - 层层组件传递`props`
      - `context`, `context`是一个全局变量, 在任何地方都可以访问到, 但是当组件结构复杂时, 就会容易混乱
    - 没有嵌套关系组件之间的通信
### 开发过程中需要深拷贝一个变量怎么操作?
### 关于子组件重复渲染你怎么处理?
### 是否有过请求失败再次发起请求的需求
### 高阶函数
### 高阶组件
  - 高阶组件是参数为组件, 返回值为新组建的函数
  - HOC是纯函数, 没有副作用
  - 父组件传的`props`会先被高阶组件接收, 然后再传到渲染的UI
### `useCallback`和`useMemo`
  - 关于记忆化缓存的两个使用场景
    - 通过缓存计算结果, 节省费时的计算
    - 保证相同输入下返回值的引用相等
  - `useCallback`和`useMemo`的关系
    - `useCallback`
      - 主要是解决函数`引用相等`的问题
      - 只能缓存函数
    - `useMemo`
      - 主要是处理一些对象
      - 是一个`全能型选手`, 能够同时胜任`引用相等`和`节约计算`的任务
      - 可以缓存任何类型的值, 当然也包括函数
      - ps: 前端开发任务中遇到计算密集型任务相对较少, 且浏览器引擎的性能也足够优秀
### `Redux`
  - 设计思想
    - Web应用是一个状态机, 视图与状态一一对应
    - 所有状态保存在一个变量里
  - store
  - action
    - 改变 State 的唯一办法，就是使用 Action
  - store.dispatch()
    - 是 View 发出 Action 的唯一方法
  - reducer
    - Reducer 是一个纯函数, 次函数里面不能改变 state 值, 必须返回全新的对象
  - 工作流程
    - 首先, 用户发出 Action
    - 然后, Store 自动调用 Reducer, 并且传入两个参数: 当前 State 和收到的 Action, Reducer 会返回新的 State
    - State 一旦有变化, Store 就会调用监听函数, listener 可以通过 store.getState() 得到当前状态。如果使用的是 React，这时可以触发重新渲染 View
### 中大型项目为什么要选择react而不是vue
  - React函数式编程理念使代码更优雅和合理
  - 严谨的单向数据流设计, 方便构建大型复杂稳定的单页面应用
  - 丰富的技术生态圈, 拥有世界范围内各大技术社区的支持
  - 方便配合ReactNative开发跨终端应用
### react 中的 hooks 和 类组件的区别?
  - 同一个`componentDidMount`中可能会包含很多其他的逻辑, 比如设置监听, 之后又需要在`componentWillUnmount`清除; 所以就会出现相互关联的代码被拆分, 不相关的代码又组合在同一个方法之中
  - 学习class需要了解js中的this指向
  - 不能忘记绑定事件处理器
### ref 在类组件和 hooks 中有什么区别?
  - 如果`ref`的属性用于自定义的组件上, 在类组件中, `ref` 可以获取到该组件的挂载实例, 然而不能用在函数组件上, 因为他们是没有实例的
  - 如果要通过`ref`操作函数式组件内部的DOM, 可以在组件内部通过`forwardRef`将组件包裹一下
  ```js
  export default forwardRef(function Foo(props, ref) {})
  ```
### `for in`循环会把原型上的属性也循环出来, 我们如何避免这一问题?
  - 通过`hasOwnProperty`加一层判断
