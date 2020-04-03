# React-Router-路由介绍

`React Router` 保持 `UI` 与 `URL` 同步。它拥有简单的 `API` 与强大的功能例如代码缓冲加载、动态路由匹配、以及建立正确的位置过渡处理。你第一个念头想到的应该是 `URL`，而不是事后再想起。

`React Router` 动态路由

`github`地址 <https://github.com/ReactTraining/react-router>

## 静态路由

```js
// Express Style routing:
app.get("/", handleIndex);
app.get("/invoices", handleInvoices);
app.get("/invoices/:id", handleInvoice);
app.get("/invoices/:id/edit", handleInvoiceEdit);

app.listen();


// Angular Style routing:
// 在Angular中，先声明路由，然后AppModule在渲染之前将其导入顶层：
const appRoutes: Routes = [
  {
    path: "crisis-center",
    component: CrisisListComponent
  },
  {
    path: "hero/:id",
    component: HeroDetailComponent
  },
  {
    path: "heroes",
    component: HeroListComponent,
    data: { title: "Heroes List" }
  },
  {
    path: "",
    redirectTo: "/heroes",
    pathMatch: "full"
  },
  {
    path: "**",
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)]
})
export class AppModule {}

```

## 动态路由

当我们说动态路由时，是指在您的应用渲染时发生的路由，而不是在运行的应用之外的配置或约定中进行。这意味着几乎所有内容都是`React Router`中的一个组件

```js
// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  el
);


// 接下来，获取链接组件以链接到新位置：

const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  </div>
);


// 最后，渲染一个Route以在用户访问时显示一些UI /dashboard。

const App = () => (
  <div>
    <nav>
      <Link to="/dashboard">Dashboard</Link>
    </nav>
    <div>
      <Route path="/dashboard" component={Dashboard} />
    </div>
  </div>
);

```

该`Route`将使`<Dashboard {...props}/>`其中`props`一些路由器具体的东西，看起来像`{ match, location, history }`。如果用户没有在`/dashboard`那么`Route`将呈现`null`。这几乎就是它的全部。

> <https://reacttraining.com/react-router/core/guides/philosophy>
>
> <https://react-guide.github.io/react-router-cn/docs/Introduction.html>