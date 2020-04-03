# CSS-Grid 布局

Grid 顾名思义：网格，即 CSS 中的网格布局，flex 是一维的，grid 是一个二维布局方式。

CSS 规则应用于父元素（成为网格容器）和该元素的子元素（网格元素），来使用网格布局。

## 基本语法

- `display：grid`:把容器元素定义为一个网格;
- `grid-template-columns`;写入了 3 个值，就会得到 3 列；

```css
 {
  grid-template-columns: 100px 100px 100px;
}
```

- `grid-template-rows`:写入了 2 个值，就会得到 2 行

```css
 {
  grid-template-rows: 100px 100px 100px;
}
```

### 网格容器`Grid Container`

应用`display: grid`的元素。这是所有 网格项`（grid item`）的直接父级元素。
在这个例子中，`container` 就是 网格容器`(Grid Container)`。

```html
<div class="container">
  <div class="item item-1"></div>
  <div class="item item-2"></div>
  <div class="item item-3"></div>
</div>
```

### 网格项 `Grid Item`

网格容器`（Grid Container）`的子元素（例如直接子元素）。这里 `item` 元素就是网格项`(Grid Item)`，但是 `sub-item`不是。

```html
<div class="container">
  <div class="item"></div>
  <div class="item">
    <p class="sub-item"></p>
  </div>
  <div class="item"></div>
</div>
```

### 网格线`Grid Line`

构成网格结构的分界线。它们既可以是垂直的`（“列网格线(column grid lines)”）`，也可以是水平的`（“行网格线(row grid lines)”）`，并位于行或列的任一侧。例如，这里的黄线就是一条列网格线。

```css
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

### 网格轨道`Grid Track`

两条相邻网格线之间的空间。你可以把它们想象成网格的列或行。下图是第二条和第三条 行网格线 之间的 网格轨道`Grid Track`。

### 网格区域`Grid Area`

4 条网格线包围的总空间

### 网格单元格`Grid Cell`

两个相邻的行和两个相邻的列网格线之间的空间.

## 属性

### `display`

将元素定义为 `grid` `contaienr`，并为其内容建立新的网格格式化上下文(`grid formatting context`)。

值:

- `grid` - 生成一个块级(`block-level`)网格
- `inline-grid`- 生成一个行级(`inline-level`)网格
- `subgrid` - 如果你的 `grid container` 本身就是一个 `grid item`（即,嵌套网格）
  可以使用这个属性来表示你想从它的父节点获取它的行/列的大小，而不是指定它自己的大小

```css
.container {
  display: grid | inline-grid | subgrid;
}
```

注意：`column`, `float`, `clear`, 以及`vertical-align` 对一个`grid container` 没有影响;

### `grid-template-columns / grid-template-rows`

```css
.container {
  grid-template-columns: <track-size> ... | <line-name> <track-size> ...;
  grid-template-rows: <track-size> ... | <line-name> <track-size> ...;
}
```

```css
.container {
  grid-template-columns: [first] 40px [line2] 50px [line3] auto [col4-start] 50px [five] 40px [end];
  grid-template-rows: [row1-start] 25% [row1-end] 100px [third-line] auto [last-line];
}
```

需要注意的是，一个网格线可以有不止一个名字。例如，这里第 2 条网格线有两个名字：`row1-end` 和 `row2-start`：

```css
.container {
  grid-template-columns: repeat(3, 20px [col-start]) 5%;
}

等价 则可以使用repeat()符号来简化写法： .container {
  grid-template-columns: 20px [col-start] 20px [col-start] 20px [col-start] 5%;
}

“fr”单位允许您将轨道大小设置为网格容器自由空间的一部分。
  例如，下面的代码会将每个
  grid
  item
  为
  grid
  container
  宽度的三分之一：
  .container {
  grid-template-columns: 1fr 1fr 1fr;
}

自由空间是在排除所有不可伸缩的 grid item 之后计算得到的。 在下面的示例中，fr单位可用的自由空间总量不包括50px:

.container {
  grid-template-columns: 1fr 50px 1fr 1fr;
}
```

### `grid-template-areas`

通过引用 `grid-area`属性指定的网格区域的名称来定义网格模板。
重复网格区域的名称导致内容扩展到这些单元格。 点号表示一个空单元格。
本身提供了网格结构的可视化。

值：

- `<grid-area-name>` - 使用 grid-area 属性设置的网格区域的名称
- `.`- 点号代表一个空网格单元
- `none` - 没有定义网格区域

```css
.item-a {
  grid-area: header;
}
.item-b {
  grid-area: main;
}
.item-c {
  grid-area: sidebar;
}
.item-d {
  grid-area: footer;
}

.container {
  grid-template-columns: 50px 50px 50px 50px;
  grid-template-rows: auto;
  grid-template-areas:
    "header header header header"
    "main main . sidebar"
    "footer footer footer footer";
}
```

### `grid-template`

在单个声明中定义`grid-template-rows`、`grid-template-columns`、`grid-template-areas` 的简写。

### `grid-column-gap / grid-row-gap`

指定网格线的大小，你可以把它想象为设置列/行之间的间距的宽度

## 第一个 grid 布局

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
    <style>
      .main {
        display: grid;
        grid-template-columns: 60px 60px 60px 60px;
        grid-auto-rows: 60px 60px;
        grid-gap: 10px;
      }
      .main > div {
        background: grey;
        /*大家不要被下面的代码迷惑，只是为了好看，哈哈*/
        display: flex;
        color: #fff;
        font-size: 150%;
        justify-content: center;
        align-items: center;
      }
    </style>
  </head>
  <body>
    <div class="main">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
    </div>
  </body>
</html>
```

> <https://blog.jirengu.com/?p=990>
