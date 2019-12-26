


//**************************** */ definedProperty(es5) proxy
let el = {
  _content: '',
  get html () {

    console.log('获取数据');
    return this._content;
  },
  set html(value){
    this._content = value;
   
  }
}

el.html = 22 // 赋值的时候相当于执行了set方法
console.log(el.html);// 会执行get方法

/***************** */
// 上面的写法是简单的写法，可以用definedProperty常用的写法

let obj={}

let newValue = undefined;
Object.defineProperty(obj, 'a', {// 当前定义属性时可以添加一些配置
  enumerable: false,// 是否可枚举，如果用es5来模拟es6的类，需要用到此自字段，因为es5原型上的方法是可枚举的，es6上的不可枚举
  configurable: false,// 是否可删除 来判断是否可以 被重新定义
  // writable: true,// 是否可写
  get(){
    return newValue; // 必须设置第三方变量newValue,要不然获取不到set里设置的值
  },
  set(value){
    newValue = value;
  }
});
obj.a = '222'
delete obj.a

console.log(obj.a)

// Object.freeze() // 性能优化点
let obj =Object.freeze({a: 1})// 被冻结的对象不能再重新改写了，下面代码就会报错Cannot define property b, object is not extensible
Object.defineProperty(obj, 'b',{
  get(){},
  set(){}
});

/********* vue里最核心的是数据劫持 vue要监控数据变化，数据变化后要更新视图****/

let data = {
  a:1,
  b:2,
  obj:{c:3}
}
// let data = Object.freeze({
//   a:1,
//   b:2,
//   obj:{c:3}
// })

const update = () => {
  console.log('update view');
}
// 不支持数组方法，所以可以用proxy，性能也好，因为不用这样遍历递归
function defineReactive(target, key, value){
  oberser(value);// 如果value仍然是对象，则递归
  // 内部源码中会判断，如果数据不能重新被修改，中断这次循环,不重新定义属性
  if (!Object.getOwnPropertyDescriptor(target, key).configurable) return;
  Object.defineProperty(target, key, {
    get () {
      return value;
    },
    set(newValue){
      if (newValue != value) {// 数据变化，则更新视图
        update();
      }
      
    }
  });
}
function oberser(data){
  if (typeof data != 'object') {
    return
  }
  for (let key in data) {
    defineReactive(data, key, data[key]);
  }
}
oberser(data);// 监听数据变化
data.obj.c= 100;
data.obj.c= 200;
console.log(data.obj.c);// 值怎么没有变成200呢，一直是原来的3？