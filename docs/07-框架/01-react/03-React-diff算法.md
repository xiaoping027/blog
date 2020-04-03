# React-Diff 算法

`React diff` 作为 `Virtual DOM` 的加速器，其算法上的改进优化是 `React` 整个界面渲染的基础，以及性能提高的保障。

```js
var MyComponent = React.createClass({
  render: function() {
    if (this.props.first) {
      return (
        <div className="first">
          <span>A Span</span>
        </div>
      );
    } else {
      return (
        <div className="second">
          <p>A Paragraph</p>
        </div>
      );
    }
  }
});
```

React 将使用此表示法来尝试找到从上一个渲染到下一个渲染的最小步数，比如，如果我们要用 `<MyComponent first={false} />去替代<MyComponent first={true} />`，插入真实 DOM， 然后移除它，下面是 DOM 指令的结果：

- 从无到有创建 DOM 节点：`<div className="first"><span>A Span</span></div>`
- 从一到二用 `className="second"`去替换属性 `className="first"`用 `<p>A Paragraph</p>` 去替换节点`<span>A Span</span>`
- 从二到无移除节点：`<div className="second"><p>A Paragraph</p></div>`

## 传统 diff 算法

计算一棵树形结构转换成另一棵树形结构的最少操作，是一个复杂且值得研究的问题。传统 diff 算法通过循环递归对节点进行依次对比，效率低下，算法复杂度达到 `O(n^3)`，其中 n 是树中节点的总数。`O(n^3)` 到底有多可怕，这意味着如果要展示 `1000` 个节点，就要依次执行上十亿次的比较。这种指数型的性能消耗对于前端渲染场景来说代价太高了！现今的 CPU 每秒钟能执行大约 30 亿条指令，即便是最高效的实现，也不可能在一秒内计算出差异情况。

如果 React 只是单纯的引入 diff 算法而没有任何的优化改进，那么其效率是远远无法满足前端渲染所要求的性能。

## React-diff

传统 `diff` 算法的复杂度为 `O(n^3)`，显然这是无法满足性能要求的。React 通过制定大胆的策略，将 `O(n^3)` 复杂度的问题转换成 `O(n`) 复杂度的问题。

- 1.`Web UI` 中 DOM 节点跨层级的移动操作特别少，可以忽略不计。
- 2.拥有相同类的两个组件将会生成相似的树形结构，拥有不同类的两个组件将会生成不同的树形结构。
- 3.对于同一层级的一组子节点，它们可以通过唯一 id 进行区分。

### Level by Level

React 只是一级一级的调用这棵树。 在影响极小的性能代价下大大的降低来复杂度，在 Web 应用中移动不同的 DOM 树是及其罕见的。 通常只会在子节点上进行横向移动。

![img](https://pic1.zhimg.com/80/0c08dbb6b1e0745780de4d208ad51d34_hd.png)

### List

假设我们有一个组件，一次渲染五个组件并在下一次渲染时候插入在其中插入一个新组件。这样很难比较这两个列表中组件之间的映射关系

默认情况下，React 会把前一个列表组件和下一个列表组件相关联起来。你可以通过添加 key 的方式，去帮助 React 找到映射。在实际中，这样子元素就会容易的被找出来

![img](https://pic4.zhimg.com/80/c0aa97d996de5e7f1069e97ca3accfeb_hd.png)

### 组件

一个 React 应用程序通常由许多用户定义的组件组成，最终会变成一个主要由 div 组成的树。 通过 diff 算法考虑了这些附加信息，因为 React 只匹配具有相同类的组件。

不同类型的 `component` 是很少存在相似 DOM tree 的机会，因此这种极端因素很难在实现开发过程中造成重大影响的

![img](https://user-gold-cdn.xitu.io/2018/6/30/1644c4b632dbf5c7?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- React 通过分层求异的策略，对 tree diff 进行算法优化；
- React 通过相同类生成相似树形结构，不同类生成不同树形结构的策略，对 - component diff 进行算法优化；
- React 通过设置唯一 key 的策略，对 element diff 进行算法优化；
- React 通过制定大胆的 diff 策略，将 O(n3) 复杂度的问题转换成 O- (n) 复杂度的问题；
- 建议，开发时保持稳定的 DOM 结构有助于性能的提升；
