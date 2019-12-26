
function Animal (name) {
  this.name = name;
}

function Cat (name) {
  Animal.call(this,name);// 实例属性继承
}
// Cat 继承Animal

//Cat.prototype == Animal.prototype // 错误的 引用地址相同，共用了地址
//Cat.prototype.__proto__  == Animal.prototype
//或者
//Object.setPrototypeOf(Cat.prototype, Animal.prototype):

function create (parentPrototype, constructor) {
  function Fn(){};
  Fn.prototype = parentPrototype;
  let instance = new Fn();
  instance.constructor = constructor;
  return instance;
}
Cat.prototype = create(Animal.prototype, Cat);
let cat = new Cat('猫')
console.log(Cat.constructor)

Cat.prototype.add = function(){}
console.log(Cat.prototype.constructor)
console.log(Animal.prototype)

/***********es6写法  理解实例属性、公共属性、静态方法、属性访问器*/

class Animal {
  // 静态方法， es6不支持静态属性
  // static let a = 1;会报错，不支持，es7支持
  // static a(){
  //   console.log('静态方法可以被继承');
  //   return 100
  // }
  static get a(){ // 直接可以获取属性a，不能执行a方法了
    console.log('静态方法可以被继承');
    return 100
  }
  constructor (name) {
    this.name = name;
  }
  eat () {
    console.log('吃东西');
  }
  get a () { // 等价于Animal.prototype.a = 200 属性访问器
     return 200;
  }
}

class Cat extends Animal{// 继承实例属性+公共属性
  constructor (name) { // 写了constructor必须写super
    super(name); // Animal.call(this,name) super 就相当于 Animal.call
    
  }
  eat () {
    super.eat()//这时就走了父类里的eat方法，这里super就相当于父类的原型 Animal.prototype
  }
}

let cat = new Cat('猫');

// console.log(cat);
// console.log(cat.eat());
// console.log(Cat.a()) // 可以被继承原理就是 Cat.__proto__ = Animal
console.log(Cat.a, cat.a)