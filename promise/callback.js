// 高阶函数

//判断数据类型:

// 判断数据类型是不是数组
// 【一】
function isType(type) {
  return Object.prototype.toString.call(type) == '[object Array]';
}
const a = [1,2,3];
const isArry = isType(a);
console.log(isArry); 

// 【二】但是我又想判断一个数据是不是字符串或者布尔类型
// 
function isType(type) {
  return Object.prototype.toString.call(type) == '[object String]';
}


// 【三】简化成一个函数 （方法1）
function isType(data, type) {
  return Object.prototype.toString.call(data) == '[object '+ type +']';
}

const isArray = isType([1,2,3], 'Array');
const isString = isType('hello', 'String');

// 【四】传两个参数有点麻烦，我就想传一个参数,我把能用到的数据类型循环遍历
// 闭包 函数执行的时候会有一个不销毁的内存空间
function isType3(type) {// type 会保留在当前的上下文中
  return function (data) {
    return Object.prototype.toString.call(data) == '[object '+ type +']';
  }
}
let types = {};
['Array', 'String', 'Boolean'].forEach((item) => {
  types[`is${item}`] = isType3(item);
});
const isArray = types.isArray([1,2,3]);
console.log(isArray);


// const type = isType(type);