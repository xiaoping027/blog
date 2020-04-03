# JavaScript-浏览器 Storge

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
field.addEventListener("change", function() {
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
