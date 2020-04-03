# React-Router-hash 路由

路由库最大的作用就是同步 `URL` 与其对应的回调函数。对于基于 `history` 的路由，它通过 `history.pushState` 来修改 `URL`，通过 `window.addEventListener('popstate', callback)` 来监听前进/后退事件；对于 `hash` 路由，通过操作 `window.location` 的字符串来更改 `hash`，通过 `window.addEventListener('hashchange', callback)` 来监听 `URL` 的变化。

`hash`路由一个明显的标志是带有`#`,主要是通过监听`url`中的`hash`变化来进行路由跳转。

`hash`的优势就是兼容性更好,在老版 IE 中都有运行,问题在于`url`中一直存在`#`不够美观,而且`hash`路由更像是`Hack`而非标准

```js
class Routers {
  constructor() {
    // 储存hash与callback键值对
    this.routes = {};
    // 当前hash
    this.currentUrl = "";
    // 记录出现过的hash
    this.history = [];
    // 作为指针,默认指向this.history的末尾,根据后退前进指向history中不同的hash
    this.currentIndex = this.history.length - 1;
    this.refresh = this.refresh.bind(this);
    this.backOff = this.backOff.bind(this);
    // 默认不是后退操作
    this.isBack = false;
    window.addEventListener("load", this.refresh, false);
    window.addEventListener("hashchange", this.refresh, false);
  }

  route(path, callback) {
    this.routes[path] = callback || function() {};
  }

  refresh() {
    this.currentUrl = location.hash.slice(1) || "/";
    if (!this.isBack) {
      // 如果不是后退操作,且当前指针小于数组总长度,直接截取指针之前的部分储存下来
      // 此操作来避免当点击后退按钮之后,再进行正常跳转,指针会停留在原地,而数组添加新hash路由
      // 避免再次造成指针的不匹配,我们直接截取指针之前的数组
      // 此操作同时与浏览器自带后退功能的行为保持一致
      if (this.currentIndex < this.history.length - 1)
        this.history = this.history.slice(0, this.currentIndex + 1);
      this.history.push(this.currentUrl);
      this.currentIndex++;
    }
    this.routes[this.currentUrl]();
    console.log("指针:", this.currentIndex, "history:", this.history);
    this.isBack = false;
  }
  // 后退功能
  backOff() {
    // 后退操作设置为true
    this.isBack = true;
    this.currentIndex <= 0
      ? (this.currentIndex = 0)
      : (this.currentIndex = this.currentIndex - 1);
    location.hash = `#${this.history[this.currentIndex]}`;
    this.routes[this.history[this.currentIndex]]();
  }
}

window.Router = new Routers();
const content = document.querySelector("body");
const button = document.querySelector("button");
function changeBgColor(color) {
  content.style.backgroundColor = color;
}

Router.route("/", function() {
  changeBgColor("yellow");
});
Router.route("/blue", function() {
  changeBgColor("blue");
});
Router.route("/green", function() {
  changeBgColor("green");
});

button.addEventListener("click", Router.backOff, false);
```

> <https://juejin.im/post/5b45c878f265da0f783c89a6>
>
> <https://github.com/fi3ework/blog/issues/21>
>
> <https://codepen.io/fi3ework/pen/ejOGOJ?editors=1111>
>
> <https://juejin.im/post/5ac61da66fb9a028c71eae1b#heading-4>
