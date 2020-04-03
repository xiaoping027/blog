# React 生命周期

## constructor( ) 构造方法

如果不初始化 `state` 或不进行方法绑定，则不需要为 React 组件实现构造函数

- 通过给 this.state 赋值对象来初始化内部 state。
- 为事件处理函数绑定实例

在 `constructor()` 函数中不要调用 `setState()` 方法。如果你的组件需要使用内部 `state`，请直接在构造函数中为 this.`state` 赋值初始 `state`。

只能在构造函数中直接为 `this.state` 赋值。如需在其他方法中赋值，你应使用 `this.setState()` 替代。

```js
class MyClass extends React.component {
  constructor(props) {
    super(props); // 声明constructor时必须调用super方法
    console.log(this.props); // 可以正常访问this.props
    this.handleClick = this.handleClick.bind(this);
    //绑定
  }
}
```

```js
class MyClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.List
    };
    this.state.list = []; //修改state
    setTimeout(() => {
      this.setState({ list: [1, 2, 3] }); //异步操作后 setState 触发渲染
    }, 100);
  }
}
```

## render() 渲染组件

`render()`方法是 `class` 组件中唯一必须实现的方法。

当 `render` 被调用时，它会检查 `this.props` 和 `this.state` 的变化并返回以下类型之一：

- React 元素。通常通过 JSX 创建。例如，`<div />` 会被 React 渲染为 DOM 节点，`<MyComponent />` 会被 React 渲染为自定义组件，无论是`<div />`还是 `<MyComponent />` 均为 React 元素。

- 数组或 fragments。 使得 render 方法可以返回多个元素。欲了解更多详细信息，请参阅 fragments 文档。

- Portals。可以渲染子节点到不同的 DOM 子树中。欲了解更多详细信息，请参阅有关 portals 的文档
- 字符串或数值类型。它们在 DOM 中会被渲染为文本节点
- 布尔类型或 null。什么都不渲染。（主要用于支持返回 `test && <Child />` 的模式，其中 `test` 为布尔类型。)
- render() 函数应该为纯函数，这意味着在不修改组件 state 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

> 如需与浏览器进行交互，请在 componentDidMount() 或其他生命周期方法中执行你的操作。保持 render() 为纯函数，可以使组件更容易思考。
>
> 如果 shouldComponentUpdate() 返回 false，则不会调用 render()

```js
render() {
  const {nodeResultData: {res} = {}} = this.props;
  if (isEmpty(res)) return noDataInfo;
  const nodeResult = this.getNodeResult(res);
  return (
     <div className="workspace-dialog-result">
         {nodeResult}
    </div>
);

```

### componentDidMount 组件挂载完成后

`componentDidMount()` 会在组件挂载后（插入 `DOM` 树中）立即调用。依赖于 `DOM` 节点的初始化应该放在这里。如需通过网络请求获取数据，此处是实例化请求的好地方。

可以在 `componentDidMount()` 里直接调用 `setState()`。它将触发额外渲染，`但此渲染会发生在浏览器更新屏幕之前`。如此保证了即使在 `render()` 两次调用的情况下，用户也不会看到中间状态。

```js
componentDidMount() {
  axios.get("/auth/getTemplate").then(res => {
    const { TemplateList = [] } = res;
    this.setState({ TemplateList });
  });
}
```

## componentWillUnmount

`omponentWillUnmount()` 会在组件卸载及销毁之前直接调用。在此方法中执行必要的清理操作，例如，清除 `timer`，取消网络请求或清除在 `componentDidMount()` 中创建的订阅等。

`componentWillUnmount()` 中不应调用 `setState()`，因为该组件将永远不会重新渲染。组件实例卸载后，将永远不会再挂载它。

### shouldComponentUpdate()

```js
shouldComponentUpdate(nextProps, nextState);
```

根据 `shouldComponentUpdate()` 的返回值，判断 `React` 组件的输出是否受当前 `state` 或 `props` 更改的影响。默认行为是 `state` 每次发生变化组件都会重新渲染。大部分情况下，你应该遵循默认行为。

当 `props` 或 `state` 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。返回值默认为 `true` 。首次渲染或使用 `forceUpdate()` 时不会调用该方法。

此方法仅作为性能优化的方式而存在。不要企图依靠此方法来“阻止”渲染，因为这可能会产生 bug。你应该考虑使用内置的 `PureComponent` 组件，而不是手动编写 `shouldComponentUpdate()`。`PureComponent` 会对 `props` 和 `state` 进行浅层比较，并减少了跳过必要更新的可能性。

如果你一定要手动编写此函数，可以将 `this.props` 与 `nextProps` 以及 `this.state` 与 `nextState` 进行比较，并返回 `false` 以告知 `React` 可以跳过更新。请注意，返回 `false` 并不会阻止子组件在 `state` 更改时重新渲染。

不建议在 `shouldComponentUpdate()` 中进行深层比较或使用 `JSON.stringify()`。这样非常影响效率，且会损害性能。

目前，如果 `shouldComponentUpdate()` 返回 `false`，则不会调用 `UNSAFE_componentWillUpdate()`，`render()` 和 `componentDidUpdate()`。后续版本，`React` 可能会将 `shouldComponentUpdate` 视为提示而不是严格的指令，并且，当返回 `false` 时，仍可能导致组件重新渲染。

## static getDerivedStateFromProps()

`getDerivedStateFromProps` 会在调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 `state`，如果返回 `null` 则不更新任何内容

> 请注意，不管原因是什么，都会在每次渲染前触发此方法

## getSnapshotBeforeUpdate()

```js
getSnapshotBeforeUpdate(prevProps, prevState);
```

`getSnapshotBeforeUpdate()` 在最近一次渲染输出（提交到 `DOM`节点）之前调用。它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）。

此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

```js
class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们是否在 list 中添加新的 items ？
    // 捕获滚动​​位置以便我们稍后调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      const list = this.listRef.current;
      return list.scrollHeight - list.scrollTop;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // 如果我们 snapshot 有值，说明我们刚刚添加了新的 items，
    // 调整滚动位置使得这些新 items 不会将旧的 items 推出视图。
    //（这里的 snapshot 是 getSnapshotBeforeUpdate 的返回值）
    if (snapshot !== null) {
      const list = this.listRef.current;
      list.scrollTop = list.scrollHeight - snapshot;
    }
  }

  render() {
    return <div ref={this.listRef}>{/* ...contents... */}</div>;
  }
}
```

## static getDerivedStateFromError()

可以使用静态 `getDerivedStateFromError()` 来处理降级渲染。

`getDerivedStateFromError()` 会在渲染阶段调用，因此不允许出现副作用。 如遇此类情况，请改用 `componentDidCatch()`。

```js
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // 更新 state 使下一次渲染可以显降级 UI
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      // 你可以渲染任何自定义的降级  UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

## componentDidCatch

```js
componentDidCatch(error, info);
// error —— 抛出的错误。
// info —— 带有 componentStack key 的对象，其中包含有关组件引发错误的栈信息。
```

`componentDidCatch()` 会在“提交”阶段被调用，因此允许执行副作用。

> <http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/>
>
> <https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html>
>
> <https://zh-hans.reactjs.org/docs/react-component.html>
