# BFC 块级的格式化上下文

视觉格式化模型(`visual formatting model`)是用来处理文档并将它显示在视觉媒体上的机制，它也是 CSS 中的一个概念。

视觉格式化模型定义了盒（Box）的生成，盒主要包括了块盒、行内盒、匿名盒（没有名字不能被选择器选中的盒）以及一些实验性的盒（未来可能添加到规范中）。盒的类型由 display 属性决定。

## 块盒 block box

块盒有以下特性：

- 当元素的 CSS 属性 display 为 block，list-item 或 table 时，它是块级元素 block-level；
- 视觉上呈现为块，竖直排列；
- 块级盒参与(块格式化上下文)；
- 每个块级元素至少生成一个块级盒，称为主要块级盒(`principal block-level box`)。一些元素，比如`<li>`，生成额外的盒来放置项目符号，不过多数元素只生成一个主要块级盒。

## 行内盒 inline box

- 当元素的 CSS 属性 display 的计算值为 inline，inline-block 或 inline-table 时，称它为行内级元素；
- 视觉上它将内容与其它行内级元素排列为多行；典型的如段落内容，有文本(可以有多种格式譬如着重)，或图片，都是行内级元素；
- 行内级元素生成行内级盒(inline-level boxes)，参与行内格式化上下文(inline formatting context)。同时参与生成行内格式化上下文的行内级盒称为行内盒(inline boxes)。所有 display:inline 的非替换元素生成的盒是行内盒；
- 不参与生成行内格式化上下文的行内级盒称为原子行内级盒(atomic inline-level boxes)。这些盒由可替换行内元素，或 display 值为 inline-block 或 inline-table 的元素生成，不能拆分成多个盒；

## 匿名盒 anonymous box

匿名盒也有份匿名块盒与匿名行内盒，因为匿名盒没有名字，不能利用选择器来选择它们，所以它们的所有属性都为 `inherit` 或初始默认值

```html
<div>
  Some inline text 匿名盒
  <p>followed by a paragraph</p>
  followed by more inline text.匿名盒
</div>
```

## 三个定位方案

在定位的时候，浏览器就会根据元素的盒类型和上下文对这些元素进行定位，可以说盒就是定位的基本单位。定位时，有三种定位方案，分别是常规流，浮动和绝对定位。

### 常规流 Normal flow

- 在常规流中，盒一个接着一个排列;
- 在块级格式化上下文里面， 它们竖着排列；
- 在行内格式化上下文里面， 它们横着排列;
- 当 position 为 static 或 relative，并且 float 为 none - 时会触发常规流；
- 对于静态定位(static positioning)，position: static，盒的
- 位置是常规流布局里的位置；
- 对于相对定位(relative positioning)，position: relative，盒偏移位置由这些属性定义 top，bottom，leftandright。即使有偏移，仍然保留原有的位置，其它常规流不能-占用这个位置。

### 浮动 Floats

- 盒称为浮动盒(floating boxes)；
- 它位于当前行的开头或末尾；
- 这导致常规流环绕在它的周边，除非设置 clear 属性；

### 绝对定位 Absolute positioning

- 绝对定位方案，盒从常规流中被移除，不影响常规流的布局；
- 它的定位相对于它的包含块，相关 CSS 属性：top，bottom，left 及 right；
- 如果元素的属性 position 为 absolute 或 fixed，它是绝对定位元素；
- 对于 position: absolute，元素定位将相对于最近的一个 relative、fixed 或 absolute 的父元素，如果没有则相对于 body；

## 块格式化上下文

- 根元素(`<html>`)
- 浮动元素（元素的 float 不是 none）
- 绝对定位元素（元素的 position 为 absolute 或 fixed）
- 行内块元素（元素的 display 为 inline-block）
- 表格单元格（元素的 display 为 table-cell，HTML 表格单元格默认为该值）
- 表格标题（元素的 display 为 table-caption，HTML 表格标题默认为该值）
- 匿名表格单元格元素（元素的 display 为 table、table-row、 - table-row-group、table-header-group、table-footer-group（分别是 HTML table、row、tbody、thead、tfoot 的默认属性）或 inline-table）
- overflow 值不为 visible 的块元素
- display 值为 flow-root 的元素
- contain 值为 layout、content 或 paint 的元素
- 弹性元素（display 为 flex 或 inline-flex 元素的直接子元素）
- 网格元素（display 为 grid 或 inline-grid 元素的直接子元素）
- 多列容器（元素的 column-count 或 column-width 不为 auto，包括 column-count 为 1）
- column-span 为 all 的元素始终会创建一个新的 BFC，即使该元素没有包裹在一个多列容器中（标准变更，Chrome bug）。

最常见的就是 `overflow:hidden`、`float:left/right`、`position:absolute`。也就是说，每次看到这些属性的时候，就代表了该元素以及创建了一个 BFC 了

- 内部的盒会在垂直方向一个接一个排列（可以看作 BFC 中有一个的常规流）；
- 处于同一个 BFC 中的元素相互影响，可能会发生 margin collapse；
- 每个元素的 margin box 的左边，与容器块 border box 的左边相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此；
- BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然；
- 计算 BFC 的高度时，考虑 BFC 所包含的所有元素，连浮动元素也参与计算；
  浮动盒区域不叠加到 BFC 上；
