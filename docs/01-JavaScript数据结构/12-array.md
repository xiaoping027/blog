# Array

> `Array.length===1` > `Array` 构造函数的 `length` 属性，其值为 `1`（注意该属性为静态属性，不是数组实例的 `length` 属性）。

## Array.isArray

```js
Array.isArray([1, 2, 3]);
// true
Array.isArray({ foo: 123 });
// false
Array.isArray("foobar");
// false
Array.isArray(undefined);
// false
```

当检测 `Array` 实例时, `Array.isArray` 优于 `instanceof`,因为 `Array.isArray` 能检测 `iframes`

```js
var iframe = document.createElement("iframe");
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length - 1].Array;
var arr = new xArray(1, 2, 3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
```

原理实现,原型链查找

```js
if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === "[object Array]";
  };
}
```

## 创建数组

### Array.from()

从一个类似数组或可迭代对象创建一个新的，`浅拷贝`的数组实例

```js
Array.from("foo");
// [ "f", "o", "o" ]
const set = new Set(["foo", "bar", "baz", "foo"]);
Array.from(set);
// [ "foo", "bar", "baz" ]
const map = new Map([
  [1, 2],
  [2, 4],
  [4, 8]
]);
Array.from(map);
// [[1, 2], [2, 4], [4, 8]]

const mapper = new Map([
  ["1", "a"],
  ["2", "b"]
]);
Array.from(mapper.values());
// ['a', 'b'];

Array.from(mapper.keys());
// ['1', '2'];

Array.from([1, 2, 3], x => x + x);
// [2, 4, 6]
Array.from({ length: 5 }, (v, i) => i);
// [0, 1, 2, 3, 4]
```

### Array.of()

创建一个具有可变数量参数的新数组实例，而不考虑参数的数量或类型。

```js
Array.of(7); // [7]
Array.of(1, 2, 3); // [1, 2, 3]

Array(7); // [ , , , , , , ]
Array(1, 2, 3); // [1, 2, 3]
```

兼容性解决

```js
if (!Array.of) {
  Array.of = function() {
    return Array.prototype.slice.call(arguments);
  };
}
```

## 数组增删

### push

将一个或多个元素添加到数组的末尾，并返回该数组的新长度

```js
const animals = ["pigs", "goats", "sheep"];

const count = animals.push("cows");
console.log(count); //4
```

合并数组

```js
var vegetables = ["parsnip", "potato"];
var moreVegs = ["celery", "beetroot"];

// 将第二个数组融合进第一个数组
// 相当于 vegetables.push('celery', 'beetroot');
Array.prototype.push.apply(vegetables, moreVegs);

console.log(vegetables);
// ['parsnip', 'potato', 'celery', 'beetroot']
```

### pop

从数组中删除最后一个元素，并返回该元素的值。此方法更改数组的长度

```js
const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// plants :["broccoli", "cauliflower", "cabbage", "kale"];
// "tomato"
```

> 如果在一个空数组上调用 `pop()`，它返回 `undefined`

### shift

从数组中删除第一个元素，并返回该元素的值。此方法更改数组的长度

```js
const array1 = [1, 2, 3];

const firstElement = array1.shift();

console.log(array1);
// Array [2, 3]
console.log(firstElement);
// 1
```

`shift` 方法移除索引为 `0` 的元素(即第一个元素)，并返回被移除的元素，其他元素的索引值随之减 `1`。如果 `length` 属性的值为 0 (长度为 0)，则返回 `undefined`。

### unshift

将一个或多个元素添加到数组的开头，并返回该数组的新长度(该方法修改原有数组)。

```js
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// 5

console.log(array1);
// [4, 5, 1, 2, 3]
```

> 如果传入多个参数，它们会被以块的形式插入到对象的开始位置，它们的顺序和被作为参数传入时的顺序一致。 于是，传入多个参数调用一次 `unshift` ，和传入一个参数调用多次 `unshift`结果不一样

### splice

通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组

```js
array.splice(start[, deleteCount[, item1[, item2[, ...]]]])
```

要添加进数组的元素,从 `start` 位置开始。如果不指定，则 `splice()` 将只删除数组元素

```js
const months = ["Jan", "March", "April", "June"];
months.splice(1, 0, "Feb");
// ["Jan", "Feb", "March", "April", "June"]
```

### slice

返回一个新的数组对象，这一对象是一个由 `begin` 和 `end` 决定的原数组的浅拷贝（包括 `begin`，不包括 `end`）。原始数组不会被改变.

浅复制了原数组中的元素的一个新数组

该参数为负数，则表示从原数组中的倒数第几个元素开始提取，`slice(-2)` 表示提取原数组中的倒数第二个元素到最后一个元素（包含最后一个元素）

```js
const animals = ["ant", "bison", "camel", "duck", "elephant"];

console.log(animals.slice(2));
// ["camel", "duck", "elephant"]
```

- 如果 `end` 被省略，则 `slice` 会一直提取到原数组末尾。
- 如果 `end` 大于数组的长度，`slice` 也会一直提取到原数组末尾

### concat

用于合并两个或多个数组。此方法不会更改现有数组，而是返回一个新数组

```js
const array1 = ["a", "b", "c"];
const array2 = ["d", "e", "f"];
const array3 = array1.concat(array2);

console.log(array3);
```

### copyWithin

浅复制数组的一部分到同一数组中的另一个位置，并返回它，不会改变原数组的长度

```js
const array1 = ["a", "b", "c", "d", "e"];

// copy to index 0 the element at index 3
console.log(array1.copyWithin(0, 3, 4));
// ["d", "b", "c", "d", "e"]
```

### reverse

将数组中元素的位置颠倒，并返回该数组。数组的第一个元素会变成最后一个，数组的最后一个元素变成第一个。该方法会改变原数组

```js
const array1 = ["one", "two", "three"];
console.log("array1:", array1);
// expected output: "array1:" Array ["one", "two", "three"]
```

### fill

一个固定值填充一个数组中从起始索引到终止索引内的全部元素。不包括终止索引。

```js
const array1 = [1, 2, 3, 4];

// fill with 0 from position 2 until position 4
console.log(array1.fill(0, 2, 4));
// [1, 2, 0, 0]
```

## 数组遍历

### forEach

对数组的每个元素执行一次给定的函数

```js
arr.forEach(callback(currentValue [, index [, array]])[, thisArg])
```

除了抛出异常以外，没有办法中止或跳出 `forEach()` 循环。如果你需要中止或跳出循环，`forEach()` 方法不是应当使用的工具

> 不对未初始化的值进行任何操作（稀疏数组)

### map

创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

```js
const array1 = [1, 4, 9, 16];
const map1 = array1.map(x => x * 2);
console.log(map1);
// Array [2, 8, 18, 32]
```

> 如果被 `map` 调用的数组是离散的，新数组将也是离散的保持相同的索引为空。

### reduce

对数组中的每个元素执行一个由您提供的 `reducer` 函数(升序执行)，将其结果汇总为单个返回值

```js
const array1 = [1, 2, 3, 4];
const reducer = (accumulator, currentValue) => accumulator + currentValue;

// 1 + 2 + 3 + 4
console.log(array1.reduce(reducer));
```

### reduceRight

接受一个函数作为累加器（`accumulator`）和数组的每个值（从右到左）将其减少为单个值。

```js
const array1 = [
  [0, 1],
  [2, 3],
  [4, 5]
].reduceRight((accumulator, currentValue) => accumulator.concat(currentValue));

console.log(array1);
// [4, 5, 2, 3, 0, 1]
```

### flat

会按照一个可指定的深度递归遍历数组，并将所有元素与遍历到的子数组中的元素合并为一个新数组返回

```js
var newArray = arr.flat([depth]);
var arr3 = [1, 2, [3, 4, [5, 6]]];
arr3.flat(2);
// [1, 2, 3, 4, 5, 6]

//使用 Infinity，可展开任意深度的嵌套数组
var arr4 = [1, 2, [3, 4, [5, 6, [7, 8, [9, 10]]]]];
arr4.flat(Infinity);
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
```

```js
var arr = [1, 2, [3, 4]];

// 展开一层数组
arr.flat();
// 等效于
arr.reduce((acc, val) => acc.concat(val), []);
// [1, 2, 3, 4]

// 使用扩展运算符 ...
const flattened = arr => [].concat(...arr);
```

```js
var arr1 = [1, 2, 3, [1, 2, 3, 4, [2, 3, 4]]];

function flatDeep(arr, d = 1) {
  return d > 0
    ? arr.reduce(
        (acc, val) =>
          acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val),
        []
      )
    : arr.slice();
}

flatDeep(arr1, Infinity);
// [1, 2, 3, 1, 2, 3, 4, 2, 3, 4]
```

### flatMap

首先使用映射函数映射每个元素，然后将结果压缩成一个新数组。它与 `map` 连着深度值为 `1` 的 `flat` 几乎相同，但 `flatMap` 通常在合并成一种方法的效率稍微高一些

```js
var arr1 = [1, 2, 3, 4];

arr1.map(x => [x * 2]);
// [[2], [4], [6], [8]]

arr1.flatMap(x => [x * 2]);
// [2, 4, 6, 8]

// only one level is flattened
arr1.flatMap(x => [[x * 2]]);
// [[2], [4], [6], [8]]
```

```js
let arr1 = ["it's Sunny in", "", "California"];

arr1.map(x => x.split(" "));
// [["it's","Sunny","in"],[""],["California"]]

arr1.flatMap(x => x.split(" "));
// ["it's","Sunny","in", "", "California"]
```

### filter

创建一个新数组, 其包含通过所提供函数实现的测试的所有元素

> `filter` 遍历的元素范围在第一次调用 `callback` 之前就已经确定了。在调用 `filter` 之后被添加到数组中的元素不会被 filter 遍历到。如果已经存在的元素被改变了，则他们传入 `callback` 的值是 `filter` 遍历到它们那一刻的值。被删除或从来未被赋值的元素不会被遍历到。

### find

返回数组中满足提供的测试函数的第一个元素的值。否则返回 `undefined`

### findIndex

返回数组中满足提供的测试函数的第一个元素的索引

数组中通过提供测试函数的第一个元素的索引。否则，返回`-1`

对数组中的每个数组索引`0..length-1`（包括）执行一次 `callback` 函数，直到找到一个 `callback` 函数返回真实值（强制为 t`rue`）的值

### includes

用来判断一个数组是否包含一个指定的值，根据情况，如果包含则返回 `true`，否则返回 `false`

### indexOf

返回在数组中可以找到一个给定元素的第一个索引，如果不存在，则返回`-1`

### lastIndexOf

方法返回指定元素（也即有效的 `JavaScript` 值或变量）在数组中的最后一个的索引，如果不存在则返回 `-1`。从数组的后面向前查找，从 `fromIndex` 处开始

### every

测试一个数组内的所有元素是否都能通过某个指定函数的测试。它返回一个`Boolean`。

> 若收到一个空数组，此方法在一切情况下都会返回 `true`

### some

测试数组中是不是至少有 `1` 个元素通过了被提供的函数测试。它返回的是一个 `Boolean` 类型的值。

### values

`values()` 方法返回一个新的 `Array Iterator`对象，该对象包含数组每个索引的值

```js
const array1 = ["a", "b", "c"];
const iterator = array1.values();

for (const value of iterator) {
  console.log(value);
}
```

### keys

返回一个包含数组中每个索引键的`Array Iterator`对象。

```js
const array1 = ["a", "b", "c"];
const iterator = array1.keys();

for (const key of iterator) {
  console.log(key);
}

// expected output: 0
// expected output: 1
// expected output: 2
```

### entries

返回一个新的`Array Iterator`对象，该对象包含数组中每个索引的键/值对

```js
const array1 = ["a", "b", "c"];

const iterator1 = array1.entries();

console.log(iterator1.next().value);
// expected output: Array [0, "a"]

console.log(iterator1.next().value);
// expected output: Array [1, "b"]
```

## 数组排序

### sort

`sort()` 方法用原地算法对数组的元素进行排序，并返回数组。默认排序顺序是在将元素转换为字符串，然后比较它们的 `UTF-16` 代码单元值序列时构建的

`由于它取决于具体实现，因此无法保证排序的时间和空间复杂性`。

- 如果 `compareFunction(a, b)` 小于 `0` ，那么 `a` 会被排列到 `b` 之前；
- 如果 `compareFunction(a, b)` 等于 `0` ， `a` 和 `b` 的相对位置不变。备注： `ECMAScript` 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 `Mozilla` 在 2003 年之前的版本）；
- 如果 `compareFunction(a, b)` 大于 `0` ， `b` 会被排列到 `a` 之前。
  `compareFunction(a, b)` 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。
