# React-受控与非受控组件

## 受控组件

- name 开始是空字符串''。
- 当键入 `a` ，并 `handleNameChange` 获取 a 和调用 setState。然后，该输入被重新呈现为具有的值 `a`。
- 当键入 `b`，`handleNameChange` 获取 `ab` 并设置该状态的值。现在再次重新渲染输入 `value="ab"`

```js
class InputCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
      </div>
    );
  }
}
```

## 非受控组件

表单数据由 `DOM` 本身处理。即不受 `setState()`的控制，与传统的 `HTML` 表单输入相似，`input` 输入值即显示最新值（使用 `ref` 从 DOM 获取表单值）

在底层实现时是在其内部维护了自己的状态 `state`；这样表现出用户输入任何值都能反应到元素上

```js
class InputCom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: "" };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleNameChange} />
      </div>
    );
  }
}
```
