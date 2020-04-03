# React-Router-history 源码二

## push

```js
function push(path, state) {
  const action = "PUSH";
  //`createLocation`根据传递进来的`path`或者`location`值，返回格式化好的`location`.
  const location = createLocation(path, state, createKey(), history.location);

  // 执行拦截函数，弹出框
  transitionManager.confirmTransitionTo(
    location,
    action,
    getUserConfirmation,
    ok => {
      // 毁掉函数不存在 直接return
      if (!ok) return;

      const href = createHref(location); //返回当前路径名

      const { key, state } = location;

      if (canUseHistory) {
        //浏览器兼容性检测
        // 添加历史条目
        globalHistory.pushState({ key, state }, null, href);

        if (forceRefresh) {
          //// 强制刷新
          window.location.href = href;
        } else {
          // 更新history
          const prevIndex = allKeys.indexOf(history.location.key);
          const nextKeys = allKeys.slice(0, prevIndex + 1);

          nextKeys.push(location.key);

          allKeys = nextKeys;
          // setState({ action, location })作用是根据当前地址信息（location）更新history
          setState({ action, location });
        }
      } else {
        window.location.href = href;
      }
    }
  );
}
```

### History.pushState()

- state：一个与添加的记录相关联的状态对象，主要用于 popstate 事件。该事件触发时，该对象会传入回调函数。也就是说，浏览器会将这个对象序列化以后保留在本地，重新载入这个页面的时候，可以拿到这个对象。如果不需要这个对象，此处可以填 null。
- title：新页面的标题。但是，现在所有浏览器都忽视这个参数，所以这里可以填空字符串。
- url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址。

`pushState()`方法不会触发页面刷新，只是导致 `History` 对象发生变化，地址栏会有反应。

使用该方法之后，就可以用 `History.state` 属性读出状态对象

### canUseHistory

浏览器兼容性检测

`const canUseHistory = supportsHistory()`

```js
export function supportsHistory() {
  const ua = window.navigator.userAgent;

  if (
    (ua.indexOf("Android 2.") !== -1 || ua.indexOf("Android 4.0") !== -1) &&
    ua.indexOf("Mobile Safari") !== -1 &&
    ua.indexOf("Chrome") === -1 &&
    ua.indexOf("Windows Phone") === -1
  )
    return false;

  return window.history && "pushState" in window.history;
}
```

### setState

`setState({ action, location })`作用是根据当前地址信息（`location`）更新 `history`

```js
function setState(nextState) {
  Object.assign(history, nextState);
  history.length = globalHistory.length;

  //通知到监听函数listen
  transitionManager.notifyListeners(history.location, history.action);
}
```

## replace

`replace`和`push`相比主要就是 `History.pushState`和`History.replaceState`， `window.location.replace`和`window.location.href` 的差异。其他几乎一支，这边就不再解析

`Location.replace()` 方法以给定的 `URL` 来替换当前的资源。 与 `assign()` 方法 不同的是，调用 `replace()` 方法后，当前页面不会保存到会话历史中（`session History`），这样，用户点击回退按钮时，将不会再跳转到该页面。

> <https://javascript.ruanyifeng.com/bom/history.html>
>
> <https://juejin.im/post/5c049f23e51d455b5a4368bd>
