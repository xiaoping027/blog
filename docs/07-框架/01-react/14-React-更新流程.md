# React 更新过程浅析

## 整体过程

`React`整体是函数式的思想,把组件设计成纯组件，状态和逻辑通过参数传入.
所以在`React`中，是单向数据流，推崇结合 `immutable` 来实现数据不可变。`React` 在 `setState` 之后会重新走渲染的流程，
如果 `shouldComponentUpdate` 返回的是 `true` ，就继续渲染，如果返回了 `false`，就不会重新渲染。

```js
整体过程

触发状态更新（根据场景调用不同方法）

ReactDOM.render
this.setState
this.forceUpdate
useState
useReducer

    |
    |
    v
创建 Update 对象
一个保存更新状态相关内容的对象
    |
    |
    v
从 fiber 到 root
从触发状态更新的 fiber 一直向上遍历到 rootFiber，并返回 rootFiber
    |
    |
    v
调度更新
根据优先级调度回调函数执行
    |
    |
    v
render 阶段
将结果用于构造 DOM 对象
    |
    |
    v
commit 阶段
更新 UI
```

## 优先级

状态更新由用户交互产生，用户心里对交互执行顺序有个预期。`React` 根据人机交互研究的结果中用户对交互的预期顺序为交互产生的状态更新赋予不同优先级。

例如：

- 生命周期方法：同步执行。
- 受控的用户输入：比如输入框内输入文字，同步执行。
- 交互事件：比如动画，高优先级执行。
- 其他：比如数据请求，低优先级执行。
