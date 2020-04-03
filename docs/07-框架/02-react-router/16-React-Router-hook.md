# React-Router hook

## 源码

```js
const useContext = React.useContext;

export function useHistory() {
  return useContext(Context).history;
}

export function useLocation() {
  return useContext(Context).location;
}

export function useParams() {
  const match = useContext(Context).match;
  return match ? match.params : {};
}

export function useRouteMatch(path) {
  const location = useLocation();
  const match = useContext(Context).match;

  return path ? matchPath(location.pathname, path) : match;
}
```

## hook

具体的使用看`hook`文档，这边没什么难点。

> <https://zh-hans.reactjs.org/docs/hooks-reference.html>
