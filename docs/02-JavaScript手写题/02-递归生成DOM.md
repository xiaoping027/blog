# 生成 DOM 节点

```js
let data = {
  type: "div",
  props: {
    className: "111",
    style: "2222"
  },
  children: {
    type: "div",
    props: {
      className: "333",
      style: "4444"
    },
    children: {
      type: "h3",
      props: {
        className: "555",
        style: "6666"
      },
      children: {
        type: "h4",
        props: {
          className: "777",
          style: "888"
        }
      }
    }
  } // 嵌套节点
};

//实现一个函数，生成dom节点

//递归实现
function renderNode(data) {
  let parentNode = document.createElement(data.type);
  parentNode.setAttribute("class", data.props.className);
  parentNode.setAttribute("style", data.props.style);
  let fn = (data, parent) => {
    let childNode = document.createElement(data.type);
    childNode.setAttribute("class", data.props.className);
    childNode.setAttribute("style", data.props.style);
    parent.appendChild(childNode);
    if (data.children) {
      fn(data.children, childNode);
    }
    return parent;
  };
  return fn(data.children, parentNode);
}

//深度优先实现
function renderNodeDeep(data) {
  let parentNode = document.createElement(data.type);
  parentNode.setAttribute("class", data.props.className);
  parentNode.setAttribute("style", data.props.style);
  let stack = [[data.children, parentNode]];
  while (stack.length !== 0) {
    let [node, parent] = stack.pop();
    let nodeTemp = document.createElement(node.type);
    nodeTemp.setAttribute("class", node.props.className);
    nodeTemp.setAttribute("style", node.props.style);
    parent.appendChild(nodeTemp);
    if (node.children) {
      stack.push([node.children, nodeTemp]);
    }
  }
  return parentNode;
}
```
