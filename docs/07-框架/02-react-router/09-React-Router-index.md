# React-Router index

- react-router 负责通用的路由逻辑
- react-router-dom 负责浏览器的路由管理
- react-router-native 负责 react-native 的路由管理
- react-router-config 静态路由配置帮助

只需引入`react-router-dom` 或 `react-router-native` 即可，`react-router` 作为依赖存在不再需要单独引入。

版本是`5.1.2`

```js
export { default as MemoryRouter } from "./MemoryRouter.js"; //试用无浏览器环境
export { default as Prompt } from "./Prompt.js"; //用于在离开页面之前提示用户 例如，表单已被一半填写
export { default as Redirect } from "./Redirect.js"; //重定向 导航到新的页面
export { default as Route } from "./Route.js"; //路由组件 基本的职责是在path与当前URL匹配时呈现一些UI
export { default as Router } from "./Router.js"; //所有路由器组件的通用底层接口
export { default as StaticRouter } from "./StaticRouter.js"; //静态路由
export { default as Switch } from "./Switch.js"; //跳转
export { default as generatePath } from "./generatePath.js"; //该generatePath功能可用于生成路线的URL 内部使用该path-to-regexp库
export { default as matchPath } from "./matchPath.js";
export { default as withRouter } from "./withRouter.js"; //在要注入属性的组件上使用'@withRouter' 高阶组件，可获取history

import { useHistory, useLocation, useParams, useRouteMatch } from "./hooks.js"; //钩子函数。react>16.8
export { useHistory, useLocation, useParams, useRouteMatch }; //获取 Location History Params RouteMatch 数据

export { default as __RouterContext } from "./RouterContext.js"; //Context 提供了一个无需为每层组件手动添加 props，就能在组件树间进行数据传递的方法
```

## react-router-dom

```js

// 这边import react-router 模块
// 。。。

export { default as BrowserRouter } from "./BrowserRouter.js";
export { default as HashRouter } from "./HashRouter.js";
export { default as Link } from "./Link.js";
export { default as NavLink } from "./NavLink.js";

```