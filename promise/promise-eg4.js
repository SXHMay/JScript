//  promise小补丁


const fs = require('fs');
const Promise = require('./promise-2');
// // 【一】将fs.readFile封装成promise是下面写法,但是这样的话其实还有嵌套，
function read(...args) {
  return new Promise(function (resolve, reject) {
    fs.readFile(...args, function (err, data) {
      if (err) reject(err);
      resolve(data);
    })
  });
}
read('./txt1.txt', 'utf8').then((data) => {
  console.log(data)
});
// 减少嵌套

function read(...args) {
  let dfd = Promise.defer();
  fs.readFile(...args, function (err, data) {
    if (err) dfd.reject(err);
    dfd.resolve(data);
  })
  return dfd.promise;
}
read('./txt1.txt', 'utf8').then((data) => {
  console.log(data)
});
// 【二】 promise回传的值value可能仍然是一个promise
const Promise = require('./promise-3');
let p = new Promise(function (resolve, reject) {
  resolve(new Promise(function (resolve, reject) {// 返回的值是一个promise，那么就要等待这个promise完成再走外层的then方法
    resolve('ok');
  }));
});

p.then((data) => {
  console.log(data);
}, () => { });


// 【四】
const Promise = require('./promise-3');
const p = new Promise((resolve, reject) => {
  setTimeout(()=>{
    reject(100);
  },1000)
  
})
Promise.reject(p).then((data)=>{
  console.log(data);
}, (err)=>{
  console.log(err);
});
// p.then((data) => {
//   console.log(100);
// }, (err) => { })