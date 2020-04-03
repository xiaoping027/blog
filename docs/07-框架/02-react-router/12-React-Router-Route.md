# React-Router Route

## 源码

```js
class Route extends React.Component {
  render() {
    return (
      // context 消费
      <RouterContext.Consumer>
        {context => {
          const location = this.props.location || context.location;
          const match = this.props.computedMatch
            ? this.props.computedMatch // <Switch> already computed the match for us
            : this.props.path
            ? matchPath(location.pathname, this.props)
            : context.match;

          const props = { ...context, location, match };

          let { children, component, render } = this.props;

          // Preact uses an empty array as children by
          // default, so use null if that's the case.
          if (Array.isArray(children) && children.length === 0) {
            children = null;
          }

          return (
            // / context 生产
            <RouterContext.Provider value={props}>
              {props.match
                ? children
                  ? typeof children === "function"
                    ? __DEV__
                      ? evalChildrenDev(children, props, this.props.path)
                      : children(props)
                    : children
                  : component
                  ? React.createElement(component, props)
                  : render
                  ? render(props)
                  : null
                : typeof children === "function"
                ? __DEV__
                  ? evalChildrenDev(children, props, this.props.path)
                  : children(props)
                : null}
            </RouterContext.Provider>
          );
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Route;
```

## Route

`Route` 当 `url` 改变的时候，将 `path` 属性与改变后的 `url` 做对比，如果匹配成功，则渲染该组件的 `componet` 或者 `children` 属性所赋值的那个组件。

`RouterContext.Provider -> RouterContext.Consumer`的嵌套

> <https://reacttraining.com/react-router/web/example/auth-workflow> 这个网址，打开浏览器的 react 调试工具即可
