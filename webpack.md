#### 前言

- ##### 大背景

  模块化结构已经成为网站开发的主流。制作网站的主要工作，不再是自己编写各种功能，而是如何将各种不同的模块组合在一起。

- ##### 问题

  浏览器本身并不提供模块管理的机制，为了调用各个模块，有时不得不在网页中，加入一大堆script标签。

  - 使得网页体积臃肿，难以维护
  - 产生大量的HTTP请求，拖慢显示速度，影响用户体验

- ##### 解决

  前端的模块管理器（package management）应运而生。它可以轻松管理各种JavaScript脚本的依赖关系，自动加载各个模块，使得网页结构清晰合理。不夸张地说，将来**所有**的前端JavaScript项目，应该都会采用这种方式开发。

  - lodash

  - 为什么选择 Lodash   ？

    Lodash 通过降低 array、number、objects、string 等等的使用难度从而让 JavaScript 变得更简单。Lodash 的模块化方法 非常适用于：

    - 遍历 array、object 和 string
    - 对值进行操作和检测
    - 创建符合功能的函数

- ##### 安装

  ```
  mkdir webpack-demo && cd webpack-demo   //新建一个文件夹
  npm init -y  // init 初始化，也就是多了个package.json文件
  npm install webpack webpack-cli --save-dev //然后直接install webpack 脚手架
  ```

  - Webpack.config.js

    ```
    const path = require('path');
    console.log(path);
    log: 
    { resolve: [Function: resolve],
      normalize: [Function: normalize],
      isAbsolute: [Function: isAbsolute],
      join: [Function: join],
      relative: [Function: relative],
      toNamespacedPath: [Function: toNamespacedPath],
      dirname: [Function: dirname],
      basename: [Function: basename],
      extname: [Function: extname],
      format: [Function: format],
      parse: [Function: parse],
      sep: '/',
      delimiter: ':',
      win32:
       { resolve: [Function: resolve],
         normalize: [Function: normalize],
         isAbsolute: [Function: isAbsolute],
         join: [Function: join],
         relative: [Function: relative],
         toNamespacedPath: [Function: toNamespacedPath],
         dirname: [Function: dirname],
         basename: [Function: basename],
         extname: [Function: extname],
         format: [Function: format],
         parse: [Function: parse],
         sep: '\\',
         delimiter: ';',
         win32: [Circular],
         posix: [Circular],
         _makeLong: [Function: toNamespacedPath] },
      posix: [Circular],
      _makeLong: [Function: toNamespacedPath] }
    
    ```

- ##### 管理资源

  前言： webpack 默认只能识别JavaScript文件和JSON文件。那么其他文件类型，就要用loader来处理。

  - ###### CSS

    ```
    1. 安装css-loader
    npm install --save-dev style-loader css-loader
    modules: {
      rules: [
        {
          test: /\.css$/,
          use:['style-loader','css-loader']
        }
      ]
    }
    2. js中引入图片和CSS中背景图片的处理，使用file-loader
    modules: {
      rules: [{
        test:/.\(jpg|png|jpeg|gif)$/,
        use:[ 
        {loader: 'url-loader',
        options: 1024}
        ]
      }]
    }
    注： 同一张图片，多次使用，在编译时也只会编译一次。
    
    url-loader 功能类似于 file-loader，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
    ```

  - ###### 设定HtmlWebPlugin

    ```
    npm install --save-dev html-webpack-plugin
    plugins: [
        new HtmlWebpackPlugin({
          title:'输出管理'
        })
      ]
      //每次都会重新生成index.html
    ```

  - ###### 清理dist文件

    ```
    npm install clean-webpack-plugin --save-dev
    使用：
  const { CleanWebpackPlugin } = require('clean-webpack-plugin');
    plugins: [
    		new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
          title:'输出管理'
        })
      ]
    ```
    

  - ###### 防止重复打包 — CommonsChunkPlugin

    ```
    说明： 这是webpack的插件。直接引入webpack就可以使用了
    new webpack.optimize.CommonsChunkPlugin({
           name: 'common' // 指定公共 bundle 的名称。
    })
    ```

- ##### 误解

  - webpack 是一个模块打包器。 比如[Browserify](http://browserify.org/) 或 [Brunch](http://brunch.io/)：打包器(bundler)帮助你取得准备用于部署的 JavaScript 和样式表，将它们转换为适合浏览器的可用格式。例如，JavaScript 可以[压缩](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin)、[拆分 chunk](https://www.webpackjs.com/guides/code-splitting) 和[懒加载](https://www.webpackjs.com/guides/lazy-loading)，以提高性能。打包是 web 开发中最重要的挑战之一，解决此问题可以消除开发过程中的大部分痛点。
  - webpack不是一个任务执行器 。 例如：[Make](https://www.gnu.org/software/make/), [Grunt](https://gruntjs.com/) 或者 [Gulp](https://gulpjs.com/)：任务执行器就是用来自动化处理常见的开发任务，例如项目的检查(lint)、构建(build)、测试(test)。相对于*打包器(bundler)*，任务执行器则聚焦在偏重上层的问题上面。你可以得益于，使用上层的工具，而将打包部分的问题留给 webpack。

- ##### gulp (webpack-strream 或者叫做 gulp-webpack)