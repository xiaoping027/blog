# Redux 源码介绍 - index.js

> <https://github.com/reduxjs/redux>
>
> <https://cn.redux.js.org/>

开始看源码前，先过一遍文档。 建议`npm install redux`，查看`node_modules/redux/src`.

## index.js

```js
import createStore from "./createStore";
import combineReducers from "./combineReducers";
import bindActionCreators from "./bindActionCreators";
import applyMiddleware from "./applyMiddleware";
import compose from "./compose";
import __DO_NOT_USE__ActionTypes from "./utils/actionTypes";

function isCrushed() {} //忽略

export {
  createStore,
  combineReducers,
  bindActionCreators,
  applyMiddleware,
  compose,
  __DO_NOT_USE__ActionTypes //不要使用
};
```

## createStores

创建一个 `Redux store` 来以存放应用中所有的 `state`。应用中应有且仅有一个 `store`。

## combineReducers

随着应用变得越来越复杂，可以考虑将 `reducer` 函数拆分成多个单独的函数，拆分后的每个函数负责独立管理 `state` 的一部分。

`combineReducers` 辅助函数的作用是，把一个由多个不同 `reducer` 函数作为 `value` 的 `object`，合并成一个最终的 `reducer` 函数，然后就可以对这个 `reducer` 调用 `createStore` 方法

## applyMiddleware

`applyMiddleware` 最常见的使用场景是无需引用大量代码或依赖类似 `Rx` 的第三方库实现异步 `actions`。这种方式可以让你像 `dispatch` 一般的 `actions` 那样 `dispatch` 异步 `actions`。

## bindActionCreators

实现了在没有 `store` 和 `dispatch` 的组件中调用 `dispatch（action）`

用法例子

> <https://cn.redux.js.org/docs/api/bindActionCreators.html>

## compose

从右到左来组合多个函数。

这是函数式编程中的方法，为了方便，被放到了 `Redux` 里。
当需要把多个 `store` 增强器 依次执行的时候，需要用到它。
