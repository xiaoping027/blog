# Redux-createStore

## createStore

`createStore(reducer, [preloadedState], enhancer)`

- reducer (Function): 接收两个参数，分别是当前的 state 树和要处理的 action，返回新的 state 树
- preloadedState] (any): 初始时的 state。 在同构应用中，你可以决定是否把服务端传来的 state 水合（hydrate）后传给它，或者从之前保存的用户会话中恢复一个传给它。如果你使用 combineReducers 创建 reducer，它必须是一个普通对象，与传入的 keys 保持同样的结构。否则，你可以自由传入任何 reducer 可理解的内容。
- enhancer (Function): Store enhancer 是一个组合 store creator 的高阶函数，返回一个新的强化过的 store creator。这与 middleware 相似，它也允许你通过复合函数改变 store 接口

返回值

(Store): 保存了应用所有 state 的对象。改变 state 的惟一方法是 dispatch action。你也可以 subscribe 监听 state 的变化，然后更新 UIs

```js
return {
  dispatch,
  subscribe,
  getState,
  replaceReducer,
  [$$observable]: observable
};
```

```js
import { createStore } from "redux";

function todos(state = [], action) {
  switch (action.type) {
    case "ADD_TODO":
      return state.concat([action.text]);
    default:
      return state;
  }
}

let store = createStore(todos, ["Use Redux"]);

store.dispatch({
  type: "ADD_TODO",
  text: "Read the docs"
});

console.log(store.getState());
// [ 'Use Redux', 'Read the docs' ]
```

> <https://cn.redux.js.org/docs/api/createStore.html>

## 源码

```js
export default function createStore(reducer, preloadedState, enhancer) {
  // 检查你的state和enhance参数
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  // 如果有传入合法的enhance，则通过enhancer再调用一次createStore
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  //参数检验
  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }

  let currentReducer = reducer;
  let currentState = preloadedState;
  let currentListeners = [];
  let nextListeners = currentListeners;

  let isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
      //slice() 方法返回一个新的数组
    }
  }

  // 这个函数实质的作用是确保可以改变nextListeners,
  // 如果nextListeners与currentListeners一致的话，
  // 将currentListeners做一个拷贝赋值给nextListeners,
  //  https://github.com/MrErHu/blog/issues/18

  function getState() {
    //返回当前的state
    return currentState;
  }
  // subscribe用来订阅store变化的函数。
  // 首先判断传入的listener是否是函数。
  // 然后又调用了ensureCanMutateNextListeners,
  // 同时返回一个取消事件注册的方法。
  // 当调用store.dispatch的时候调用listener
  function subscribe(listener) {
    let isSubscribed = true;

    ensureCanMutateNextListeners();

    nextListeners.push(listener);

    // isSubscribed是以闭包的形式判断当前监听者函数是否在监听，
    // 从而保证只有第一次调用unsubscribe才是有效的
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      const index = nextListeners.indexOf(listener);
      // 从nextListeners中去除掉当前listener
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  // dispatch方法接收的action是个对象，而不是方法。
  // 这个对象实际上就是我们自定义action的返回值，
  // 因为dispatch的时候，
  // 已经调用过我们的自定义action了，
  // 比如 dispatch(addTodo())

  function dispatch(action) {
    if (!isPlainObject(action)) {
      // 判断是不是对象
    }
    // action中是否存在type/
    if (typeof action.type === "undefined") {
      throw new Error(
        'Actions may not have an undefined "type" property. ' +
          "Have you misspelled a constant?"
      );
    }

    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    // 然后判断isDispatching是否为true，
    // 主要是预防的是在reducer中做dispatch操作，
    // 如果在reduder中做了dispatch,
    // 而dispatch又必然会导致reducer的调用，
    // 就会造成死循环。

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    const listeners = (currentListeners = nextListeners);
    // 首先可以在任何时间点添加listener。
    // 无论是dispatchaction时，还是state值正在发生改变的时候。
    // 但是需要注意的，在每一次调用dispatch之前，
    // 订阅者仅仅只是一份快照(snapshot),
    // 如果是在listeners被调用期间发生订阅(subscribe)或者解除订阅(unsubscribe),
    // 在本次通知中并不会立即生效，而是在下次中生效。
    //

    for (let i = 0; i < listeners.length; i++) {
      const listener = listeners[i];
      listener();
      // 遍历调用各个linster
    }

    return action;
  }

  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }

    currentReducer = nextReducer;

    dispatch({ type: ActionTypes.REPLACE });
  }
  //注册listener，同时返回一个取消事件注册的方法。
  // 当调用store.dispatch的时候调用listener
  function observable() {
    const outerSubscribe = subscribe;
    return {
      subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.");
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        const unsubscribe = outerSubscribe(observeState);
        return { unsubscribe };
      },

      [$$observable]() {
        return this;
      }
    };
  }

  // 当create store的时候，
  //  reducer会接受一个type为ActionTypes.INIT的action，
  //  使reducer返回他们默认的state，这样可以快速的形成默认的state的结构

  dispatch({ type: ActionTypes.INIT });

  return {
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
  };
}
```
