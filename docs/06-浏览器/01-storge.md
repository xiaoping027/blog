# 浏览器存储学习

`cookie sessionStorage localStorage`

- 共同点：都是保存在浏览器端，且同源的。
- 区别：cookie 数据始终在同源的 http 请求中携带，即 cookie 在浏览器和服务器间来回传递。而 `sessionStorage` 和 `localStorage` 不会自动把数据发给服务器，仅在本地保存。cookie 数据不能超过 `4k`(适合保存小数据)。
- `sessionStorage` 和 `localStorage` 容量较大，数据有效期不同，`sessionStorage`：仅在当前浏览器窗口关闭前有效。`localStorage`：始终有效，窗口或浏览器关闭也一直保存，需手动清除；

- `cookie` 只在设置的 `cookie` 过期时间之前一直有效，即使窗口或浏览器关闭。作用域不同。
- `sessionStorage` 不在不同的浏览器窗口中共享
- `localStorage` 在所有同源窗口中都是共享的；`cookie` 也是在所有同源窗口中都是共享的。

应用场景：

- `localStorage：常用于长期登录（`+判断用户是否已登录），适合长期保存在本地的数据
- `sessionStorage` ：敏感账号一次性登录
- `cookies` 与服务器交互。

## cookie

- 会话状态管理（如用户登录状态、购物车、游戏分数或其它需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

`SameSite Cookie` 允许服务器要求某个 `cookie` 在跨站请求时不会被发送，从而可以阻止跨站请求伪造攻击`CSRF`.

`HttpOnly` 是包含在 `Set-Cookie HTTP` 响应头文件中的附加标志。生成 `cookie` 时使用 `HttpOnly` 标志有助于降低客户端脚本访问受保护 `cookie` 的风险（如果浏览器支持）。

如果某一个 `Cookie` 选项被设置成 HttpOnly = true 的话，那此 `Cookie` `只能通过服务器端修改，Js` 是操作不了的，对于 `document.cookie` 来说是透明的

## sessionStorage

`sessionStorage` 属性允许你访问一个 `session Storage` 对象。它与 `localStorage` 相似，不同之处在于 `localStorage` 里面存储的数据没有过期时间设置，而存储在 `sessionStorage` 里面的数据在页面会话结束时会被清除。页面会话在浏览器打开期间一直保持，并且重新加载或恢复页面仍会保持原来的页面会话。在新标签或窗口打开一个页面时会在顶级浏览上下文中初始化一个新的会话，这点和 `session cookies` 的运行方式不同

### 语法

```js
// 保存数据到sessionStorage
sessionStorage.setItem("key", "value");

// 从sessionStorage获取数据
var data = sessionStorage.getItem("key");

// 从sessionStorage删除保存的数据
sessionStorage.removeItem("key");

// 从sessionStorage删除所有保存的数据
sessionStorage.clear();
```

### 例子

```js
// 获取文本输入框
var field = document.getElementById("field");

// 检测是否存在 autosave 键值
// (这个会在页面偶然被刷新的情况下存在)
if (sessionStorage.getItem("autosave")) {
  // 恢复文本输入框的内容
  field.value = sessionStorage.getItem("autosave");
}

// 监听文本输入框的 change 事件
field.addEventListener("change", function () {
  // 保存结果到 sessionStorage 对象中
  sessionStorage.setItem("autosave", field.value);
});
```

## localStorage 的使用

只读的 localStorage 允许你访问一个 Document 的远端（origin）对象 Storage；数据存储为跨浏览器会话。 localStorage 类似于 sessionStorage。区别在于，数据存储在 localStorage 是无期限的，而当页面会话结束——也就是说当页面被关闭时,数据存储在 sessionStorage 会被清除

### 语法

```js
//设定
localStorage.setItem("myCat", "Tom");
//读取
let cat = localStorage.getItem("myCat");
//移除
localStorage.removeItem("myCat");
// 移除所有
localStorage.clear();
```

### 例子

```js
function setStyles() {
  var currentColor = localStorage.getItem("bgcolor");
  var currentFont = localStorage.getItem("font");
  var currentImage = localStorage.getItem("image");

  document.getElementById("bgcolor").value = currentColor;
  document.getElementById("font").value = currentFont;
  document.getElementById("image").value = currentImage;

  htmlElem.style.backgroundColor = "#" + currentColor;
  pElem.style.fontFamily = currentFont;
  imgElem.setAttribute("src", currentImage);
}
```
