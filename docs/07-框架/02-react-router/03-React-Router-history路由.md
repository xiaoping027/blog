# React-Router-history路由实现

相比 `hash` 路由，`h5` 路由不再需要有些丑陋去的去修改 `window.location` 了，取而代之使用 `history.pushState` 来完成对 `window.location` 的操作，使用 `window.addEventListener('popstate', callback)` 来对前进/后退进行监听，至于后退则可以直接使用 `window.history.back()` 或者  `window.history.go(-1)` 来直接实现，由于浏览器的 history 控制了前进/后退的逻辑，所以实现简单了很多。

```js
class Routers {
  constructor() {
    this.routes = {};
    // 在初始化时监听popstate事件
    this._bindPopState();
  }
  // 初始化路由
  init(path) {
    history.replaceState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 将路径和对应回调函数加入hashMap储存
  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  // 触发路由对应回调
  go(path) {
    history.pushState({path: path}, null, path);
    this.routes[path] && this.routes[path]();
  }
  // 后退
  backOff(){
    history.back()
  }
  // 监听popstate事件
  _bindPopState() {
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path;
      this.routes[path] && this.routes[path]();
    });
  }
}

```

> <https://juejin.im/post/5b45c878f265da0f783c89a6>
>
> <https://github.com/youngwind/blog/issues/109>