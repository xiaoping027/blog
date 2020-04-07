# React-合成事件

React 实现了一个合成事件层，就是这个事件层，把 `IE` 和 `W3C` 标准之间的兼容问题给消除了

因为合成事件的触发是基于浏览器的事件机制来实现的，通过冒泡机制冒泡到最顶层元素，然后再由 `dispatchEvent` 统一去处理.

- React 上注册的事件最终会绑定在 document 这个 DOM 上，而不是 React 组件对应的 DOM(减少内存开销就是因为所有的事件都绑定在 document 上，其他节点没有绑定事件)
- React 自身实现了一套事件冒泡机制
- React 通过队列的形式，从触发的组件向父组件回溯，然后调用他们 JSX 中定义的 callback
- React 有一套自己的合成事件 SyntheticEvent，不是原生的，除兼容所有浏览器外，它还拥有和浏览器原生事件相同的接口，包括 stopPropagation() 和 preventDefault()
- React 通过对象池的形式管理合成事件对象的创建和销毁，减少了垃圾的生成和新对象内存的分配，提高了性能

```sh
ReactEventListener：负责事件的注册。
ReactEventEmitter：负责事件的分发。
EventPluginHub：负责事件的存储及分发。
Plugin：根据不同的事件类型构造不同的合成事件。
```

## 事件注册

react 事件注册过程其实主要做了 2 件事：事件注册、事件存储。

- 事件注册 - 组件挂载阶段，根据组件内的声明的事件类型-onclick，onchange 等，给 document 上添加事件 -addEventListener，并指定统一的事件处理程序 dispatchEvent。

- 事件存储 - 就是把 react 组件内的所有事件统一的存放到一个对象里，缓存起来，为了在触发事件的时候可以查找到对应的方法去执行。

```js
// 事件绑定
function handleClick(e) {
  e.preventDefault();
  console.log("The link was clicked.");
}

return (
  <a href="#" onClick={handleClick}>
    Click me
  </a>
);
```

## 事件执行

在事件注册阶段，最终所有的事件和事件类型都会保存到 `listenerBank` 中。

- 1.进入统一的事件分发函数(dispatchEvent)
- 2.结合原生事件找到当前节点对应的 ReactDOMComponent 对象
- 3.开始事件的合成
  - 3.1 根据当前事件类型生成指定的合成对象
  - 3.2 封装原生事件和冒泡机制
  - 3.3 查找当前元素以及他所有父级
  - 3.4 在 listenerBank 查找事件回调并合成到 event(合成事件结束)
- 4.批量处理合成事件内的回调事件（事件触发完成 end）

```js
handleFatherClick=(e)=>{
        console.log('father click');
    }

    handleChildClick=(e)=>{
        console.log('child click');
    }

    render(){
        return <div className="box">
                    <div className="father" onClick={this.handleFatherClick}> father
                        <div className="child" onClick={this.handleChildClick}>child </div>
                    </div>
               </div>
    }

// child click
// father click
```

当点击 child div 的时候，这个时候浏览器会捕获到这个事件，然后经过冒泡，事件被冒泡到 document 上，交给统一事件处理函数

`dispatchEvent` 进行处理。（上一文中我们已经说过 document 上已经注册了一个统一的事件处理函数 `dispatchEvent` ）。

根据当前事件类型找到对应的合成类，然后进行合成对象的生成,`react-dom/event/SimpleEventPlugin.js`

```js
const SimpleEventPlugin: PluginModule<MouseEvent> = {
  // simpleEventPluginEventTypes gets populated from
  // the DOMEventProperties module.
  eventTypes: simpleEventPluginEventTypes,
  extractEvents: function (
    topLevelType: TopLevelType,
    targetInst: null | Fiber,
    nativeEvent: MouseEvent,
    nativeEventTarget: null | EventTarget,
    eventSystemFlags: EventSystemFlags
  ): null | ReactSyntheticEvent {
    const dispatchConfig = topLevelEventsToDispatchConfig.get(topLevelType);
    if (!dispatchConfig) {
      return null;
    }
    let EventConstructor;
    switch (topLevelType) {
      case DOMTopLevelEventTypes.TOP_KEY_PRESS:
        // Firefox creates a keypress event for function keys too. This removes
        // the unwanted keypress events. Enter is however both printable and
        // non-printable. One would expect Tab to be as well (but it isn't).
        if (getEventCharCode(nativeEvent) === 0) {
          return null;
        }
      /* falls through */
      case DOMTopLevelEventTypes.TOP_KEY_DOWN:
      case DOMTopLevelEventTypes.TOP_KEY_UP:
        EventConstructor = SyntheticKeyboardEvent;
        break;
      case DOMTopLevelEventTypes.TOP_BLUR:
      case DOMTopLevelEventTypes.TOP_FOCUS:
        EventConstructor = SyntheticFocusEvent;
        break;
      case DOMTopLevelEventTypes.TOP_CLICK:
        // Firefox creates a click event on right mouse clicks. This removes the
        // unwanted click events.
        if (nativeEvent.button === 2) {
          return null;
        }
      /* falls through */
      case DOMTopLevelEventTypes.TOP_AUX_CLICK:
      case DOMTopLevelEventTypes.TOP_DOUBLE_CLICK:
      case DOMTopLevelEventTypes.TOP_MOUSE_DOWN:
      case DOMTopLevelEventTypes.TOP_MOUSE_MOVE:
      case DOMTopLevelEventTypes.TOP_MOUSE_UP:
      // TODO: Disabled elements should not respond to mouse events
      /* falls through */
      case DOMTopLevelEventTypes.TOP_MOUSE_OUT:
      case DOMTopLevelEventTypes.TOP_MOUSE_OVER:
      case DOMTopLevelEventTypes.TOP_CONTEXT_MENU:
        EventConstructor = SyntheticMouseEvent;
        break;
      case DOMTopLevelEventTypes.TOP_DRAG:
      case DOMTopLevelEventTypes.TOP_DRAG_END:
      case DOMTopLevelEventTypes.TOP_DRAG_ENTER:
      case DOMTopLevelEventTypes.TOP_DRAG_EXIT:
      case DOMTopLevelEventTypes.TOP_DRAG_LEAVE:
      case DOMTopLevelEventTypes.TOP_DRAG_OVER:
      case DOMTopLevelEventTypes.TOP_DRAG_START:
      case DOMTopLevelEventTypes.TOP_DROP:
        EventConstructor = SyntheticDragEvent;
        break;
      case DOMTopLevelEventTypes.TOP_TOUCH_CANCEL:
      case DOMTopLevelEventTypes.TOP_TOUCH_END:
      case DOMTopLevelEventTypes.TOP_TOUCH_MOVE:
      case DOMTopLevelEventTypes.TOP_TOUCH_START:
        EventConstructor = SyntheticTouchEvent;
        break;
      case DOMTopLevelEventTypes.TOP_ANIMATION_END:
      case DOMTopLevelEventTypes.TOP_ANIMATION_ITERATION:
      case DOMTopLevelEventTypes.TOP_ANIMATION_START:
        EventConstructor = SyntheticAnimationEvent;
        break;
      case DOMTopLevelEventTypes.TOP_TRANSITION_END:
        EventConstructor = SyntheticTransitionEvent;
        break;
      case DOMTopLevelEventTypes.TOP_SCROLL:
        EventConstructor = SyntheticUIEvent;
        break;
      case DOMTopLevelEventTypes.TOP_WHEEL:
        EventConstructor = SyntheticWheelEvent;
        break;
      case DOMTopLevelEventTypes.TOP_COPY:
      case DOMTopLevelEventTypes.TOP_CUT:
      case DOMTopLevelEventTypes.TOP_PASTE:
        EventConstructor = SyntheticClipboardEvent;
        break;
      case DOMTopLevelEventTypes.TOP_GOT_POINTER_CAPTURE:
      case DOMTopLevelEventTypes.TOP_LOST_POINTER_CAPTURE:
      case DOMTopLevelEventTypes.TOP_POINTER_CANCEL:
      case DOMTopLevelEventTypes.TOP_POINTER_DOWN:
      case DOMTopLevelEventTypes.TOP_POINTER_MOVE:
      case DOMTopLevelEventTypes.TOP_POINTER_OUT:
      case DOMTopLevelEventTypes.TOP_POINTER_OVER:
      case DOMTopLevelEventTypes.TOP_POINTER_UP:
        EventConstructor = SyntheticPointerEvent;
        break;
      default:
        if (__DEV__) {
          if (knownHTMLTopLevelTypes.indexOf(topLevelType) === -1) {
            console.error(
              "SimpleEventPlugin: Unhandled event type, `%s`. This warning " +
                "is likely caused by a bug in React. Please file an issue.",
              topLevelType
            );
          }
        }
        // HTML Events
        // @see http://www.w3.org/TR/html5/index.html#events-0
        EventConstructor = SyntheticEvent;
        break;
    }
    const event = EventConstructor.getPooled(
      dispatchConfig,
      targetInst,
      nativeEvent,
      nativeEventTarget
    );
    accumulateTwoPhaseDispatches(event);
    return event;
  },
};
```

## 如何在 React 中使用原生事件

由于原生事件需要绑定在真实 DOM 上，所以一般是在 `componentDidMount` 阶段`ref` 的函数执行阶段进行绑定操作，在 `componentWillUnmount` 阶段进行解绑操作以避免内存泄漏。

示例如下：

```js
class Demo extends React.PureComponent {
  componentDidMount() {
    const $this = ReactDOM.findDOMNode(this);
    $this.addEventListener("click", this.onDOMClick, false);
  }

  onDOMClick = (evt) => {
    // ...
  };

  render() {
    return <div>Demo</div>;
  }
}
```

## 合成事件和原生事件混用

```js
class Demo extends React.PureComponent {
  componentDidMount() {
    const $this = ReactDOM.findDOMNode(this);
    $this.addEventListener("click", this.onDOMClick, false);
  }

  onDOMClick = (evt) => {
    console.log("dom event");
  };

  onClick = (evt) => {
    console.log("react event");
  };

  render() {
    return <div onClick={this.onClick}>Demo</div>;
  }
}
```

- 原生事件（阻止冒泡）会阻止合成事件的执行
- 合成事件（阻止冒泡）不会阻止原生事件的执行
- 不要触发任何其他元素的事件，调用 e.nativeEvent.stopImmediatePropagatio

- e.stopPropagation → 用来阻止 React 模拟的事件冒泡
- e.stopImmediatePropagation → 没有这个函数
- e.nativeEvent.stopPropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡
- e.nativeEvent.stopImmediatePropagation → 原生事件对象的用于阻止 DOM 事件的进一步捕获或者冒泡，且该元素的后续绑定的相同事件类型的事件也被一并阻止。
- React 中另一个不同点是你不能通过返回 false 的方式阻止默认行为。你必须显式的使用 preventDefault

> <https://github.com/youngwind/blog/issues/107>
