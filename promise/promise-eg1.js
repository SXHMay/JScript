//promise 对于异步编程的一种解决方案
// 解决的问题：1、回调地狱 2、同时得到多个异步方法执行结果

// promise 有三种状态 pending resolve reject
// ***** new后的一个promise实例只能有一种状态要么成功，要么失败，要么在等待中；由等待转成了成功后不会再转化为失败，由等待转化为失败也不可能再变为成功**/

// 1）promise是一个类（构造函数）, 有一个函数参数fn，fn会立即执行
// 2）new promise之后的实例上有一个then方法
// 3) then 方法有两个函数参数，第一个是成功的回调，第二个是失败的回调

const Promise = require('./promise-1');
// 1)
const promise = new Promise(function(resolve, reject){
  console.log(11);
  reject('失败了');
  throw new Error('忘记了 ')
  resolve('成功了');
  
});
promise.then(function(res){
  
  console.log(res)
}, function(err){
  console.log('hhh1'+err);
})
// 2）
const promise = new Promise(function(resolve, reject){
  setTimeout(() => {
    reject('没钱了')
}, 1000);
});
// 一个promise多次调用then，所有成功或失败的回调方法会依次执行
promise.then(function(res){
  
  console.log(res)
}, function(err){
  console.log('hhh1'+err);
})
promise.then(function(res){
  console.log(res)
}, function(err){
  console.log('hhh'+err);
})
console.log(2);

/**************************/
const Promise = require('./promise-1');
let p = new Promise((resolve, reject) => {
  setTimeout(() => {
      reject('没钱了')
  }, 1000);
});
p.then((data) => { 
  console.log(data);
}, (err) => {
  console.log(err);
})
p.then((data) => {
  console.log(data);
}, (err) => {
  console.log(err);
})
console.log(2);