/**  
 * es6模块  ---- node模块
   静态导入（只能放在最外层）----- 动态导入
  模块的概念：多个模块相互独立，解决变量冲突问题，方便维护
  模块的核心： 就是将当前内容放到一个函数里
  es6 import/ export 每个文件都是一个模块

  export 导出一个接口， export default 导出一个具体的值 
  我们可以通过接口名拿到最新的值

  export {xxx} 或者 export let x = 1 / import {xxx} from './xx'
                                      import { * as obj } from './xx'
  export default / import xxx from './xx
                   import { default as xx } from './xx'
*/

/*************
 * //a.js
 * let str1=1,str2=2
 * export { str1, str2}
 * 
 * // b.js
 * let str3=3
 * export {str3}
 * // all.js
 * import * as obj1 from 'a.js'
 * import * as obj2 from 'b.js'
 * export default {
 * obj1,obj2} 这样导出的是个值，不能获取最新的值，改写成
 * export * from './a'
 * export * from './b'
 * 
 * 
 * 
 * 
 * // index.js
 * console.log(all)
 * import * as all from './all.js' import具有变量提升的功能
 */

 /***
  * 
  * 有个草案语法 动态导入 可以写到代码块中 需要配置插件@babel/plugin-syntax-dynamic-import
  */
 if (true) {
  import('./a').then((data)=>{// import() 返回的是promise，动态导入
    console.log(data)
  })
 }