# CSS-Flex 布局

`Flexible Box` 模型，通常被称为 `flexbox`，**是一种一维的布局模型**。它给 `flexbox` 的子元素之间提供了强大的空间分布和对齐能力。

一维布局：一个 `flexbox`
**一次只能处理一个维度上的元素布局，一行或者一列**

```css
flex: auto | initial | none | inherit | [ flex-grow ] || [ flex-shrink ] || [
  flex-basis ];
```

## FlexBox 的两根轴线

当使用 flex 布局时，首先想到的是两根轴线 — **主轴**和**交叉轴**。主轴由 `-direction` 定义，另一根轴垂直于它。使用 `flexbox` 的所有属性都跟这两根轴线有关, 所以有必要在一开始首先理解它。

### 主轴 `flex-direction`

- `row`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>FlexBox学习</title>
    <style>
      .container {
        display: flex;
        flex-direction: row;
      }
      .container-item {
        height: 100px;
        width: 100px;
        margin: 10px;
        border: 1px solid #dddddd;
        background-image: linear-gradient(-90deg, #3860f4 0%, #5f87f8 100%);
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="container-item">1</div>
      <div class="container-item">2</div>
      <div class="container-item">3</div>
      <div class="container-item">4</div>
      <div class="container-item">5</div>
      <div class="container-item">6</div>
    </div>
  </body>
</html>
```

### 交叉轴

交叉轴垂直于主轴，所以如果你的`flex-direction`(主轴) 设成了 `row`或者 `row-reverse` 的话，交叉轴的方向就是沿着列向下的。

如果主轴方向设成了 `column` 或者 `column-reverse`，交叉轴就是水平方向。

## 起始线和终止线

`flexbox` 不会对文档的书写模式提供假设。过去，`CSS`的书写模式主要被认为是水平的，从左到右的。现代的布局方式涵盖了书写模式的范围，所以不再假设一行文字是从文档的左上角开始向右书写,新的行也不是必须出现在另一行的下面。
如果 `flex-direction` 是 `row` ,那么主轴的起始线是左边，终止线是右边。

> <https://developer.mozilla.org/zh-CN/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox>

## Flex 容器

`CSS`采用了 `flexbox` 的区域就叫做 `flex` 容器。为了创建 `flex` 容器，把一个容器的 `display` 属性值改为 `flex` 或者 `inline-flex`。

容器中的直系子元素就会变为 `flex` 元素。所有`CSS`属性都会有一个初始值，所以 `flex` 容器中的所有 `flex` 元素都会有下列行为:

- 元素排列为一行 (`flex-direction` 属性的初始值是 `row`)。
- 元素从主轴的起始线开始。
- 元素不会在主维度方向拉伸，但是可以缩小。
- 元素被拉伸来填充交叉轴大小。
- `flex-basis` 属性为 `auto`。
- `flex-wrap` 属性为 `nowrap`。

这会让你的元素呈线形排列，并且把自己的大小作为主轴上的大小。如果有太多元素超出容器，它们会溢出而不会换行。如果一些元素比其他元素高，那么元素会沿交叉轴被拉伸来填满它的大小。

### 用`flex-wrap`实现多行`Flex`容器

`flexbox`是一维模型，但可以使我们的`flex`项目应用到多行中。 在这样做的时候，应该把每一行看作一个新的`flex`容器。 任何空间分布都将在该行上发生，而不影响该空间分布的其他行。

```css
.container {
  display: flex;
  flex-direction: column-reverse;
  flex-flow: wrap;
}
.container-item {
  height: 100px;
  margin: 10px;
  width: 40%;
  border: 1px solid #dddddd;
  background-image: linear-gradient(-90deg, #3860f4 0%, #5f87f8 100%);
}
```

### 简写属性 `flex-flow`

可以将两个属性 `flex-direction` 和 `flex-wrap` 组合为简写属性 `flex-flow`。第一个指定的值为 `flex-direction` ，第二个指定的值为 `flex-wrap`。

## `flex` 元素上的属性

在考虑这几个属性的作用之前，需要先了解一下 布局空白 `available space` 这个概念。这几个 `flex` 属性的作用其实就是改变了 `flex` 容器中的布局空白的行为。同时，布局空白对于 `flex` 元素的对齐行为也是很重要的。

假设在 1 个 500px 的容器中，我们有 3 个 100px 宽的元素，那么这 3 个元素需要占 300px 的宽，剩下 200px 的布局空白。在默认情况下， flexbox 的行为会把这 200px 的空白留在最后一个元素的后面。

**如果期望这些元素能自动地扩展去填充满剩下的空白，那么我们需要去控制布局空白在这几个元素间如何分配，这就是元素上的那些 `flex` 属性要做的事。**

### `flex-grow` 定义弹性盒子元素的扩展比率

`flex-grow` 若被赋值为一个正整数， `flex` 元素会以 `flex-basis` 为基础，沿主轴方向增长尺寸。这会使该元素延展，并占据此方向轴上的布局空白`（available space）`。如果有其他元素也被允许延展，那么会各自占据布局空白的一部分。

如果我们给上例中的所有元素设定 `flex-grow` 值为 1， 容器中的布局空白会被这些元素平分。它们会延展以填满容器主轴方向上的空间。

`flex-grow` 属性可以按比例分配空间。如果第一个元素 `flex-grow`值为 2， 其他元素值为 1，则第一个元素将占有`2/4`（上例中，即为`200px 中的 100px`）, 另外两个元素各占有`1/4（各50px）`。

### `flex-shrink` 定义弹性盒子元素的收缩比率

`flex-grow`属性是处理`flex`元素在主轴上增加空间的问题，相反`flex-shrink`属性是处理`flex`元素收缩的问题。如果容器中没有足够排列`flex`元素的空间，那么可以把`flex`元素`flex-shrink`属性设置为正整数来缩小它所占空间到`flex-basis`以下。与`flex-grow`属性一样，可以赋予不同的值来控制`flex`元素收缩的程度 —— 给`flex-shrink`属性**赋予更大的数值可以比赋予小数值的同级元素收缩程度更大。**

在计算 flex 元素收缩的大小时，它的最小尺寸也会被考虑进去，就是说实际上`flex-shrink`属性可能会和 flex-grow 属性表现的不一致。

### `flex-basis` 定义弹性盒子元素的默认基准值

`flex-basis` 定义了该元素的布局空白`（available space）`的基准值。 该属性的默认值是 `auto` 。此时，浏览器会检测这个元素是否具有确定的尺寸。 在上面的例子中, 所有元素都设定了宽度`（width）`为`100px`，所以 `flex-basis` 的值为`100px`。

如果没有给元素设定尺寸，`flex-basis` 的值采用元素内容的尺寸。这就解释了：我们给只要给 Flex 元素的父元素声明 `display: flex` ，所有子元素就会排成一行，且自动分配小大以充分展示元素的内容。

## 元素间的对齐和空间分配

`Flexbox`的一个关键特性是能够设置`flex`元素沿主轴方向和交叉轴方向的对齐方式，以及它们之间的空间分配。

### `align-items`

`align-items` 属性可以使元素在交叉轴方向对齐。

- `stretch`
- `flex-start`
- `flex-end`
- `center`

### `justify-content`

`justify-content`属性用来使元素在主轴方向上对齐，主轴方向是通过 `flex-direction` 设置的方向。初始值是 flex-start，元素从容器的起始线排列。但是你也可以把值设置为`flex-end`，从终止线开始排列，或者`center`，在中间排列.

- `stretch`
- `flex-start`
- `flex-end`
- `center`
- `space-around`
- `space-between`

#### 水平居中

```css
.container {
  display: flex;
  justify-content: center;
}
```

> <https://www.html.cn/archives/7236> > <https://css-tricks.com/snippets/css/a-guide-to-flexbox/重要>
