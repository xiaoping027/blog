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

function renderNode(data) {
  let parentNode = document.createElement(data.type);
  parentNode.setAttribute("class", data.props.className);
  parentNode.setAttribute("style", data.props.style);
  let queue = [[data.children, parentNode]];
  while (queue.length !== 0) {
    let [node, parent] = queue.shift();
    let nodeTemp = document.createElement(node.type);
    nodeTemp.setAttribute("class", node.props.className);
    nodeTemp.setAttribute("style", node.props.style);
    parent.appendChild(nodeTemp);
    if (node.children) {
      queue.push([node.children, nodeTemp]);
    }
  }
  return parentNode;
}

renderNode(data);
