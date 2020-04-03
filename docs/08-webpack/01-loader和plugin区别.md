# webpack-loader 和 plugin 区别

`webpack` 打包编译过程

- 识别入口文件
- 通过逐层识别模块依赖。（Commonjs、amd 或者 es6 的 import，webpack 都会对其进行分析。来获取代码的依赖）
- webpack 做的就是分析代码。转换代码，编译代码，输出代码
- 最终形成打包后的代码

## loader

`loader` 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中

- 一个 Loader 的职责是单一的，只需要完成一种转换。
- 处理一个文件可以使用多个 loader，loader 的执行顺序是和本身的顺序是相反的，即最后一个 loader 最先执行，第一个 loader 最后执行。
- 第一个执行的 loader 接收源文件内容作为参数，其他 loader 接收前一个执行的 loader 的返回值作为参数。最后执行的 loader 会返回此模块的 JavaScript 源码
- 一个 Loader 其实就是一个 Node.js 模块
- 第一个 Loader 将会拿到需处理的原内容，上一个 Loader 处理后的结果会传给下一个接着处理，最后的 Loader 将处理后的最终结果返回给 Webpack。

### Loader 基础

```js
module.exports = function(source) {
  // source 为 compiler 传递给 Loader 的一个文件的原内容
  // 该函数需要返回处理后的内容，这里简单起见，直接把原内容返回了，相当于该 Loader 没有做任何转换
  return source;
};
//引用第三方包
const sass = require("node-sass");
module.exports = function(source) {
  return sass(source);
};
```

### 获得 Loader 的 options

```js
const loaderUtils = require("loader-utils");
module.exports = function(source) {
  // 获取到用户给当前 Loader 传入的 options
  const options = loaderUtils.getOptions(this);
  return source;
};
```

### 返回其它结果

上面的 `Loader` 都只是返回了原内容转换后的内容，但有些场景下还需要返回除了内容之外的东西。

例如以用 `babel-loader` 转换 `ES6` 代码为例，它还需要输出转换后的 `ES5` 代码对应的 `Source Map`，以方便调试源码。
为了把 `Source Map` 也一起随着 `ES5` 代码返回给 `Webpack`

```js
module.exports = function(source) {
  // 通过 this.callback 告诉 Webpack 返回的结果
  this.callback(null, source, sourceMaps);
  // 当你使用 this.callback 返回内容时，该 Loader 必须返回 undefined，
  // 以让 Webpack 知道该 Loader 返回的结果在 this.callback 中，而不是 return 中
  return;
};

this.callback(
    // 当无法转换原内容时，给 Webpack 返回一个 Error
    err: Error | null,
    // 原内容转换后的内容
    content: string | Buffer,
    // 用于把转换后的内容得出原内容的 Source Map，方便调试
    sourceMap?: SourceMap,
    // 如果本次转换为原内容生成了 AST 语法树，可以把这个 AST 返回，
    // 以方便之后需要 AST 的 Loader 复用该 AST，以避免重复生成 AST，提升性能
    abstractSyntaxTree?: AST
);

```

### 同步与异步

`Loader` 有同步和异步之分，上面介绍的 `Loader` 都是同步的 `Loader`，因为它们的转换流程都是同步的，转换完成后再返回结果。
但在有些场景下转换的步骤只能是异步完成的，例如你需要通过网络请求才能得出结果，如果采用同步的方式网络请求就会阻塞整个构建，导致构建非常缓慢。

```js
module.exports = function(source) {
  // 告诉 Webpack 本次转换是异步的，Loader 会在 callback 中回调结果
  var callback = this.async();
  someAsyncOperation(source, function(err, result, sourceMaps, ast) {
    // 通过 callback 返回异步执行后的结果
    callback(err, result, sourceMaps, ast);
  });
};
```

以上代码中最关键的代码是最后一行 `module.exports.raw = true`;，没有该行 `Loader` 只能拿到字符串。

### 处理二进制数据

```js
module.exports = function(source) {
  // 在 exports.raw === true 时，Webpack 传给 Loader 的 source 是 Buffer 类型的
  source instanceof Buffer === true;
  // Loader 返回的类型也可以是 Buffer 类型的
  // 在 exports.raw !== true 时，Loader 也可以返回 Buffer 类型的结果
  return source;
};
// 通过 exports.raw 属性告诉 Webpack 该 Loader 是否需要二进制数据
module.exports.raw = true;
```

### 缓存加速

```js
module.exports = function(source) {
  // 关闭该 Loader 的缓存功能
  this.cacheable(false);
  return source;
};
```

## plugin

在 `Webpack` 运行的生命周期中会广播出许多事件，`Plugi`n 可以监听这些事件，在合适的时机通过 `Webpack` 提供的 `API` 改变输出结果。

对于 `loader`，它就是一个转换器，将 `A` 文件进行编译形成 `B` 文件，这里操作的是文件，比如将 `A.scss` 或 `A.less` 转变为 `B.css`，单纯的文件转换过程

`plugin` 是一个扩展器，它丰富了 `wepack` 本身，针对是 `loader` 结束后，`webpack` 打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听 `webpack` 打包过程中的某些节点，执行广泛的任务。

- 编写一个 JavaScript 命名函数。
- 在它的原型上定义一个 apply 方法。
- 指定挂载的 webpack 事件钩子。
- 处理 webpack 内部实例的特定数据。

功能完成后调用 `webpack` 提供的回调。编写插件之前要理解 `compiler` 和 `compilation` 两个对象，以及 `webpack` 生命周期的各个阶段和钩子，`plugin` 比 `loader` 强大，通过 `plugin` 你可以访问 `compliler` 和 `compilation` 过程，通过钩子拦截 `webpack` 的执行。

> webpack 会将 compilation.assets 的内容生成文件，所以可以在构建中利用它生成我们想要的文件。

```js
function FileListPlugin(options) {}
FileListPlugin.prototype.apply = function(compiler) {
  compiler.plugin("emit", function(compilation, callback) {
    var filelist = "In this build:\n\n";
    for (var filename in compilation.assets) {
      filelist += "- " + filename + "\n";
    }
    compilation.assets["filelist.md"] = {
      source: function() {
        return filelist;
      },
      size: function() {
        return filelist.length;
      }
    };
    callback();
  });
};

module.exports = FileListPlugin;
```

```js
class Notifier {
  apply(compiler) {
    compiler.plugin("done", stats => {
      const pkg = require("./package.json");
      const notifier = require("node-notifier");
      const time = ((stats.endTime - stats.startTime) / 1000).toFixed(2);

      notifier.notify({
        title: pkg.name,
        message: `WebPack is done!\n${stats.compilation.errors.length} errors in ${time}s`,
        contentImage: "https://path/to/your/logo.png"
      });
    });
  }
}

module.exports = Notifier;
```
