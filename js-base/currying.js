

// 柯里化 让函数变得更具体一下

function add(a, b, c, d) {
  return a + b + c + d;
}
const fn = currying(add, 1, 2);
let newFn = fn(3)
let newFn2 = newFn(4);

function currying(fn, ...args) {
  if (fn.length == args.length) {// 函数的length等于函数参数的格式
    return fn(...args);
  } else {
    return function (...values) {
      let newValues = [...args, ...values];
      // 递归，直到参数个数与fn的参数个数相等
      return currying(fn, ...newValues);

    }
  }
}

// 反柯里化 让一个函数的应用范围变得更广一些，使本来只有特定对象才适用的方法，扩展到更多对象

console.log(Object.prototype.toString.call('hello'))
//怎么样可以直接用toString('hello')

function unCurrying (fn) {
  return function (thisValue, ...args) {
    return Function.prototype.apply.call(fn, thisValue, args);
    // return fn.apply(args.shift(), args);
  }
}
let toString = unCurrying(Object.prototype.toString);
console.log(toString('hello'));
