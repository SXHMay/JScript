

// promise的链式调用

// 有这样一个功能，我读取完txt1的内容后要继续读取txt2的内容

const fs = require('fs');

/*************** 【一】 ************************************/
fs.readFile('./txt1.txt', 'utf8',function(err, data){
  console.log(data);
  fs.readFile('./txt2.txt', 'utf8',function(err, data){
    console.log(data);
    
  })
})

//******* * 【二】如果我还要继续读取的话就继续在最里面读取，容易造成回调地狱   那怎么解决呢，可以包装成promise ***************/
const fs = require('fs');

function read(...args){// read方法参数不一定有几个，所以直接用...args

  return new Promise(function(resolve, reject){
    fs.readFile(...args, function(err, data) {
      if (err)  reject();
      resolve(data);
    })
  });
}


read('./txt1.txt', 'utf8').then(function(data){
  console.log('1' + data)
  return read('./txt2.txt', 'utf8'); 
  // return read(1, 'utf8'); 

},function(err){
  console.log('inner');
  throw new Error('error');
}).then(function(data){
  console.log('2' + data);
},function(){
  console.log('自己错了');
}).catch(err=> {
  console.log('你出错了'+ err);
}).then(function(data){//上一层没有返回err，也没有返回成功，返回了undefined, 就会到这个成功回调
 console.log('没返回就是成功' + data);
});

/******************* 【三】 但是上面的包装方法不能复用，如果我想再写入一个文件的话，还得把写入文件包装成promise ，我们可以写一个通用的方法 */

function promisify(fn){ 
  return function (...agrs) {
    return new Promise(function(resolve, reject){
      fn(...args, function(err, data) {
        if (err)  reject();
        resolve(data);
      })
    });
  }
}


const read = promisify(fs.readFile);

// 这个pormisify就是 {promisify} = require('util')；的实现

/******************【四】 总结一下promise的特性  ************/

// then方法中传递的成功和失败的函数，可以返回一个promise （可以返回3种值，promise，error ，普通值）
// 如果返回的是promise的话，这个promise的状态会是下一个then的结果，返回error的话就会进入下一个then的失败的回调，返回的是普通值会走下一个成功的回调。
// 如果自己有捕获错误，它就不会找catch
// then传递的函数还可以返回一个普通值（不是error和promise），会是下一个then的结果

// 链式调用的实现就是每一次都返回一个新的promise