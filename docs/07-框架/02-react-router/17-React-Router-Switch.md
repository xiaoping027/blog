# React-Router Switch

## 源码

The public API for rendering the first `<Route>` that matches

呈现第一个与之匹配的`<Route>或<Redirect>`的公共 API

当 `Switch` 中的第一个 `Route` 匹配之后就不会再渲染其他的 `Route` 了。

```js
class Switch extends React.Component {
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          invariant(context, "You should not use <Switch> outside a <Router>");

          const location = this.props.location || context.location;

          let element, match;

          // 我们使用React.Children.forEach代替React.Children.toArray（）。find（）
          //这里，因为toArray将键添加到所有子元素，我们不希望
          //触发渲染相同的两个<Route>的卸载/重装
          //不同网址的组件。
          //调用的是 React.Children.forEach
          React.Children.forEach(this.props.children, child => {
            if (match == null && React.isValidElement(child)) {
              element = child;

              const path = child.props.path || child.props.from;

              match = path
                ? matchPath(location.pathname, { ...child.props, path })
                : context.match;
            }
          });
          // 在最后的时候使用 React.cloneElement 渲染
          return match
            ? React.cloneElement(element, { location, computedMatch: match })
            : null;
        }}
      </RouterContext.Consumer>
    );
  }
}
```
