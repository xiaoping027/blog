# React-Fiber

React 框架内部的运作可以分为 3 层：

- Virtual DOM 层，描述页面长什么样。
- Reconciler 层，负责调用组件生命周期方法，进行 Diff 运算等。
- Renderer 层，根据不同的平台，渲染出相应的页面，比较常见的是 ReactDOM 和 ReactNative。

在 `v16` 之前，`reconciliation` 简单说就是一个自顶向下递归算法，产出需要对当前 DOM 进行更新或替换的操作列表，一旦开始，会持续占用主线程，中断操作却不容易实现。当 `JS` 长时间执行（如大量计算等），会阻塞样式计算、绘制等工作，出现页面脱帧现象。所以，`v16` 进行了一次重写，迎来了代号为 Fiber 的异步渲染架构。

`Fiber` 其实指的是一种数据结构，它可以用一个纯 JS 对象来表示：

```js
const fiber = {
  stateNode, // 节点实例
  child, // 子节点
  sibling, // 兄弟节点
  return // 父节点
};
```

`Fiber` 核心是实现了一个基于`优先级`和 `requestIdleCallback` 的循环任务调度算法

- reconciliation 阶段可以把任务拆分成多个小任务
- reconciliation 阶段可随时中止或恢复任务
- 可以根据优先级不同来选择优先执行任务

优先级高的任务（如键盘输入）可以打断优先级低的任务（如 Diff）的执行，从而更快的生效。

任务的优先级有六种:

- NoWork: 0, // No work is pending.
- SynchronousPriority: 1, // 文本输入框
- TaskPriority: 2, // 当前调度正执行的任务
- AnimationPriority: 3, // 动画过渡
- HighPriority: 4, // 用户交互反馈
- LowPriority: 5, // 数据的更新
- OffscreenPriority: 6, // 预估未来需要显示的任务

`Fiber Reconciler` 在执行过程中，会分为 2 个阶段。

- 阶段一，生成 Fiber 树，得出需要更新的节点信息。这一步是一个渐进的过程，可以被打断。
- 阶段二，将需要更新的节点一次过批量更新，这个过程不能被打断。

阶段一可被打断的特性，让优先级更高的任务先执行，从框架层面大大降低了页面掉帧的概率

- 在任务队列中选出高优先级的 fiber node 执行，调用 requestIdleCallback 获取所剩时间，若执行时间超过了 deathLine，或者突然插入更高优先级的任务，则执行中断，保存当前结果，修改 tag 标记一下，设置为 pending 状态，迅速收尾并再调用一个 requestIdleCallback，等主线程释放出来再继续
- 恢复任务执行时，检查 tag 是被中断的任务，会接着继续做任务或者重做

## Fiber 树

`Fiber Reconciler` 在阶段一进行 Diff 计算的时候，会生成一棵 `Fiber` 树。这棵树是在 `Virtual DOM` 树的基础上增加额外的信息来生成的，它本质来说是一个链表.

`Fiber` 树在首次渲染的时候会一次过生成。在后续需要 `Diff` 的时候，会根据已有树和最新 `Virtual DOM` 的信息，生成一棵新的树。这颗新树每生成一个新的节点，都会将控制权交回给主线程，去检查有没有优先级更高的任务需要执行。如果没有，则继续构建树的过程：

如果过程中有优先级更高的任务需要进行，则 `Fiber Reconciler` 会丢弃正在生成的树，在空闲的时候再重新执行一遍。

在构造 `Fiber` 树的过程中，`Fiber Reconciler` 会将需要更新的节点信息保存在 `Effect List` 当中，在阶段二执行的时候，会批量更新相应的节点

## 生命周期影响

```js
// reconciliation阶段
componentWillMount;
componentWillReceiveProps;
shouldComponentUpdate;
componentWillUpdate;
// commit阶段
componentDidMount;
componentDidUpdate;
componentWillUnmount;
```
