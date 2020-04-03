# React-列表和 Key

`key` 帮助 `React` 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识。

```js
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map(number => (
  <li key={number.toString()}>{number}</li>
));
```

一个元素的 `key` 最好是这个元素在列表中拥有的一个独一无二的字符串

## key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的

```js
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map(post => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
  const content = props.posts.map(post => (
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  ));
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  { id: 1, title: "Hello World", content: "Welcome to learning React!" },
  { id: 2, title: "Installation", content: "You can install React from npm." }
];
ReactDOM.render(<Blog posts={posts} />, document.getElementById("root"));
```
