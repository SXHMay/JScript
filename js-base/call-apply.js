
/*********【一】看例子总结call的特性*********** */
function fn(...args){
  console.log(this, args);
}
function fn2(){
console.log('fn2');
}
// fn.call(1, 2,3,4);
fn.call.call.call(fn2); // 打印的值回事fn2，相当于call.call(fn2),所以将call函数里的this指向了fn2，并且执行了call

//*******************【二】 */ call的特点：1.改变this指向，2.立即执行函数

Function.prototype.call = function(thisValue, ...args){
  
  // this = fn（fn指调用call的函数，所以call的this就是调用它的函数）
  // 让fn的this指向thisValue, 函数的this一般谁调用它,this就是谁，所以我们可以将fn放在thisValue这个对象上
  if (typeof thisValue != 'object') {// 如果thisValue不是对象，是其他数字，字符串等，将其转换为一个对象
    thisValue = new Object(thisValue);
  }
  // 如果是thisValue.fn()，那么这样的话fn的this就是thisValue了，所以我们可以根据这个特性将fn先放在thisValue这个对象上
  const context = this; // 可以先将this存起来
  thisValue.f = context;
  Object.defineProperty(thisValue, 'f', {// 将fn设置成不可枚举的属性
    enumerable: false,
    get(){
      return context
    }
  })
  thisValue.f(...args);
  delete thisValue.fn; // 最后我们再将fn这个属性删除
}
function fn(...args){
  console.log(this, args);
}
fn.call(1, 2,3,4)

// **********【三】apply**************/apply 与call 的区别就是apply传递的数组,然后将数组元素单独传递给函数

Function.prototype.apply = function(thisValue,args){
  
  // this = fn（fn指调用call的函数，所以call的this就是调用它的函数）
  // 让fn的this指向thisValue, 函数的this一般谁调用它,this就是谁，所以我们可以将fn放在thisValue这个对象上
  if (typeof thisValue != 'object') {// 如果thisValue不是对象，是其他数字，字符串等，将其转换为一个对象
    thisValue = new Object(thisValue);
  }
  // 如果是thisValue.fn()，那么这样的话fn的this就是thisValue了，所以我们可以根据这个特性将fn先放在thisValue这个对象上
  const context = this; // 可以先将this存起来
  thisValue.f = context;
  Object.defineProperty(thisValue, 'f', {// 将fn设置成不可枚举的属性
    enumerable: false,
    get(){
      return context
    }
  })
  thisValue.f(...args);// 参数单独传递给函数，而不是整个数组
  delete thisValue.fn; // 最后我们再将fn这个属性删除
}
function fn(...args){
  console.log(this, args);
}
fn.apply = function(){
  console.log('inner apply');
}
fn.apply(1, [2,3,4])
// 如果fn自己身上也有apply方法，但是我📮改变fn的this指向，怎么写？
// 用原型上的ally方法
Function.prototype.apply.call(fn, 1,2,3,4);
// 新版本可以用Reflect
Reflect.apply(fn, 1, [2,3,4])