# React-Router-history 源码三

## createTransitionManager

```js
function createTransitionManager() {
  let prompt = null;

  // 设置提示
  function setPrompt(nextPrompt) {
    prompt = nextPrompt;

    return () => {
      if (prompt === nextPrompt) prompt = null;
    };
  }

  /**
   * 实现提示
   * @param location：地址
   * @param action：行为
   * @param getUserConfirmation 设置弹框
   * @param callback 回调函数：block函数的返回值作为参数
   */
  function confirmTransitionTo(
    location,
    action,
    getUserConfirmation,
    callback
  ) {
    if (prompt != null) {
      const result =
        typeof prompt === "function" ? prompt(location, action) : prompt;

      if (typeof result === "string") {
        if (typeof getUserConfirmation === "function") {
          getUserConfirmation(result, callback);
        } else {
          callback(true);
        }
      } else {
        callback(result !== false);
      }
    } else {
      callback(true);
    }
  }

  let listeners = [];
  // 设置监听函数
  function appendListener(fn) {
    let isActive = true;

    function listener(...args) {
      if (isActive) fn(...args);
    }

    // 把所有的监听函数存储在listeners数组中；
    listeners.push(listener);
    // 解除
    return () => {
      isActive = false;
      listeners = listeners.filter(item => item !== listener);
    };
  }
  // 执行监听函数
  function notifyListeners(...args) {
    listeners.forEach(listener => listener(...args));
  }

  return {
    setPrompt,
    confirmTransitionTo,
    appendListener,
    notifyListeners
  };
}

export default createTransitionManager;
```

- 设置提示 setPrompt：把用户设置的提示信息函数存储在 prompt 变量；
- 实现提示 confirmTransitionTo：
  - 得到提示信息：执行 prompt 变量；
  - 提示信息后的回调：执行 callback 把提示信息作为结果返回出去。

## listen

```js
function listen(listener) {
  const unlisten = transitionManager.appendListener(listener);
  checkDOMListeners(1);

  return () => {
    checkDOMListeners(-1);
    unlisten();
  };
}
```

- 添加监听函数到队列里

### checkDOMListeners

检查 DOM 的监听函数：全局只能有一个监听历史记录条目的函数

```js
let listenerCount = 0;

//检查DOM的监听函数
function checkDOMListeners(delta) {
  listenerCount += delta;

  // 是否已经添加

  if (listenerCount === 1 && delta === 1) {
    // 添加绑定，当历史记录条目改变的时候
    window.addEventListener(PopStateEvent, handlePopState);

    if (needsHashChangeListener)
      //浏览器兼容性处理;
      // 如果浏览器在哈希更改时触发popstate，则返回true。
      // IE10和IE11没有。
      window.addEventListener(HashChangeEvent, handleHashChange);
  } else if (listenerCount === 0) {
    //  解除绑定
    window.removeEventListener(PopStateEvent, handlePopState);

    if (needsHashChangeListener)
      //浏览器兼容性处理;
      window.removeEventListener(HashChangeEvent, handleHashChange);
  }
}

function handlePopState(event) {
  // 忽略WebKit中无关的popstate事件。
  if (isExtraneousPopstateEvent(event)) return;
  handlePop(getDOMLocation(event.state));
}

function handleHashChange() {
  handlePop(getDOMLocation(getHistoryState()));
}
```

- handlePopState：必须把监听函数提取出来，不然不能解绑；
- handlePop：监听历史记录条目的核心函数，监听成功后执行 setState

## block

当历史记录条目改变时，触发提示信息

```js
let isBlocked = false;

function block(prompt = false) {
  const unblock = transitionManager.setPrompt(prompt); //设置提示
  //是否设置了block
  if (!isBlocked) {
    checkDOMListeners(1);
    isBlocked = true;
  }
  // 解除block函数
  return () => {
    if (isBlocked) {
      isBlocked = false;
      checkDOMListeners(-1);
    }

    return unblock(); //释放
  };
}
```

> <https://juejin.im/post/5c049f23e51d455b5a4368bd>
