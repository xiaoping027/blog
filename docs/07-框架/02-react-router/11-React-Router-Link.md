# React-Router Link

## 源码

```js
const LinkAnchor = forwardRef(
  (
    {
      innerRef, // TODO: deprecate
      navigate,
      onClick,
      ...rest
    },
    forwardedRef
  ) => {
    const { target } = rest;

    let props = {
      ...rest,
      onClick: event => {
        try {
          if (onClick) onClick(event);
          // 如果定义了onClick方法，则执行该方法
        } catch (ex) {
          event.preventDefault();
          throw ex;
        }

        //阻止a标签默认行为
        if (
          !event.defaultPrevented && // onClick prevented default
          event.button === 0 && // ignore everything but left clicks
          (!target || target === "_self") && // let browser handle "target=_blank" etc.
          !isModifiedEvent(event) // ignore clicks with modifier keys
        ) {
          event.preventDefault();
          navigate();
        }
      }
    };

    // React 15 compat 兼容性
    if (forwardRefShim !== forwardRef) {
      props.ref = forwardedRef || innerRef;
    } else {
      props.ref = innerRef;
    }
    //最终返回的是一个a 标签
    /* eslint-disable-next-line jsx-a11y/anchor-has-content */
    return <a {...props} />;
  }
);

/**
 * The public API for rendering a history-aware <a>.
 */
const Link = forwardRef(
  (
    {
      component = LinkAnchor,
      replace,
      to,
      innerRef, // TODO: deprecate
      ...rest
    },
    forwardedRef
  ) => {
    return (
      <RouterContext.Consumer>
        {context => {
          const { history } = context;

          const location = normalizeToLocation(
            resolveToLocation(to, context.location),
            context.location
          );

          const href = location ? history.createHref(location) : "";
          const props = {
            ...rest,
            href,
            navigate() {
              const location = resolveToLocation(to, context.location);
              const method = replace ? history.replace : history.push;

              method(location);
            }
          };

          // React 15 compat 兼容15
          if (forwardRefShim !== forwardRef) {
            props.ref = forwardedRef || innerRef;
          } else {
            props.innerRef = innerRef;
          }

          return React.createElement(component, props);
          //创建element -> LinkAnchor 最终返回是的 a 标签
        }}
      </RouterContext.Consumer>
    );
  }
);

export default Link;
```

## React.forwardRef

`React.forwardRef` 会创建一个`React`组件，这个组件能够将其接受的 `ref` 属性转发到其组件树下的另一个组件中。这种技术并不常见，但在以下两种场景中特别有用：

- 转发 refs 到 DOM 组件
- 在高阶组件中转发 refs

`React.forwardRef` 接受渲染函数作为参数。`React` 将使用 `props` 和 `ref` 作为参数来调用此函数。此函数应返回 `React` 节点。

```js
const FancyButton = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">
    {props.children}
  </button>
));

// 你可以直接获取 DOM button 的 ref：
const ref = React.createRef();
<FancyButton ref={ref}>Click me!</FancyButton>;
```

- 1.通过调用 React.createRef 创建了一个 React ref 并将其赋值给 ref 变量
- 2.我们通过指定 ref 为 JSX 属性，将其向下传递给 `<FancyButton ref={ref}>`
- 3.React 传递 ref 给 forwardRef 内函数 (props, ref) => ...，作为其第二个参数
- 4.我们向下转发该 ref 参数到 `<button ref={ref}>`，将其指定为 JSX 属性
- 5.当 ref 挂载完成，ref.current 将指向 `<button>`DOM 节点

## LinkAnchor 和 Link

这边是把组件拆分了,用了`react` 新增的 `forwardRef`的新增`api`,转发组件。

Link 在最后渲染的时候其实是创建了`<a>`标签，同时添加了一个 `onClick` 的监听事件，`onClick` 事件处理函数中做了两件事

- `Link`的`onClick`回调中不包含`event.preventDefault()`代码
- 点击按键是左键
- `Link` 的 `props` 未定义 `target`
- 点击操作触发时没有功能键（ctrl、shift 等）被按下

## NavLink

`NavLink` 是一种特殊的 `Link`，它的特殊体现在当与 `url` 匹配时生成的`<a>`标签上会带有一些样式信息(通过 `activeClassName` 和 `activeStyle` 定义样式)。 是对`Link`的封装。

> <https://zh-hans.reactjs.org/docs/react-api.html#reactforwardref>
>
> <https://juejin.im/post/5db6506d6fb9a0207326a928>
