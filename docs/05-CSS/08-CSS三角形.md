# CSS 画三角形

## border

```css
#item {
  width: 0;
  height: 0;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 50px solid transparent;
  border-bottom: 50px solid blue;
  background: white;
}
```

## canvas

实心

```js
var bg = document.getElementById("caibaojian");
var ctx = bg.getContext("2d");
//填充三角形（等边）
ctx.beginPath();
var height = 200 * Math.sin(Math.PI / 3); //计算等边三角形的高
ctx.moveTo(100, 0); //从A（100,0）开始
ctx.lineTo(0, height); //从A(100,0)开始，画到B (0,173)结束
ctx.lineTo(200, height); //B(0,173)-C(200,173)
//ctx.fillStyle='#00ff00';//以纯色绿色填充
var grd = ctx.createLinearGradient(0, 0, 200, 0); //使用渐变颜色填充,从(0,0)到(200,0) （左到右）
grd.addColorStop(0, "#4CE8B2"); //起始颜色
grd.addColorStop(1, "#EFD458"); //终点颜色
ctx.fillStyle = grd; //以上面定义的渐变填充
ctx.fill(); //闭合形状并且以填充方式绘制出来
```

空心

```js
var bg = document.getElementById("caibaojian");
var ctx = bg.getContext("2d");
ctx.beginPath();
ctx.moveTo(10, 10);
ctx.lineTo(10, 180);
ctx.lineTo(180, 180);
ctx.closePath(); //闭合路径
ctx.lineWidth = 10; //线的边框为10像素
//ctx.strokeStyle='#00ff00';
var grd = ctx.createLinearGradient(0, 0, 0, 190); //从上到下
grd.addColorStop(0, "#4CE8B2"); //起始颜色
grd.addColorStop(1, "#EFD458"); //终点颜色
ctx.strokeStyle = grd;
ctx.stroke(); //绘制定义的图形
```

## svg

```html
<svg width="300" height="300" version="1.1" xmlns="http://www.w3.org/2000/svg">
  <polyline
    points="0 0,150 150 ,0 300,0 0 "
    fill="transparent"
    stroke="red"
    stroke-width="3"
  />
</svg>
```
