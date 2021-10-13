/*
 * @Description: 
 * @Author: mengting.zhang <mengting.zhang@hand-china.com>
 * @LastEditTime: 2021-08-26 22:28:07
 */

function Person() {
  this.a = 1
  this.b = [1, this.a]
  this.c = {demo: 5}
  this.show = function () {
    console.log(this.a, this.b, this.c.demo)
  }
}

function Child() {
  this.a = 2
  this.change = function() {
    this.b.push(this.a)
    this.a = this.b.length
    this.c.demo = this.a++
  }
}


const person = new Person()
Child.prototype = person

const child1 = new Child()
person.show()
child1.show()
child1.change()
child1.show()
