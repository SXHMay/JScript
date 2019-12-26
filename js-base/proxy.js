

// proxy 代理 reflect 反射 es6

// let obj = {
//   a: 1,
//   b: 2,
//   c: { c: 1 }
// }
let arr = [1,2,3]
// 在vue里我们可以直接obj.a = 3;修改已存在的值，但是不能添加新属性比如obj.c = 3; 所以我们可以用proxy


const update = () => {
  console.log('update');
}
let handler = {
  get(target, key) {
    // return target[key];
    // 如果target[key]，还是一个对象的话
    if (typeof target[key] == 'object') {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key);// 推荐用法
  },
  set(target, key, value) {
    // target[key] = value;
    // return true;
    
    let oldValue = target[key];console.log(oldValue)
    if (oldValue != value) {
      update();
      return Reflect.set(target, key, value);// 返回一个布尔类型
    }
    return true;// 如果劫持数组，必须返回true
  }
}
let proxy = new Proxy(arr, handler);
// proxy.a = 3
// proxy.c.c= 200;

proxy.push('4')

/************************* */
// 以后所有对象Object的新方法都会放到Reflect上，原有的方法也会迁移到reflect上
let obj = Object.freeze({ a: 1 })
Object.defineProperty(obj, 'c', {
  get() {
    return 100;
  },

});
console.log(obj.c);// 会报错,冻结的对象，如果有Reflect不会报错，返回的是个布尔值

let obj = Object.freeze({ a: 1 })
let flag = Reflect.defineProperty(obj, 'd', {
  get() {
    return 200;
  },

});
console.log(flag);