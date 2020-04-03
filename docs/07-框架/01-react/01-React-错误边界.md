# React 错误边界

> <http://react.html.cn/docs/error-boundaries.html>

## 错误边界介绍

部分 `UI` 中的 `JavaScript` 错误不应该破坏整个应用程序。 为了解决 `React` 用户的这个问题，`React 16` 引入了一个 `错误边界(Error Boundaries)` 的新概念

错误边界是 `React` 组件，它可以 在子组件树的任何位置捕获 `JavaScript` 错误，记录这些错误，并显示一个备用 `UI` ，而不是使整个组件树崩溃。 错误边界(`Error Boundaries`) 在渲染，生命周期方法以及整个组件树下的构造函数中捕获错误。g

错误边界无法捕获如下错误:

- 事件处理
- 异步代码 （例如 setTimeout 或 requestAnimationFrame 回调函数）
- 服务端渲染
- 错误边界自身抛出来的错误 （而不是其子组件）

如果一个类组件定义了生命周期方法中的任何一个（或两个）`static getDerivedStateFromError()` 或 `componentDidCatch()`，那么它就成了一个错误边界。 使用 `static getDerivedStateFromError()`在抛出错误后渲染回退 `UI`。 使用 `componentDidCatch()` 来记录错误信息。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

而后你可以像一个普通的组件一样使用：

```jsx
<ErrorBoundary>
  <MyWidget />
</ErrorBoundary>
```

错误边界(`Error Boundaries`) 仅可以捕获其子组件的错误。错误边界无法捕获其自身的错误。如果一个错误边界无法渲染错误信息，则错误会向上冒泡至最接近的错误边界

## static getDerivedStateFromError()

`在后代组件抛出错误后调用此生命周期`。 它接收作为参数抛出的错误，并应返回值以更新 `state`(状态)。

## componentDidCatch()

`componentDidCatch(error, info)`

- error - 抛出的错误。
- info - 包含 componentStack 键的对象，其中包含 有关哪个组件引发错误的信息 。
