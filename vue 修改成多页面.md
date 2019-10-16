#### 安装vue

```
1. 全局安装 vue-cli环境
npm install --global vue-cli
2. 创建一个基于webpack模板的新项目
vue init webpack my-project //项目名
3. 随着选择项配置你想要的项目
4. cd my-project 
5. npm run dev
```

#### sass 安装使用

```
1.安装 必须安装node-sass环境
npm install node-sass sass-loader style-loader -D 
2.使用
build/webpack.base.conf.js
{
		test: /\.scss$/,
    loaders: ["style", "css", "sass"]
}
3. 报错
Module build failed: TypeError: this.getResolve is not a function
    at Object.loader (/Users/mac/new-project/redpacket/node_modules/sass-loader/dist/index.js:52:26)
4. 原因
sass-loader 版本过高，不兼容webpack, 降低版本到7.0.0
5. 重新 npm i 
6. vue tempalte 下： 
<style lang="scss" scoped type="text/scss">
	@import './style.scss'; //或者单独的文件
</style>
```

#### 配置

```
1. 删除
删除src 下的APP.vue 和 main.js router文件夹
2. 在src 下新建文件夹 pages/redpacket
3. redpacket文件夹下，新建redpacket.html,style.scss, redpacket.js; 这是入口文件
4. redpacket文件夹下， 新建component 这是组件； 新建router文件夹，这是当前单页面的router文件
5. redpacket.html 内容
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0"/>
</head>
<body>
<div id="app">
  <div class="common-warp">
    <router-view></router-view>
  </div>
</div>
</body>
</html>
6. redpacket.js 内容
import Vue from 'vue';
import router from './router/index';
import './style.scss';

new Vue({
  el: '#app',
  router
});

7. component 
新建一个main.vue 里面是你的真实内容
<template>
  <div class="redpacket-page">
    <div class="content">内容</div>
  </div>

</template>

<script>
  export default {
    name: "redpacket"
  }
</script>

8. router 是router文件
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

//首页
const Index_Redpacket = resolve => {
  require.ensure([], () => {
    resolve(require('../component/main.vue'));
  }, 'main');
};

export default new Router({
  routes: [
    {
      path: '/',
      component: Index_Redpacket,
    },
  ]
})


```

```

7. build文件夹下修改
/////////--build/utils.js--///// start //////////////////////////////
 'use strict'
const path = require('path')
const config = require('../config')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const packageConfig = require('../package.json')

=====================配置入口文件和输入形式，并且一并export出去=================
var glob = require('glob');
//页面模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
//获取路径
var PAGE_PATH = path.resolve(__dirname, '../src/pages');
//merge处理
var merge = require('webpack-merge');

//多入口配置
// 通过glob模块读取pages文件夹下的所有对应文件夹下的js后缀文件，如果该文件存在 文件名和js命名一致，但是只有一个入口文件， 那么就作为入口处理
exports.entries = function() {
  var entryFiles = glob.sync(PAGE_PATH + '/*/*.js')
  var map = {}
  entryFiles.forEach((filePath) => {
    var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    map[filename] = filePath
  })
  return map
}

//多页面输出配置
// 与上面的多页面入口配置相同，读取pages文件夹下的对应的html后缀文件，然后放入数组中
exports.htmlPlugin = function() {
  let entryHtml = glob.sync(PAGE_PATH + '/*/*.html')
  let arr = []
  entryHtml.forEach((filePath) => {
    let filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'))
    let conf = {
      // 模板来源
      template: filePath,
      // 文件名称
      filename: filename + '.html',
      // 页面模板需要加对应的js脚本，如果不加这行则每个页面都会引入所有的js脚本
      chunks: ['manifest', 'vendor', filename],
      inject: true
    }
    if (process.env.NODE_ENV === 'production') {
      conf = merge(conf, {
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
        chunksSortMode: 'dependency'
      })
    }
    arr.push(new HtmlWebpackPlugin(conf))
  })
  return arr
}

===============utils.js 配置结束=======================

exports.assetsPath = function (_path) {
  const assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config.build.assetsSubDirectory
    : config.dev.assetsSubDirectory

  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}

  const cssLoader = {
    loader: 'css-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    const loaders = options.usePostCSS ? [cssLoader, postcssLoader] : [cssLoader]

    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {
          sourceMap: options.sourceMap
        })
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({
        use: loaders,
        fallback: 'vue-style-loader'
      })
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', { indentedSyntax: true }),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  const output = []
  const loaders = exports.cssLoaders(options)

  for (const extension in loaders) {
    const loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }

  return output
}

exports.createNotifierCallback = () => {
  const notifier = require('node-notifier')

  return (severity, errors) => {
    if (severity !== 'error') return

    const error = errors[0]
    const filename = error.file && error.file.split('!').pop()

    notifier.notify({
      title: packageConfig.name,
      message: severity + ': ' + error.name,
      subtitle: filename || '',
      icon: path.join(__dirname, 'logo.png')
    })
  }
}

/////////--build/utils.js--///// end //////////////////////////////


/////////--build/webpack.base.conf.js--/////start//////////////////////////////
module.exports = {
 entry: utils.entries(),
}
/////////--build/webpack.base.conf.js--///// end //////////////////////////////



/////////--build/webpack.dev.conf.js--/////start//////////////////////////////
plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    =============删除这段=======================
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    ===============删除这段=====================
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin())  =======concat添加出口文件配置

/////////--build/webpack.dev.conf.js--///// end //////////////////////////////


/////////--build/webpack.prod.conf.js--///// start //////////////////////////////
plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: {
          warnings: false
        }
      },
      sourceMap: config.build.productionSourceMap,
      parallel: true
    }),
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css'),
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    }),
    // Compress extracted CSS. We are using this plugin so that possible
    // duplicated CSS from different components can be deduped.
    new OptimizeCSSPlugin({
      cssProcessorOptions: config.build.productionSourceMap
        ? { safe: true, map: { inline: false } }
        : { safe: true }
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    =================修改 注释或者删除，随你===============================
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    =================修改 注释或者删除，随你===============================
    // keep module.id stable when vendor modules does not change
    new webpack.HashedModuleIdsPlugin(),
    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks (module) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity
    }),
    // This instance extracts shared chunks from code splitted chunks and bundles them
    // in a separate chunk, similar to the vendor chunk
    // see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'app',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),

    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.build.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ].concat(utils.htmlPlugin()) ===== 修改
/////////--build/webpack.prod.conf.js--///// end //////////////////////////////
```



#### 配置结束

```
重新打包dist文件夹 可以了
```



#### 说明

这样可以把每个页面都当成当页面来用，想添加一个页面，在src下再建一个即可。并且当页面内部，router是独立的，比较方便管理。当然一些公用的方法，可以在pages文件夹同级目录下建立。