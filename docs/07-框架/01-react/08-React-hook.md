# React-hook 学习

> Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性。

## 注意点

- 不用再考虑该使用无状态组件（`Function`）还是有状态组件（`Class`）而烦恼，使用 `hook` 后所有组件都将是 `
- 不用再纠结使用哪个生命周期钩子函数
- 不需要再面对 `this`
- `State Hook` 使用它让我们在 `React` 函数组件上添加内部 `state`
- 只能在函数最外层调用 `Hook`。不要在循环、条件判断或者子函数中调用。
- 只能在 `React` 的函数组件中调用 `Hook`。不要在其他 `JavaScript` 函数中调用

```js
import React, { useState } from "react";

function Example() {
  // useState 有两个返回值分别为当前 state 及更新 state 的函数
  // 其中 count 和 setCount 分别与 this.state.count 和 this.setState 类似
  const [count, setCount] = useState(0); // 数组解构写法

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}

export default Example;
```

## useState

- useState 的初始值，只在第一次有效

```js
const [name, setName] = useState("rose");
```

## useEffect

- 在函数组件里面使用 `class` 的生命周期函数，还是所有函数的合体
- 只在第一次使用的 `componentDidMount`，可以用来请求异步数据... useEffect 最后，加了[]就表示只第一次执行
- 可以写多个 `useEffect`
- 在 `useEffect` 的 `return` 里面可以做取消订阅的事
- `useEffect` 不能被判断包裹
- `useEffect` 不能被打断
- `useEffect` 里面使用到的 `state` 的值, 固定在了 `useEffect` 内部， 不会被改变，除非 `useEffect` 刷新，重新固定 `state` 的值

## useRef

- `useEffect` 里面的 `state` 的值，是固定的，这个是有办法解决的，就是用 `useRef`，可以理解成 `useRef` 的一个作用
- 就是相当于全局作用域，一处被修改，其他地方全更新...
- 普遍操作，用来操作 `dom`

## useMemo

- `memo` 的用法是：函数组件里面的`PureComponent`
- `memo` 是浅比较,对象只比较内存地址，只要你内存地址没变，管你对象里面的值千变万化都不会触发 `render`
- `useMemo` 的作用是， 于是 `useMemo` 作为一个有着暂存能力的,存了上一次的结果，`useMemo` 是缓存值的

## useCallback

- useMemo 与 useCallback 类似，都是有着缓存的作用,`useCallback` 是缓存函数的
- 没有依赖，添加空的依赖，就是空数组

## useReducer

```js
const reducer = (state = 0, { type }) => {
  switch (type) {
    case "add":
      return state + 1;
    case "delete":
      return state - 1;
    default:
      return state;
  }
};

const Hook = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  return (
    <div>
      count:{count}
      <button onClick={() => dispatch({ type: "add" })}>add</button>
      <button onClick={() => dispatch({ type: "delete" })}>delete</button>
    </div>
  );
};

export default Hook;
```

> <https://juejin.im/post/5c230aa2e51d4529355bc2e0F>

## useContext

```js
import React, { useContext, useReducer } from "react";

const reducer = (state = 0, { type }) => {
  switch (type) {
    case "add":
      return state + 1;
    case "delete":
      return state - 1;
    default:
      return state;
  }
};
const Context = React.createContext(null);

const Child = () => {
  const [count, dispatch] = useContext(Context);
  return (
    <div>
      <div>child...{count}</div>
      <button onClick={() => dispatch({ type: "add" })}>child add</button>
      <button onClick={() => dispatch({ type: "delete" })}>child delete</button>
    </div>
  );
};

const Hook = () => {
  const [count, dispatch] = useReducer(reducer, 10);
  return (
    <Context.Provider value={[count, dispatch]}>
      <div>
        <div>mom ... {count}</div>
        <Child />
        <button onClick={() => dispatch({ type: "add" })}>mom add</button>
        <button onClick={() => dispatch({ type: "delete" })}>mom delete</button>
      </div>
    </Context.Provider>
  );
};

export default Hook;
```

## 自定义 hook

```js
import { useEffect, useState } from "react";

export const useWindowSize = () => {
  const [width, setWidth] = useState();
  const [height, setHeight] = useState();

  useEffect(() => {
    const { clientWidth, clientHeight } = document.documentElement;
    setWidth(clientWidth);
    setHeight(clientHeight);
  }, []);

  useEffect(() => {
    const handleWindowSize = () => {
      const { clientWidth, clientHeight } = document.documentElement;
      setWidth(clientWidth);
      setHeight(clientHeight);
    };

    window.addEventListener("resize", handleWindowSize, false);

    return () => {
      window.removeEventListener("resize", handleWindowSize, false);
    };
  });

  return [width, height];
};
```

> <https://react.docschina.org/docs/hooks-faq.html#how-do-lifecycle-methods-correspond-to-hooks>
>
> <https://juejin.im/post/5e53d9116fb9a07c9070da44?utm_source=gold_browser_extension>
