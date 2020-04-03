# React-Router Lifecycle

## Lifecycle

`Lifecycle` 源码比较简单，就是对 `react` 生命周期的封装

- componentDidMount
- componentDidUpdate
- componentWillUnmount

```js
import React from "react";

class Lifecycle extends React.Component {
  componentDidMount() {
    if (this.props.onMount) this.props.onMount.call(this, this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.onUpdate) this.props.onUpdate.call(this, this, prevProps);
  }

  componentWillUnmount() {
    if (this.props.onUnmount) this.props.onUnmount.call(this, this);
  }

  render() {
    return null;
  }
}

export default Lifecycle;
```

## Prompt

用于在离开屏幕之前提示用户的公共 API。

调用的是 `history.block`进行拦截

接收两个参数：

- message type func|string
- when type bool

```js
function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {context => {
        if (!when || context.staticContext) return null;

        const method = context.history.block;

        return (
          <Lifecycle
            onMount={self => {
              self.release = method(message);
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                self.release();
                self.release = method(message);
              }
            }}
            onUnmount={self => {
              self.release();
            }}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
```

## Redirect

- computedMatch
- computedMatch type string|object
- push bool

```js
function Redirect({ computedMatch, to, push = false }) {
  return (
    <RouterContext.Consumer>
      {context => {
        const { history, staticContext } = context;
        // 默认调用 history.replace
        const method = push ? history.push : history.replace;
        // to string or object
        const location = createLocation(
          computedMatch
            ? typeof to === "string"
              ? generatePath(to, computedMatch.params)
              : {
                  ...to,
                  pathname: generatePath(to.pathname, computedMatch.params)
                }
            : to
        );

        //在静态环境中进行渲染时，
        //立即设置新位置。

        if (staticContext) {
          method(location);
          return null;
        }

        return (
          <Lifecycle
            onMount={() => {
              method(location);
            }}
            onUpdate={(self, prevProps) => {
              const prevLocation = createLocation(prevProps.to);
              if (
                !locationsAreEqual(prevLocation, {
                  ...location,
                  key: prevLocation.key
                })
              ) {
                method(location);
              }
            }}
            to={to}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}
```
