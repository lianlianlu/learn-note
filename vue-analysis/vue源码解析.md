## 第零章 课程大纲

- 内容

<img src="vue源码解析.assets/01.png" style="zoom:75%;" />

- 技术栈
  - vuejs
  - Vue-Router
  - Vuex

- 核心 第1-4章
  - 数据驱动
  - 组件化
  - 响应式原理

- 编译   第5章
  - parse
  - optimize
  - codegen

- 扩展  第6章
  - event v-model
  - slot  keep-alive
  - transition   transition-group

- 生态 第7-8章
  - Vue-Router
  - Vuex

- 电子书

  https://github.com/ustbhuangyi/vue-analysis

---

## 第一章 准备工作

### 第1节 认识Flow

[Flow](https://flow.org/en/docs/getting-started/)是facebook出品的Javascript静态类型检查工具。 Vuejs的源码利用了Flow做了静态类型检查。

- install    /lesson-code

  ```javascript
  npm install -g flow-bin
  cd flow-test
  flow init       //生成.flowconfig 文件
  ```

- /lesson-code/flow-code/index.js

  ```javascript
  /*@flow*/   ------ 证明这个文件，需要flow检查。如果不检查，就去掉这个
  ```

-  **类型推断**
  flow根据代码的上下文进行推断

  ```javascript
  /*@flow*/
  
  function split(str){
    return str.split(' ');
  }
  split(11);
  
  //Terminal
  Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:4:14
  
  Cannot call str.split because property split is missing in Number [1].
  
       1│ /*@flow*/
       2│
       3│ function split(str) {
       4│   return str.split(' ');
       5│ }
       6│
   [1] 7│ split(11);
  
  
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  有一个问题就是，像👇这种，就不合适了。不会报错
  //Terminal  -- 先停止上一个，再重新编译（路径里面有中文的时候，无中文直接flow即可）
  # flow stop
  # flow 
  
  function add(x, y) {
    return x + y;
  }
  add('hellow', 11)
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
  No errors!
  ```

- **类型注释**

  提前写好我们希望的变量类型，不要flow自己去猜

  ```javascript
  function add(x:number, y:number):number{
    return x + y;
  }
  add('hello', 11)
  
  Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:6:5
  
  Cannot call add with 'hellow' bound to x because string [1] is incompatible with number [2].
  
   [2] 3│ function add(x : number, y : number) : number{
       4│   return x + y;
       5│ }
   [1] 6│ add('hello', 11)
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  function add(x:number, y:number):number{
    return x + y;
  }
  add(2, 11)
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ 
  No errors!
    
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //数组
  var arr: Array<number> = [1,2,3,4]
  arr.push('hello');
  Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:4:10
  
  Cannot call arr.push because string [1] is incompatible with number [2] in array element.
  
       1│ /*@flow*/
       2│
   [2] 3│ var arr: Array<number> = [1,2,3,4]
   [1] 4│ arr.push('hello');
  
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //类
  class Bar {
    x: string;
    y: string | number;
    z: boolean;
  
    constructor(x: string, y: string | number) {
      this.x = x;
      this.y = y;
      this.z = false;
    }
  }
  
  var bar: Bar = new Bar('hello', 4);
  
  var obj: {a: string, b: number, c: Array<string>, d: Bar } = {
    a: 'hello',
    b: 10,
    c: ['h','e','l','l','0'],
    d: new Bar('hi', 3)
  }
  
  No errors!
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //修改一下
  var bar: Bar = new Bar('hello');  //只给一个参数
  Error ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈ index.js:15:20
  
  Cannot call Bar because:
   • Either undefined [1] is incompatible with string [2].
   • Or undefined [1] is incompatible with number [3].
  
   [2][3]  8│   constructor(x: string, y: string | number) {
           9│     this.x = x;
          10│     this.y = y;
          11│     this.z = false;
          12│   }
          13│ }
          14│
      [1] 15│ var bar: Bar = new Bar('hello');
          16│
          17│ var obj: {a: string, b: number, c: Array<string>, d: Bar } = {
          18│   a: 'hello',
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //再修改一下就好了
  class Bar {
    x: string;
    y: string | number | void;
    z: boolean;
  
    constructor(x: string, y: string | number | void) {
      this.x = x;
      this.y = y;
      this.z = false;
    }
  }
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //null
  var foo: ?string = null;
  此时 foo既可以是string，也可以是null;
  
  ```

- 更多的类型，可以去https://flow.org/en/docs/types/看。

---



### 第2节 vuejs源码目录设计

```javascript
-- src
	-- compiler   #编译相关的文件
  -- core       #关于方法，组件相关的  重点
  -- platforms  #里面有两个文件夹 web 平台相关（浏览器） weex 跨端
  -- server     #服务端
  -- sfc        #解释器  将.vue文件转换成对象
  -- shared     #其他文件夹的一些公用方法
```

- 作者将功能模块拆分的非常清楚，相关逻辑都放在一个独立的目录下，并把复用的代码也抽成一个独立的目录

  这样设计，提高代码的阅读性和可维护性

---



### 第3节 vuejs 源码构建

vuejs源码是基于Rollup构建的。Rollup相较于Webpack，只处理js，优点是轻量

vue也是发布到npm上的，而每个npm包都是在package.json文件中，对项目做描述

