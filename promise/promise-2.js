
// promise规范 https://promisesaplus.com/
// promise 有三种状态  pending, fulfilled, or rejected.
// ***** new后的一个promise实例只能有一种状态要么成功，要么失败，要么在等待中；由等待转成了成功后不会再转化为失败，由等待转化为失败也不可能再变为成功

// 1）promise是一个类（构造函数）, 有一个函数参数fn，fn会立即执行,fn会有两个方法，一个成功的方法，一个失败的方法
// 2）new promise之后的实例上必须有一个then方法
// 3) then 方法有两个函数参数，onFulfilled, onRejected，第一个是成功的回调，第二个是失败的回调

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
let resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 == x) {// 死循环 直接抛出错误
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
  } 
  let called; // 有的可能不规范的其他第三方promise，成功和失败的回调都会执行，那执行完成功或失败，就不再执行剩下的；
  if (typeof x == 'object' && x != null || typeof x == 'function') {// 如果x不是对象也不是函数，可能就是普通值string,null,undefined
    // 判断一个对象是不是promise，要看它有没有then方法
    try {
      let then = x.then; // 获取then属性的时候可能会执行错误，要及时捕获错误
      if (typeof then == 'function') {
        then.call(x, (y) => {// 解析y直到是一个普通值
          if (called) {
            return;
          }
          called = true;
          resolvePromise(promise2, y, resolve, reject);
        }, (r) => {
          if (called) {
            return;
          }
          called = true;
          reject(r);
        })
      } else {
        
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
    

  } else { // 否则就是普通值
    resolve(x);
  }
  
}
class Promise {
  constructor (executor) {
    this.status = PENDING;
    this.value = undefined;// 成功返回的值
    this.reason = undefined;// 失败返回的值
    this.onFulfilledCallbacks = [];// 存储所有成功的回调
    this.onRejectedCallbacks = []; // 存储所有失败的回调
    let resolve = (value) => { // 成功
      if (this.status === PENDING) {// 只能由等待中的状态转成成功的状态
        this.status = FULFILLED;
        this.value = value;
        this.onFulfilledCallbacks.forEach(fn => fn());
        
      }
      
    }
    let reject = (reason) => {//失败
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        this.onRejectedCallbacks.forEach(fn => fn());
      }
      
    }
    try {// executor如果执行的时候出现异常了，就走失败的回调，然后错误处理
      executor(resolve, reject);
    } catch(e){
      reject(e);
    }
    
  }
  then(onFulfilled, onRejected){
    // onFulfilled, onRejected可能不是一个函数直接穿透到最后
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val=>val;
    onRejected = typeof onRejected === 'function' ? onRejected : err => {throw Error(err)};

    let promise2 = new Promise((resolve, reject)=>{// 不用箭头函数获取不到this

      if (this.status === FULFILLED){
        setTimeout(()=>{ // 因为then的回调方法是异步执行的
          try {
            let x = onFulfilled(this.value); //如果在执行回调的时候出现错误，直接捕获错误，因为这个是在异步方法中执行，所以在constructor的错误捕获方法捕获不到这里的错误
            resolvePromise(promise2, x, resolve, reject);// 处理成功回调函数返回值x的类型，根据不同的类型转换不同的promise的状态

          }catch(e){
            reject(e)
          }
        },0);
        
      }
      if (this.status === REJECTED){
        setTimeout(()=>{
        let x = onRejected(this.reason);
        resolvePromise(promise2, x, resolve, reject);
        }, 0)
      }
  
      // 在调用then的时候，promise的状态既没有成功也没有失败
      if (this.status === PENDING) {
        this.onFulfilledCallbacks.push(()=>{
          setTimeout(()=>{
          let x = onFulfilled(this.value);
          resolvePromise(promise2, x, resolve, reject);
          }, 0)
        });
        this.onRejectedCallbacks.push(()=>{
          setTimeout(()=>{
          let x = onRejected(this.reason);
          resolvePromise(promise2, x, resolve, reject);
          }, 0)
        });
      }
    });
    
    
    return promise2;
  }
}


Promise.defer = Promise.deferred = function(){
  let dfd = {};
  dfd.promise = new Promise(function(resolve, reject){
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
}
// 验证promise是否符合规范 npm intall -g promises-aplus-tests  ; 执行 promises-aplus-tests  + 文件名
module.exports = Promise;

