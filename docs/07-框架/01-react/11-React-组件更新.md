# React-组件更新

当组件被装载到 `DOM` 树上之后，用户在网页上可以看到组件的第一印象，但是要提供更好的交互体验，就要让该组件可以随着用户操作改变展现的内容，当 `props` 或者 `state` 被修改的时候,以及执行 `this.forceUpdate()`，就会引发组件的更新过程。更新过程会依次调用下面的生命周期函数，其中 `render` 函数和装载过程一样，没有差别。

## 生命周期

### static getDerivedStateFromProps()

在调用 `render` 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。

唯一作用：让组件在 `props` 变化时更新 `state`。

- 1.直接复制 props 到 state 上；
- 2.如果 props 和 state 不一致就更新 state

> <https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state>

### shouldComponentUpdate()

当 `props` 或 `state` 发生变化时，`shouldComponentUpdate()` 会在渲染执行之前被调用。返回值默认为 `true` 。首次渲染或使用 `forceUpdate()` 时不会调用该方法。

### render()

`render()` 函数应该为纯函数，这意味着在不修改组件 `state` 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。

### getSnapshotBeforeUpdate()

在最近一次渲染输出（提交到 `DOM` 节点）之前调用。它使得组件能在发生更改之前从 `DOM` 中捕获一些信息（例如，滚动位置）.

此生命周期的任何返回值将作为参数传递给 `componentDidUpdate()`。

### componentDidUpdate()

`componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行此方法

可以在 `componentDidUpdate()` 中直接调用 `setState()`，但请注意它必须被包裹在一个条件语句里.

## setState 过程

- `setState` 不会立刻改变 `React` 组件中 `state` 的值
- `setState` 通过引发一次组件的更新过程来引发重新绘制
- 多次 `setState` 函数调用产生的效果会合并。

- `setState` 只在合成事件和钩子函数中是“异步”的，在`原生事件`和 `setTimeout` 中都是同步的。
- `setState` 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 `setState`(partialState, callback) 中的 `callback` 拿到更新后的结果。
- `setState` 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 `setTimeout` 中不会批量更新，在“异步”中如果对同一个值进行多次 `setState` ， `setState` 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 `setState` 多个不同的值，在更新时会对其进行合并批量更新。

```js
ReactComponent.prototype.setState = function(partialState, callback) {
  //  将setState事务放进队列中
  this.updater.enqueueSetState(this, partialState);
  if (callback) {
    this.updater.enqueueCallback(this, callback, "setState");
  }
};
```

在当前节点对应的 `Fiber` 对象上创建了 Update 之后，进就如 `scheduleWork` 调度阶段。

```js
const classComponentUpdater = {
  // isMounted
  enqueueSetState(inst, payload, callback) {
    const fiber = ReactInstanceMap.get(inst);
    const currentTime = requestCurrentTime();
    const expirationTime = computeExpirationForFiber(currentTime, fiber);

    const update = createUpdate(expirationTime);
    update.payload = payload;
    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  },
  // replaceState
  enqueueForceUpdate(inst, callback) {
    const fiber = ReactInstanceMap.get(inst);
    const currentTime = requestCurrentTime();
    const expirationTime = computeExpirationForFiber(currentTime, fiber);

    const update = createUpdate(expirationTime);
    update.tag = ForceUpdate;

    if (callback !== undefined && callback !== null) {
      update.callback = callback;
    }

    enqueueUpdate(fiber, update);
    scheduleWork(fiber, expirationTime);
  }
};
```
