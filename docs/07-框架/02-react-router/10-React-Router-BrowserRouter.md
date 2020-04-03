# React-Router BrowserRouter

```js
class BrowserRouter extends React.Component {
  history = createHistory(this.props);
  // history 对象结构
  const history = {
  length: globalHistory.length,
  action: "POP",
  location: initialLocation,
  createHref,
  push,
  replace,
  go,
  goBack,
  goForward,
  block,
  listen
};

  render() {
    return <Router history={this.history} children={this.props.children} />;
  }
}

if (__DEV__) {
  BrowserRouter.propTypes = {
    basename: PropTypes.string,
    children: PropTypes.node,
    forceRefresh: PropTypes.bool,
    getUserConfirmation: PropTypes.func,
    keyLength: PropTypes.number
  };
}
export default BrowserRouter;
```

用`<BrowserRouter>` 组件包裹整个 App 系统

```js
import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </BrowserRouter>
  );
}
```

- basename: string 这个属性，是为当前的 url 再增加名为 basename 的值的子目录
- getUserConfirmation: func 这个属性，用于确认导航的功能。默认使用 window.confirm
- forceRefresh: bool 默认为 false，表示改变路由的时候页面不会重新刷新，如果当前浏览器不支持 history，那么当 forceRefresh 设置为 true 的时候，此时每次去改变 url 都会重新刷新整个页面
- keyLength: number 表示 location 的 key 属性的长度，在 react-router 中每个 url 下都有为一个 location 与其对应，并且每一个 url 的 location 的 key 值都不相同，这个属性一般都使用默认值，设置的意义不大。
- children: node children 的属性必须是一个 ReactNode 节点，表示唯一渲染一个元素。

`HashRouter`这里就不细说了。只是一些模块上的不同，其他基本一样。