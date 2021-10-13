/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-09-15 14:47:03
 */

const isFunction = obj => typeof obj === 'function'
const isObject = obj => !!(obj && typeof obj === 'object')
const isThenable = obj => (isFunction(obj) || isObject(obj)) && 'then' in obj
const isPromise = promise => promise instanceof Promise

const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function MyPromise(f) {
  this.state = PENDING
  this.result = null
  this.callbacks = []

  let onFulfilled = value => transition(this, FULFILLED, value)
  let onRejected = reason => transition(this, REJECTED, reason)

  let ignore = false
  let resolve = value => {
    if(ignore) return
    ignore = true
    resolvePromise(this, value, onFulfilled, onRejected)
  }
  let reject = value => {
    if(ignore) return
    ignore = true
    onRejected(reason)
  }

  try {
    f(resolve, reject)
  } catch (error) {
    reject(error)
  }
}

/**
 * 状态转变, PENDING -> FULFILLED / PENDING -> REJECTED
 * 当 state 为 fulfilled 时, result 作为 value 看待
 * 当 state 为 rejected 时, result 作为 reason 看待
 */

const handleCallback = (callback, state, result) => {
  let { onFulfilled, onRejected, resolve, reject } = callback
  try {
    if(state === FULFILLED) {
      isFunction(onFulfilled) ? resolve(onFulfilled(result)) : resolve(result)
    } else if(state === REJECTED) {
      isFunction(onRejected) ? resolve(onRejected(result)) : reject(result)
    }
  } catch (error) {
    reject(error)
  }
}

const handleCallbacks = (callbacks, state, result) => {
  while(callbacks.length) handleCallback(callbacks.shift(), state, result)
}

const transition = (promise, state, result) => {
  if(promise.state !== PENDING) return
  promise.state = state
  promise.result = result
  setTimeout(() => handleCallbacks(promise.callbacks, state, result), 0)
}

const resolvePromise = (promise, result, resolve, reject) => {
  if(result === promise) {
    let reason = new TypeError('Can not fulfill promise with itself')
    return reject(reason)
  }

  if(isPromise(result)) {
    return result.then(resolve, reject)
  }

  if(isThenable(result)) {
    try {
      let then = result.then
      if(isFunction(then)) {
        return new Promise(then.bind(result)).then(resolve, reject)
      }
    } catch (error) {
      return reject(error)
    }
  }
  resolve(result)
}

/** 
 * then方法
 */

MyPromise.prototype.then = function(onFulfilled, onRejected) {
  return new Promise((resolve, reject) => {
    let callback = { onFulfilled, onRejected, resolve, reject }
    
    if(this.state === PENDING) {
      this.callbacks.push(callback)
    } else {
      setTimeout(() => {
        handleCallback(callback, this.state, this.result)
      }, 0)
    }
  })
}




new Promise((resolve, reject) => {
  resolve(1)
}).then((val) => {
  console.log('Promise ok: ', val)
}, (rej) => {
  console.log('Promise no: ', rej)
})

new MyPromise(() => {
  resolve(2)
}).then((val) => {
  console.log('MyPromise ok: ', val)
}, (rej) => {
  console.log('MyPromise no: ', rej)
})

