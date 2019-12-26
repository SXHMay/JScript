

let Promise = require('./promise-2');

let promise = new Promise(function(resolve, reject){
  resolve('111')
});
let promise2 = promise.then(function(data){// 此时已经有then了，回调是异步执行的
console.log(222);
  return promise2
},function(){});

promise2.then(function(data){

},function(err){
  console.log('11111' + err)
});