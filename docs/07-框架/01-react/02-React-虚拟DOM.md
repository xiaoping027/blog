# React-虚拟 DOM

`Virtual DOM` 是对 `DOM` 的抽象,本质上是 `JavaScript` 对象,这个对象就是更加轻量级的对 `DOM` 的描述.

虚拟 DOM 最大的优势在于抽象了原本的渲染过程，实现了跨平台的能力，而不仅仅局限于浏览器的 DOM，可以是安卓和 IOS 的原生组件，可以是近期很火热的小程序，也可以是各种 GUI。

虚拟 DOM 到底是什么，说简单点，就是一个普通的 JavaScript 对象，包含了 tag、props、children 三个属性。

```js
{
  tag: 'div',
  props: {
    id: 'app'
  },
  chidren: [
    {
      tag: 'p',
      props: {
        className: 'text'
      },
      chidren: [
        'hello world!!!'
      ]
    }
  ]
}

```

该对象就是我们常说的虚拟 DOM 了，因为 DOM 是树形结构，所以使用 JavaScript 对象就能很简单的表示。而原生 DOM 因为浏览器厂商需要实现众多的规范（各种 HTML5 属性、DOM 事件），即使创建一个空的 div 也要付出昂贵的代价。虚拟 DOM 提升性能的点在于 DOM 发生变化的时候，通过 diff 算法比对 JavaScript 原生对象，计算出需要变更的 DOM，然后只对变化的 DOM 进行操作，而不是更新整个视图。

## 渲染虚拟 DOM

```js
function render(vdom) {
  // 如果是字符串或者数字，创建一个文本节点
  if (typeof vdom === "string" || typeof vdom === "number") {
    return document.createTextNode(vdom);
  }
  const { tag, props, children } = vdom;
  // 创建真实DOM
  const element = document.createElement(tag);
  // 设置属性
  setProps(element, props);
  // 遍历子节点，并获取创建真实DOM，插入到当前节点
  children.map(render).forEach(element.appendChild.bind(element));

  // 虚拟 DOM 中缓存真实 DOM 节点
  vdom.dom = element;

  // 返回 DOM 节点
  return element;
}

function setProps(element, props) {
  Object.entries(props).forEach(([key, value]) => {
    setProp(element, key, value);
  });
}

function setProp(element, key, vlaue) {
  element.setAttribute(
    // className使用class代替
    key === "className" ? "class" : key,
    vlaue
  );
}
```

## 渲染成真实 DOM

```js
const vdom = <div>hello world!!!</div>; // h('div', {}, 'hello world!!!')
const app = document.getElementById("app");
const ele = render(vdom);
app.appendChild(ele);
```

当然在现代化的框架中，一般会有一个组件文件专门用来构造虚拟 DOM，我们模仿 React 使用 class 的方式编写组件，然后渲染到页面中

```js
class Component {
  vdom = null; // 组件的虚拟DOM表示
  $el = null; // 虚拟DOM生成的真实节点

  state = {
    text: "Initialize the Component"
  };

  render() {
    const { text } = this.state;
    return <div>{text}</div>;
  }
}

function createElement(app, component) {
  const vdom = component.render();
  component.vdom = vdom;
  component.$el = render(vdom); // 将虚拟 DOM 转换为真实 DOM
  app.appendChild(component.$el);
}

const app = document.getElementById("app");
const component = new Component();
createElement(app, component);
```

## 优势

- Virtual DOM 在牺牲(牺牲很关键)部分性能的前提下，增加了可维护性，这也是很多框架的通性。
- 实现了对 DOM 的集中化操作，在数据改变时先对虚拟 DOM 进行修改，再反映到真实的 DOM 中，用最小的代价来更新 DOM，提高效率(提升效率要想想是跟哪个阶段比提升了效率，别只记住了这一条)。
- 打开了函数式 UI 编程的大门。
- 可以渲染到 DOM 以外的端，使得框架跨平台，比如 ReactNative，React VR 等。
- 可以更好的实现 SSR，同构渲染等。这条其实是跟上面一条差不多的。
- 组件的高度抽象化。

## 缺点

- 首次渲染大量 DOM 时，由于多了一层虚拟 DOM 的计算，会比 innerHTML 插入慢。
- 虚拟 DOM 需要在内存中的维护一份 DOM 的副本(更上面一条其实也差不多，上面一条是从速度上，这条是空间上)。
- 如果虚拟 DOM 大量更改，这是合适的。但是单一的，频繁的更新的话，虚拟 DOM 将会花费更多的时间处理计算的工作。所以，如果你有一个 DOM 节点相对较少页面，用虚拟 DOM，它实际上有可能会更慢。但对于大多数单页面应用，这应该都会更快。
