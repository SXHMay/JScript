function fn(...args){
  console.log(this, args);
}
const bindFn = fn.bind(1,2,3);
bindFn();

/***********bind 的特性：1.改变this指向，2.返回一个函数(此函数不会立即执行) */

Function.prototype.bind = function (thisValue, ...args) {

  if (typeof thisValue != 'object') {
    thisValue = new Object(thisValue);
  }
  const context = this;
  thisValue.f = context;
  Object.defineProperty(thisValue, 'f', {// 将fn设置成不可枚举的属性
    enumerable: false,
    get(){
      return context
    }
  })
  return function(...values){
    thisValue.f(...args, ...values);
  }
}
function fn(...args){
  console.log(this, args);
}
let bindFn = fn.bind(1,2,3);
bindFn = bindFn.bind(2, 5);
bindFn(1,2);
