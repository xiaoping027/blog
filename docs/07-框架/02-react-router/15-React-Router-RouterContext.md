# React-Router  RouterContext

## 源码

```js
// TODO: Replace with React.createContext once we can assume React 16+
// `Context` 为 `React16`正式提供的`api`了，`react-router`兼容 `react 15`

import createContext from "mini-create-react-context";

const createNamedContext = name => {
  const context = createContext();
  context.displayName = name;

  return context;
};

const context = /*#__PURE__*/ createNamedContext("Router");
export default context;
```

## Context

`Context` 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法。详细信息可以看官方文档

> <https://zh-hans.reactjs.org/docs/context.html>
>
> <https://juejin.im/post/5a90e0545188257a63112977>
