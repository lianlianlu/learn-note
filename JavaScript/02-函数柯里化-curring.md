```js
// 支持多参数传递
function progressCurrying(fn, args) {

    var _this = this
    var len = fn.length;
    var args = args || [];

    return function() {
        var _args = Array.prototype.slice.call(arguments);
        Array.prototype.push.apply(args, _args);

        // 如果参数个数小于最初的fn.length，则递归调用，继续收集参数
        if (_args.length < len) {
            return progressCurrying.call(_this, fn, _args);
        }

        // 参数收集完毕，则执行fn
        return fn.apply(this, _args);
    }
}
```



curry的一些性能问题你只要知道下面四点就差不多了：

- 存取arguments对象通常要比存取命名参数要慢一点
- 一些老版本的浏览器在arguments.length的实现上是相当慢的
- 使用fn.apply( … ) 和 fn.call( … )通常比直接调用fn( … ) 稍微慢点
- 创建大量嵌套作用域和闭包函数会带来花销，无论是在内存还是速度上

其实在大部分应用中，主要的性能瓶颈是在操作DOM节点上，这js的性能损耗基本是可以忽略不计的，所以curry是可以直接放心的使用。

#### eg

```js
需求：要求实现
add(1)(2)(3)  //6
add(1,2,3)(4) //10
add(1,2)(3)(4)(5) //15

```

