# React-Router-history 源码一

## index

`modules/index.js`

```js
export { default as createBrowserHistory } from "./createBrowserHistory";
export { default as createHashHistory } from "./createHashHistory";
export { default as createMemoryHistory } from "./createMemoryHistory";
export { createLocation, locationsAreEqual } from "./LocationUtils";
export { parsePath, createPath } from "./PathUtils";
```

## createBrowserHistory

`createBrowserHistory` 这最后返回了一个`history`对象

```js
const history = {
  length: globalHistory.length,
  action: "POP",
  location: initialLocation,
  createHref,
  push,
  replace,
  go,
  goBack,
  goForward,
  block,
  listen
};

return history;
```

## globalHistory

基于`HTML5`的 `window.history`

```js

const globalHistory = window.history;
length: globalHistory.length,
// 返回一个整数，该整数表示会话历史中元素的数目，包括当前加载的页

```

## action

```js
type Action = "PUSH" | "REPLACE" | "POP";
```

`Action` 描述了 `URL` 变化的类型。有以下几种类型：

- PUSH — 表示有一个新条目加入了 history
- REPLACE — 表示 history 中的当前条目被修改
- POP — 表示有一个新的当前条目，例如“current pointer（当前指针）”被修改

## location

```js
type Location = {
  pathname: Pathname,
  search: QueryString,
  query: Query,
  state: LocationState,
  action: Action,
  key: LocationKey
};
```

`initialLocation`函数等于`getDOMLocation`函数的返回值（`getDOMLocation`在`history`中会经常调用，理解好这个函数比较重要）

一般大型的项目中都会把一个功能拆分成至少两个函数，一个专门处理参数的函数和一个接收处理参数实现功能的函数：

- 处理参数：getDOMLocation 函数主要处理 state 和 window.location 这两参数，返回自定义的 history.location 对象，主要构造 history.location 对象是 createLocation 函数；
- 构造功能：createLocation 实现具体构造 location 的逻辑。

```js
const initialLocation = getDOMLocation(getHistoryState());

function getDOMLocation(historyState) {
  const { key, state } = historyState || {};
  const { pathname, search, hash } = window.location;

  let path = pathname + search + hash;

  if (basename) path = stripBasename(path, basename);

  return createLocation(path, state, key);
}

function getHistoryState() {
  try {
    return window.history.state || {};
  } catch (e) {
    // IE 11 sometimes throws when accessing window.history.state
    // See https://github.com/ReactTraining/history/pull/289
    return {};
  }
}
```

当`URL`变化时，新的`locations`将会产生

### createLocation

`createLocation`根据传递进来的`path`或者`location`值，返回格式化好的`location`.

```js
export function createLocation(path, state, key, currentLocation) {
  let location;
  if (typeof path === "string") {
    // Two-arg form: push(path, state)
    location = parsePath(path);
    // parsePath函数用于拆解地址 例如：parsePath('www.aa.com/aa?b=bb') => {pathname: 'www.aa.com/aa', search: '?b=bb', hash: ''}
    location.state = state;
  } else {
    // One-arg form: push(location)
    location = { ...path };

    if (location.pathname === undefined) location.pathname = "";

    if (location.search) {
      if (location.search.charAt(0) !== "?")
        location.search = "?" + location.search;
    } else {
      location.search = "";
    }

    if (location.hash) {
      if (location.hash.charAt(0) !== "#") location.hash = "#" + location.hash;
    } else {
      location.hash = "";
    }

    if (state !== undefined && location.state === undefined)
      location.state = state;
  }

  try {
    location.pathname = decodeURI(location.pathname);
  } catch (e) {
    if (e instanceof URIError) {
      throw new URIError(
        'Pathname "' +
          location.pathname +
          '" could not be decoded. ' +
          "This is likely caused by an invalid percent-encoding."
      );
    } else {
      throw e;
    }
  }

  if (key) location.key = key;

  if (currentLocation) {
    // Resolve incomplete/relative pathname relative to current location.
    if (!location.pathname) {
      location.pathname = currentLocation.pathname;
    } else if (location.pathname.charAt(0) !== "/") {
      location.pathname = resolvePathname(
        location.pathname,
        currentLocation.pathname
      );
    }
  } else {
    // When there is no prior location and pathname is empty, set it to /
    if (!location.pathname) {
      location.pathname = "/";
    }
  }

  //   type Location = {
  //   pathname: Pathname,
  //   search: QueryString,
  //   query: Query,
  //   state: LocationState,
  //   action: Action,
  //   key: LocationKey
  // };

  return location;
}
```

## createHref

返回当前路径名

- path `type Path = Pathname + QueryString` path（路径） 代表 URL 的路径。
- Pathname `type Pathname = string` `pathname`（路径名） 是`URL`中用于描述分层路径的一部分，包括最前的 `/`。比如，在 `http://example.com/the/path?the=query` 这个`URL`中，`/the/path` 就是 `pathname`。它和浏览器中的 `window.location.pathname` 是同样的意思。
- QueryString `type QueryString = string` 它和浏览器中的 `window.loaction.search` 是同样的意思。

```js
function createHref(location) {
  return basename + createPath(location);
}

const basename = props.basename
  ? stripTrailingSlash(addLeadingSlash(props.basename))
  : "";

//addLeadingSlash PathUtils.js
export function addLeadingSlash(path) {
  return path.charAt(0) === "/" ? path : "/" + path;
}

export function stripTrailingSlash(path) {
  return path.charAt(path.length - 1) === "/" ? path.slice(0, -1) : path;
}

//  PathUtils.js
export function createPath(location) {
  const { pathname, search, hash } = location;

  let path = pathname || "/";

  if (search && search !== "?")
    path += search.charAt(0) === "?" ? search : `?${search}`;

  if (hash && hash !== "#") path += hash.charAt(0) === "#" ? hash : `#${hash}`;

  return path;
}
```

## go

- `goBack`
- `goForward`
- `go`

页面的跳转是基于`window.history`

```js
const globalHistory = window.history;

function go(n) {
  globalHistory.go(n);
}

function goBack() {
  go(-1);
}

function goForward() {
  go(1);
}
```

> <https://react-guide.github.io/react-router-cn/docs/Glossary.html#action>
>
> <https://juejin.im/post/5c049f23e51d455b5a4368bd>
> ·
