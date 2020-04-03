# XMLHttpRequest 使用

`XMLHttpRequest（XHR）`对象可以与服务器交互。可以从 `URL` 获取数据，而无需让整个的页面刷新。

这允许网页在不影响用户的操作的情况下更新页面的局部内容。在 `AJAX` 编程中，`XMLHttpRequest` 被大量使用。

```js
var xhr = new XMLHttpRequest();
xhr.timeout = 3000;
xhr.ontimeout = function(event) {
  alert("请求超时！");
};
var formData = new FormData();
formData.append("tel", "18217767969");
formData.append("psw", "111111");
xhr.open("POST", "http://www.test.com:8000/login");
xhr.send(formData);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4 && xhr.status == 200) {
    alert(xhr.responseText);
  } else {
    alert(xhr.statusText);
  }
};
```

- xhr.readyState：XMLHttpRequest 对象的状态，等于 4 表示数据已经接收完毕。
- xhr.status：服务器返回的状态码，等于 200 表示一切正常。
- xhr.responseText：服务器返回的文本数据
- xhr.responseXML：服务器返回的 XML 格式的数据
- xhr.statusText：服务器返回的状态文本。

## XMLHttpRequestEventTarget

`XMLHttpRequestEventTarget` 是一个描述事件处理程序的接口，可以在一个用于处理 `XMLHttpRequest` 事件的对象中使用到该事件处理程序。

### onabort

```js
XMLHttpRequest.onabort = callback;
```

```js
var xmlhttp = new XMLHttpRequest(),
  method = "GET",
  url = "https://developer.mozilla.org/";

xmlhttp.open(method, url, true);
xmlhttp.onabort = function() {
  console.log("** 请求被中止");
};
xmlhttp.send();
//..
xmlhttp.abort(); // 这将会调用我们上面定义的 onabort 回调函数
```

### onerror

`XMLHttpRequest` 事务由于错误而失败时调用的函数

```js
XMLHttpRequest.onerror = callback;
```

```js
var xmlhttp = new XMLHttpRequest(),
  method = "GET",
  url = "https://developer.mozilla.org/";

xmlhttp.open(method, url, true);
xmlhttp.onerror = function() {
  console.log("** An error occurred during the transaction");
};
xmlhttp.send();
```

### onload

`XMLHttpRequest` 请求成功完成时调用的函数。

```js
XMLHttpRequest.onload = callback;
```

```js
var xmlhttp = new XMLHttpRequest(),
  method = "GET",
  url = "https://developer.mozilla.org/";

xmlhttp.open(method, url, true);
xmlhttp.onload = function() {
  // 处理取回的数据(在 xmlhttp.response 中找到)
};
xmlhttp.send();
```

### onloadstart

在 `XMLHttpRequest` 开始传送数据时被调用

```js
var xmlhttp = new XMLHttpRequest(),
  method = "GET",
  url = "https://developer.mozilla.org/";

xmlhttp.open(method, url, true);
xmlhttp.onloadstart = function() {
  console.log("Download underway");
};
xmlhttp.send();
```

### onprogress

`XMLHttpRequest` 完成之前周期性调用的函数

- event.loaded 已传输的数据量
- event.total 总共的数据量

```js
XMLHttpRequest.onprogress = function(event) {
  event.loaded;
  event.total;
};
```

## timeout

一个无符号长整型数，代表着一个请求在被自动终止前所消耗的毫秒数。默认值为 `0`，意味着没有超时。超时并不应该用在一个 `document environment` 中的同步 `XMLHttpRequests` 请求中，否则将会抛出一个 `InvalidAccessError` 类型的错误。当超时发生， `timeout` 事件将会被触发。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "/server", true);

xhr.timeout = 2000; // 超时时间，单位是毫秒

xhr.onload = function() {
  // 请求完成。在此进行处理。
};

xhr.ontimeout = function(e) {
  // XMLHttpRequest 超时。在此做某事。
};

xhr.send(null);
```

## upload

返回一个 `XMLHttpRequestUpload` 对象，用来表示上传的进度。这个对象是不透明的，但是作为一个 `XMLHttpRequestEventTarget`，可以通过对其绑定事件来追踪它的进度。

可以被绑定在 `upload` 对象上的事件监听器如下：

- onloadstart 获取开始
- onprogress 数据传输进行中
- onabort 获取操作终止
- onerror 获取失败
- onload 获取成功
- ontimeout 获取操作在用户规定的时间内未完成
- onloadend 获取完成（不论成功与否）

## withCredentials

一个 `Boolean` 类型，它指示了是否该使用类似 `cookies,authorization headers`(头部授权)或者 `TLS` 客户端证书这一类资格证书来创建一个跨站点访问控制（`cross-site Access-Control`）请求。在同一个站点下使用 `withCredentials` 属性是无效的。

此外，这个指示也会被用做响应中 `cookies` 被忽视的标示。默认值是 `false`。

```js
var xhr = new XMLHttpRequest();
xhr.open("GET", "http://example.com/", true);
xhr.withCredentials = true;
xhr.send(null);
```

## open

初始化一个请求。该方法要从 `JavaScript` 代码使用；从原生代码初始化一个请求，使用 `openRequest()`替代。

```js
xhrReq.open(method, url);
xhrReq.open(method, url, async);
xhrReq.open(method, url, async, user);
xhrReq.open(method, url, async, user, password);
```

- async
  一个可选的布尔参数，默认为 true，表示要不要异步执行操作。如果值为 false，send()方法直到收到答复前不会返回。如果 true，已完成事务的通知可供事件监听器使用。如果 multipart 属性为 true 则这个必须为 true，否则将引发异常。

## send

```JS
XMLHttpRequest.send();
XMLHttpRequest.send(ArrayBuffer data);
XMLHttpRequest.send(ArrayBufferView data);
XMLHttpRequest.send(Blob data);
XMLHttpRequest.send(Document data);
XMLHttpRequest.send(DOMString? data);
XMLHttpRequest.send(FormData data);
```

## setRequestHeader

设置 `HTTP` 请求头部的方法。此方法必须在 `open()` 方法和 `send()` 之间调用。如果多次对同一个请求头赋值，只会生成一个合并了多个值的请求头。
