// 读取多个文件，将文件内容组成一个数组
const fs = require('fs');


function after(fn,times) {
  let arr = [];
  return function(data) {
    arr.push(data);
    if (--times == 0) {
      fn(arr);
    }
  }
 
}
function fn(arr){
console.log(arr);
}

let out = after(fn, 2);
fs.readFile('./txt1.txt', 'utf8', function(err, data){
 out(data);
});
fs.readFile('./txt2.txt', 'utf8', function(err, data){
 out(data);
});


   