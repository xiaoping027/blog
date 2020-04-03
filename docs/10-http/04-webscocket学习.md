# webSocket

webSocket 是一项可以让服务器将数据主动推送给客户端的技术。WebSocket 是一种通信协议，可在单个 TCP 连接上进行全双工通信。WebSocket 使得客户端和服务器之间的数据交换变得更加简单，允许服务端主动向客户端推送数据。在 WebSocket API 中，浏览器和服务器只需要完成一次握手，两者之间就可以建立持久性的连接，并进行双向数据传输。

- 握手阶段采用 HTTP 协议。
- 数据格式轻量，性能开销小。客户端与服务端进行数据交换时，服务端到客户端的数据包头只有 2 到 10 字节，客户端到服务端需要加上另外 4 字节的掩码。HTTP 每次都需要携带完整头部。
- 更好的二进制支持，可以发送文本，和二进制数据
- 没有同源限制，客户端可以与任意服务器通信
- 协议标识符是 ws（如果加密，则是 wss），请求的地址就是后端支持 websocket 的 API。

## 状态

| 名称                 | 值  |
| -------------------- | --- |
| WebSocket.CONNECTING | 0   |
| WebSocket.OPEN       | 1   |
| WebSocket.CLOSING    | 2   |
| WebSocket.CLOSED     | 3   |

可通过 WebSocket.readyState 对照上述常量判断 WebSocket 连接 当前所处的状态

## WebSocket API

客户端若想要与支持 webScoket 的服务器通信，可以使用 WebSocket 构造函数返回 WebSocket 对象。

```js
const ws = new WebSocket("ws://localhost:3000/websocket");
```

| 名称                     | 解释                         |
| ------------------------ | ---------------------------- |
| WebSocket.onopen         | 连接成功后的回调             |
| WebSocket.onclose        | 连接关闭后的回调             |
| WebSocket.onerror        | 连接失败后的回调             |
| WebSocket.onmessage      | 客户端接收到服务端数据的回调 |
| webSocket.bufferedAmount | 未发送至服务器的二进制字节数 |
| WebSocket.binaryType     | 使用二进制的数据类型连接     |
| WebSocket.protocol       | 服务器选择的下属协议         |
| WebSocket.url            | WebSocket 的绝对路径         |
| WebSocket.readyState     | 当前连接状态，对应的四个常量 |

## 例子

```html
<body>
  <div class="websocket">
    <div class="receive">
      <p>服务端返回的消息</p>
      <div id="receive-box"></div>
    </div>
    <div class="send">
      <textarea type="text" id="msg-need-send"></textarea>
      <p>
        <button id="send-btn">点击发消息给服务端</button>
      </p>
    </div>
    <button id="exit">关闭连接</button>
  </div>
</body>
```

```js
const msgBox = document.getElementById("msg-need-send");
const sendBtn = document.getElementById("send-btn");
const exit = document.getElementById("exit");
const receiveBox = document.getElementById("receive-box");

// 创建一个webSocket对象
const ws = new WebSocket("ws://127.0.0.1:3000/websocket/test");
ws.onopen = e => {
  // 连接后监听
  console.log(`WebSocket 连接状态： ${ws.readyState}`);
};

ws.onmessage = data => {
  // 当服务端返回数据的时候，放到页面里
  receiveBox.innerHTML += `<p>${data.data}</p>`;
  receiveBox.scrollTo({
    top: receiveBox.scrollHeight,
    behavior: "smooth"
  });
};

ws.onclose = data => {
  // 监听连接关闭
  console.log("WebSocket连接已关闭");
  console.log(data);
};

sendBtn.onclick = () => {
  // 点击发送按钮。将数据发送给服务端
  ws.send(msgBox.value);
};
exit.onclick = () => {
  // 客户端主动关闭连接
  ws.close();
};
```

```js
const express = require("express");
const expressWs = require("express-ws");
const router = express.Router();
expressWs(router);

router.ws("/test", (ws, req) => {
  ws.send("连接成功");
  let interval;
  // 连接成功后使用定时器定时向客户端发送数据，同时要注意定时器执行的时机，要在连接开启状态下才可以发送数据
  interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(Math.random().toFixed(2));
    } else {
      clearInterval(interval);
    }
  }, 1000);
  // 监听客户端发来的数据，直接将信息原封不动返回回去
  ws.on("message", msg => {
    ws.send(msg);
  });
});

module.exports = router;
```
