# React-Router-package.json

首先看下 `React-Router`需要以来哪些包

```json
{
  "name": "react-router",
  "version": "5.1.2",
  "description": "Declarative routing for React",
  "repository": "ReactTraining/react-router",
  "license": "MIT",
  ....
  "dependencies": {
    "@babel/runtime": "^7.1.2",//babel 忽略
    "history": "^4.9.0",  //核心
    "hoist-non-react-statics": "^3.1.0",
    "loose-envify": "^1.3.1",//编译环境 process.env.NODE_ENV === 'production‘
    "mini-create-react-context": "^0.3.0",//React上下文API的Polyfill
    "path-to-regexp": "^1.7.0",//路径的正则表达式
    "prop-types": "^15.6.2", // react props 属性类型
    "react-is": "^16.6.0", //测试是是否特定的react 元素
    "tiny-invariant": "^1.0.2", //如果该值是伪造的，则不变函数将抛出。如果该值为真，则该函数将不会抛出
    "tiny-warning": "^1.0.0"//抛出警告
  },
}
```

## history

`github` 地址

<https://github.com/ReactTraining/history>

看下打包信息

```js
// rollup.config.js
const input = './modules/index.js';
const globalName = 'History';
....
const cjs = [
  {
    input,
    output: { file: `cjs/${pkg.name}.js`, format: 'cjs' },
    external,
    plugins: [
      babel({ exclude: /node_modules/ }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('development') })
    ]
  },
  {
    input,
    output: { file: `cjs/${pkg.name}.min.js`, format: 'cjs' },
    external,
    plugins: [
      babel({ exclude: /node_modules/ }),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      uglify()
    ]
  }
];
```

源码文件是放在 `modules`这个文件夹里