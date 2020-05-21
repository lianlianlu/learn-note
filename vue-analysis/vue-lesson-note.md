## 第零章 课程大纲

- 老师的课程讲义：https://ustbhuangyi.github.io/vue-analysis/v2/prepare/
- 内容

<img src="vue-lesson-note.assets/01.png" style="zoom:75%;" />

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
  ┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈┈
  //排除null
  var foo?: string;
  此时 foo既可以是string，也可以是undefined。就是不能为null;
  ```

- 更多的类型，可以去https://flow.org/en/docs/types/看。

- Flow在vue源码中的应用。 在vuejs源码中，flow文件夹下，

  ```js
  flow
    |-- compiler.js       # 编译相关
    |-- component.js      # 组件数据结构
    |-- global-api.js     # Global API 结构
    |-- modules.js        # 第三方库定义
    |-- options.js        # 选项相关
    |-- ssr.js            # 服务器渲染相关
    |-- vnode.js          # 虚拟 node 相关
  ```

  

---



### 第2节 vuejs源码目录设计

```javascript
src
	|-- compiler   # 编译相关的文件
  |-- core       # 关于方法，组件相关的  重点
  |-- platforms  # 里面有两个文件夹 web 平台相关（浏览器） weex 跨端
  |-- server     # 服务端
  |-- sfc        # 解释器  将.vue文件转换成对象
  |-- shared     # 其他文件夹的一些公用方法
```

#### compiler

将模板解析成ast语法树  => ast语法树优化 => 代码生成  等功能

编译工作可以在

- 构建时做（借助 webpack, vue-loader等辅助插件）--- `Runtime Only`推荐  

- 运行时做（使用包含构建功能的vuejs）--- `Runtime + Compiler`

#### core

包含vuejs的核心代码。包括`内置组件` 、`全局API封装`、`Vue实例化`、`观察者`、`虚拟DOM`、`工具函数`等

#### plateforms

跨平台

#### server

这部分代码是跑在服务端的 Node.js，不要和跑在浏览器端的 Vue.js 混为一谈。

定义： 服务端渲染主要的工作 => 把组件渲染成服务端的HTML字符串 => 将它们直接发送到浏览器 => 最后将静态标记"混合"，为客户端上的完全交互的应用程序

#### sfc

通常开发，我们借助webpack构建，然后通过.vue来编写组件。这个文件夹的代码逻辑就是将.vue文件内容解析成一个Javascript的对象。

#### shared

前面的文件夹所需的公用方法

#### 小结

作者将功能模块拆分的非常清楚，相关逻辑都放在一个独立的目录下，并把复用的代码也抽成一个独立的目录

这样设计，提高代码的阅读性和可维护性

---



### 第3节 vuejs 源码构建

vuejs源码是基于Rollup构建的。Rollup是一个构建工具，不像webpack，对图片等其他资源都处理，它只处理JS，构建出来的产物也更加轻量。所以更加适合library或者application。 相关配置都在scripts目录下。

通常一个基于 NPM 托管的项目都会有一个 package.json 文件，它是对项目的描述文件，它的内容实际上是一个标准的 JSON 对象。

---



## 第二章 数据驱动

### 2-1 Introduction

​	Vue.js 一个核心思想是数据驱动。
​	所谓数据驱动，是指视图是由数据驱动生成的，我们对视图的修改，不会直接操作 DOM，而是通过修改数据。特别是当交互复杂的时候，只关心数据的修改会让代码的逻辑变的非常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，而不用碰触 DOM，这样的代码非常利于维护。
​	这一章我们的目标是**弄清楚模板和数据如何渲染成最终的 DOM**。

### 2-2 new vue 发生了啥

