# Redux-bindActionCreators

把 `action creators` 转成拥有同名 `keys` 的对象，但使用 `dispatch` 把每个 `action creator` 包围起来，这样可以直接调用它们

惟一使用 `bindActionCreators` 的场景是当你需要把 `action creator` 往下传到一个组件上，却不想让这个组件觉察到 `Redux` 的存在，而且不希望把 `Redux store` 或 `dispatch` 传给它

## 用法

> <https://www.redux.org.cn/docs/api/bindActionCreators.html>

```js
// TodoActionCreators.jss

export function addTodo(text) {
  return {
    type: "ADD_TODO",
    text
  };
}

export function removeTodo(id) {
  return {
    type: "REMOVE_TODO",
    id
  };
}
```

```js
// SomeComponent.js
import { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as TodoActionCreators from "./TodoActionCreators";
console.log(TodoActionCreators);
// {
//   addTodo: Function,
//   removeTodo: Function
// }

class TodoListContainer extends Component {
  componentDidMount() {
    // 由 react-redux 注入：
    let { dispatch } = this.props;

    // 注意：这样做行不通：
    // TodoActionCreators.addTodo('Use Redux');

    // 你只是调用了创建 action 的方法。
    // 你必须要 dispatch action 而已。

    // 这样做行得通：
    let action = TodoActionCreators.addTodo("Use Redux");
    dispatch(action);
  }

  render() {
    // 由 react-redux 注入：
    let { todos, dispatch } = this.props;

    // 这是应用 bindActionCreators 比较好的场景：
    // 在子组件里，可以完全不知道 Redux 的存在。

    let boundActionCreators = bindActionCreators(TodoActionCreators, dispatch);
    console.log(boundActionCreators);
    // {
    //   addTodo: Function,
    //   removeTodo: Function
    // }

    return <TodoList todos={todos} {...boundActionCreators} />;

    // 一种可以替换 bindActionCreators 的做法是直接把 dispatch 函数
    // 和 action creators 当作 props
    // 传递给子组件
    // return <TodoList todos={todos} dispatch={dispatch} />;
  }
}

export default connect(TodoListContainer, state => ({ todos: state.todos }));
```

## bindActionCreators

```js
function bindActionCreator(actionCreator, dispatch) {
  return function() {
    return dispatch(actionCreator.apply(this, arguments));
  };
}

export default function bindActionCreators(actionCreators, dispatch) {
  // bindActionCreators期待一个Object作为actionCreators传入，里面是 key: action

  // 如果只是传入一个action，则通过bindActionCreator返回被绑定到dispatch的函数
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error(
      `bindActionCreators expected an object or a function, instead received ${
        actionCreators === null ? "null" : typeof actionCreators
      }. ` +
        `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
    );
  }

  const boundActionCreators = {};
  // 遍历并通过bindActionCreator分发绑定至dispatch
  for (const key in actionCreators) {
    const actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
```
