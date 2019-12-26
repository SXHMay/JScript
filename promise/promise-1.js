
// promise规范 https://promisesaplus.com/
// promise 有三种状态  pending, fulfilled, or rejected.
// ***** new后的一个promise实例只能有一种状态要么成功，要么失败，要么在等待中；由等待转成了成功后不会再转化为失败，由等待转化为失败也不可能再变为成功

// 1）promise是一个类（构造函数）, 有一个函数参数fn，fn会立即执行,fn会有两个方法，一个成功的方法，一个失败的方法
// 2）new promise之后的实例上必须有一个then方法
// 3) then 方法有两个函数参数，onFulfilled, onRejected，第一个是成功的回调，第二个是失败的回调

const PENDING = 'PENDING';
const FULFILLED = 'FULFILLED';
const REJECTED = 'REJECTED';
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
    if (this.status === FULFILLED){
      onFulfilled(this.value);
    }
    if (this.status === REJECTED){
      onRejected(this.reason);
    }

    // 在调用then的时候，promise的状态既没有成功也没有失败
    if (this.status === PENDING) {
      this.onFulfilledCallbacks.push(()=>{
        onFulfilled(this.value);
      });
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason);
      });
    }
  }
}

module.exports = Promise;