# React-Redux Provider

`react-redux` 库提供 `Provider` 组件将 `store` 注入整个 `React` 应用的某个入口组件，通常是应用的顶层组件。`Provider` 组件使用 `context` 向下传递 `store`：

## 用法

```js
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="foo" component={Foo} />
        <Route path="bar" component={Bar} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById("root")
);
```

## Provider

整个 `Provider`,现在都是`react-16`提供的 `hook`的写法了。

```js
import React, { useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { ReactReduxContext } from "./Context";
import Subscription from "../utils/Subscription";

function Provider({ store, context, children }) {
  const contextValue = useMemo(() => {
    const subscription = new Subscription(store);
    //订阅
    subscription.onStateChange = subscription.notifyNestedSubs;
    return {
      store,
      subscription
    };
  }, [store]);
  // 性能优化
  const previousState = useMemo(() => store.getState(), [store]);

  // useEffect 用法
  useEffect(() => {
    const { subscription } = contextValue;
    subscription.trySubscribe();

    if (previousState !== store.getState()) {
      subscription.notifyNestedSubs();
    }
    return () => {
      subscription.tryUnsubscribe();
      subscription.onStateChange = null;
    };
  }, [contextValue, previousState]);

  const Context = context || ReactReduxContext; //React.createContext
  // 每个组件都可以获取到 props.children。它包含组件的开始标签和结束标签之间的内容。
  // 生产消费设计模式
  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

Provider.propTypes = {
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }),
  context: PropTypes.object,
  children: PropTypes.any
};

export default Provider;
```
