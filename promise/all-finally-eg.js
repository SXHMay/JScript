

// finally es9语法 只有在node高版本中支持
const Promise = require('./promise-3');
Promise.resolve('100').finally(() => {
  console.log('我一直都在');

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('123');
    }, 5000)
  })
}).then((data) => {// 若上层finally中返回了一个promise，会等到它执行完以后才执行
  console.log(data);
}, err => {
  console.log(err);
});