# Redux-combineReducers

合并`reducer`对象

```js
export default function combineReducers(reducers) {
  // 参数reducers为Object
  // Object.keys return Array[]
  const reducerKeys = Object.keys(reducers);
  const finalReducers = {};
  // 遍历
  for (let i = 0; i < reducerKeys.length; i++) {
    const key = reducerKeys[i];

    if (process.env.NODE_ENV !== "production") {
      if (typeof reducers[key] === "undefined") {
        warning(`No reducer provided for key "${key}"`);
      }
    }
    // 把非function的reducer过滤掉;
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  const finalReducerKeys = Object.keys(finalReducers);

  // 二次筛选，判断reducer中传入的值是否合法（!== undefined）
  // 获取筛选完之后的所有key

  let unexpectedKeyCache;
  if (process.env.NODE_ENV !== "production") {
    unexpectedKeyCache = {};
  }

  let shapeAssertionError;
  try {
    // assertReducerSanity函数用于遍历finalReducers中的reducer，检查传入reducer的state是否合法
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  //  返回一个function。该方法接收state和action作为参数
  return function combination(state = {}, action) {
    if (shapeAssertionError) {
      // 如果之前的判断reducers中有不法值，则抛出错误
      throw shapeAssertionError;
    }

    let hasChanged = false;
    const nextState = {};
    // 遍历所有的key和reducer，分别将reducer对应的key所代表的state，代入到reducer中进行函数调用
    for (let i = 0; i < finalReducerKeys.length; i++) {
      const key = finalReducerKeys[i];
      const reducer = finalReducers[key];
      // 这也就是为什么说combineReducers黑魔法--要求传入的Object参数中，reducer function的名称和要和state同名的原因
      const previousStateForKey = state[key];

      const nextStateForKey = reducer(previousStateForKey, action);

      // 如果reducer返回undefined则抛出错误
      if (typeof nextStateForKey === "undefined") {
        const errorMessage = getUndefinedStateErrorMessage(key, action);
        throw new Error(errorMessage);
      }
      // 将reducer返回的值填入nextState
      nextState[key] = nextStateForKey;
      // 如果任一state有更新则hasChanged为true
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged =
      hasChanged || finalReducerKeys.length !== Object.keys(state).length;

    // 如果整个循环都没有被更新过，返回state

    return hasChanged ? nextState : state;
  };
}
```

> <https://www.redux.org.cn/docs/recipes/reducers/UsingCombineReducers.html>
>
> <https://zhuanlan.zhihu.com/p/57409149>
