# React-PureComponent

`React.PureComponent`与 `React.Component` 很相似。两者的区别在于 `React.Component` 并未实现 `shouldComponentUpdate()`，而 `React.PureComponent` 中以浅层对比 `prop` 和 `state` 的方式来实现了该函数。

如果赋予 `React` 组件相同的 `props` 和 `state，render()` 函数会渲染相同的内容，那么在某些情况下使用 `React.PureComponent` 可提高性能。

`React.PureComponent` 中的 `shouldComponentUpdate()` 仅作对象的浅层比较。如果对象中包含复杂的数据结构，则有可能因为无法检查深层的差别，产生错误的比对结果。仅在你的 `props` 和 `state` 较为简单时，才使用 `React.PureComponent`，或者在深层数据结构发生变化时调用 `forceUpdate()` 来确保组件被正确地更新。

此外，`React.PureComponent` 中的 `shouldComponentUpdate()` 将跳过所有子组件树的 `prop` 更新。因此，请确保所有子组件也都是“纯”的组件。

> <https://zh-hans.reactjs.org/docs/react-api.html#reactcomponent>

## PureComponent

```js
// 新建了空方法ComponentDummy ，ComponentDummy 的原型 指向 Component 的原型;
function ComponentDummy() {}
ComponentDummy.prototype = Component.prototype;

/**
 * Convenience component with default shallow equality check for sCU.
 */
function PureComponent(props, context, updater) {
  this.props = props;
  this.context = context;
  // If a component has string refs, we will assign a different object later.
  this.refs = emptyObject;
  this.updater = updater || ReactNoopUpdateQueue;
} // 解析同 React.Component，详细请看上一章

/**
 * 实现 React.PureComponent 对 React.Component 的原型继承
 */
/**
 * 用 ComponentDummy 的原因是为了不直接实例化一个 Component 实例，可以减少一些内存使用
 *
 * 因为，我们这里只需要继承 React.Component 的 原型，直接 PureComponent.prototype = new Component() 的话
 * 会继承包括 constructor 在内的其他 Component 属性方法，但是 PureComponent 已经有自己的 constructor 了，
 * 再继承的话，造成不必要的内存消耗
 * 所以会新建ComponentDummy，只继承Component的原型，不包括constructor，以此来节省内存。
 */
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());

// 修复 pureComponentPrototype 构造函数指向
pureComponentPrototype.constructor = PureComponent;

// Avoid an extra prototype jump for these methods.
// 虽然上面两句已经让PureComponent继承了Component
// 但多加一个 Object.assign()，能有效的避免多一次原型链查找
Object.assign(pureComponentPrototype, Component.prototype);

// 唯一的区别，原型上添加了 isPureReactComponent 属性去表示该 Component 是 PureComponent
// 在后续组件渲染的时候，react-dom 会去判断 isPureReactComponent 这个属性，来确定是否浅比较 props、status 实现更新
/** 在 ReactFiberClassComponent.js 中，有对 isPureReactComponent 的判断
 if (ctor.prototype && ctor.prototype.isPureReactComponent) {
    return (
      !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState)
    );
  }
 */
pureComponentPrototype.isPureReactComponent = true;
```

## 浅比较

当对比的类型为 `Object` 的时候并且 `key` 的长度相等的时候，浅比较也仅仅是用 `Object.is()`对 `Object` 的 `value` 做了一个基本数据类型的比较，所以如果 `key` 里面是对象的话，有可能出现比较不符合预期的情况，所以浅比较是不适用于嵌套类型的比较的

```js
// 用原型链的方法
const hasOwn = Object.prototype.hasOwnProperty;

// 这个函数实际上是Object.is()的polyfill
function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

export default function shallowEqual(objA, objB) {
  // 首先对基本数据类型的比较
  if (is(objA, objB)) return true;
  // 由于Obejct.is()可以对基本数据类型做一个精确的比较， 所以如果不等
  // 只有一种情况是误判的，那就是object,所以在判断两个对象都不是object
  // 之后，就可以返回false了
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 过滤掉基本数据类型之后，就是对对象的比较了
  // 首先拿出key值，对key的长度进行对比

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  // 长度不等直接返回false
  if (keysA.length !== keysB.length) return false;
  // key相等的情况下，在去循环比较
  for (let i = 0; i < keysA.length; i++) {
    // key值相等的时候
    // 借用原型链上真正的 hasOwnProperty 方法，判断ObjB里面是否有A的key的key值
    // 属性的顺序不影响结果也就是{name:'daisy', age:'24'} 跟{age:'24'，name:'daisy' }是一样的
    // 最后，对对象的value进行一个基本数据类型的比较，返回结果
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}
```

## 总结

- `PureComponent` 某些情况下（`props` 或 `state` 的值不经常变动， 因为浅比较也会耗时）可以提升性能
- 继承自 `Component` 中的组件 `shouldComponentUpdate()`默认情况下总是返回 `true`；
- `state` 数据不能使用一个引用
- `PureComponent`重新渲染时，不仅会影响它本身，而且会影响它的说有子元素，所以，使用 `PureComponent` 的最佳情况就是展示组件，它既没有子组件，也没有依赖应用的全局状态
