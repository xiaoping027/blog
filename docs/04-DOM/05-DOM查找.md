# DOM-查找元素

## getElementById

```js
var element = document.getElementById(id);
```

`element` 是一个 `Element` 对象。如果当前文档中拥有特定 `ID` 的元素不存在则返回 `null`.
`id` 是大小写敏感的字符串，代表了所要查找的元素的唯一 `ID`.

## getElementByTagName

```js
var elements = document.getElementsByTagName(name);
```

`elements` 是一个由发现的元素出现在树中的顺序构成的动态的 `HTML` 集合 `HTMLCollection`(当其所包含的文档结构发生改变时，它会自动更新。)
`name` 是一个代表元素的名称的字符串。特殊字符 `*` 代表了所有元素。

## getElementsByName

只有`HTMLDocument`类型才有的方法

```js
var elements = document.getElementsByName(name);
```

`elements` 是一个实时更新的 `NodeList` 集合。
`name` 是元素的 `name` 属性的值。

## document.images

`images` 返回当前文档中所有 `image` 元素的集合

```js
var imageCollection = document.images;
```

返回一个 `HTMLCollection`，提供了包含在该文档中的所有 `images` 元素实时的列表。
集合中的每条代表了一个单 `image` 元素的 `HTMLImageElements`

## document.links

`links` 属性返回一个文档中所有具有 `href` 属性值的 `<area>` 元素与 `<a>` 元素的集合。

```js
nodeList = document.links;
```

## document.forms

```js
var collection = document.forms;
```

返回当前文档中的 `<form>`元素的一个集合(一个 `HTMLCollection`)

## getElementsByClassName

```js
var elements = document.getElementsByClassName(names); // or:
var elements = rootElement.getElementsByClassName(names);
```

`elements` 是一个实时集合，包含了找到的所有元素。
`names` 是一个字符串，表示要匹配的类名列表；类名通过空格分隔
`getElementsByClassName` 可以在任何元素上调用，不仅仅是 `document`。 调用这个方法的元素将作为本次查找的根元素.

## querySelector

档对象模型 `Document` 引用的 `querySelector()`方法返回文档中与指定选择器或选择器组匹配的第一个 `html` 元素 `Element`。 如果找不到匹配项，则返回 `null`

> 匹配是使用深度优先先序遍历，从文档标记中的第一个元素开始，并按子节点的顺序依次遍历。

```js
element = document.querySelector(selectors);
```

## querySelectorAll

返回与指定的选择器组匹配的文档中的元素列表 (使用深度优先的先序遍历文档的节点)。返回的对象是 `NodeList` 。

```js
elementList = parentNode.querySelectorAll(selectors);
```

`selectors` 一个 `DOMString` 包含一个或多个匹配的选择器
