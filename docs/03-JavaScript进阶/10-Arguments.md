# Arguments 对象

## 介绍

`arguments` 是一个对应于传递给函数的参数的类数组对象。

`arguments` 对象是所有（非箭头）函数中都可用的局部变量。你可以使用 `arguments` 对象在函数中引用函数的参数。

此对象包含传递给函数的每个参数，第一个参数在索引 `0` 处。例如，如果一个函数传递了三个参数，你可以以如下方式引用他们：

```js
arguments[0];
arguments[1];
arguments[2];
```

`arguments` 对象不是一个 `Array` 。它类似于 `Array` ,但除了 `length` 属性和索引元素之外没有任何 `Array` 属性。例如，它没有 `pop` 方法。但是它可以被转换为一个真正的 `Array`:

```js
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

```js
console.log(typeof arguments); // 'object'
// arguments 对象只能在函数内使用
function test(a) {
  console.log(a, Object.prototype.toString.call(arguments));
  console.log(arguments[0], arguments[1]);
  console.log(typeof arguments[0]);
}
test(1);
/*
1 "[object Arguments]"
1 undefined
number
*/
```

## 属性

- `arguments.callee` 指向当前执行的函数。
- `arguments.length` 指向传递给当前函数的参数数量。
- `arguments[@@iterator]`返回一个新的 `Array` 迭代器对象，该对象包含参数中每个索引的值。

```js
function foo(name, age, sex) {
  console.log(arguments);
}

foo("name", "age", "sex");

// 0: "name"
// 1: "age"
// 2: "sex"
// length: 3
// callee: ƒ foo(name, age, sex)
// Symbol(Symbol.iterator): ƒ values()
// __proto__: Object
```

### callee 属性

```js
var data = [];

for (var i = 0; i < 3; i++) {
  (data[i] = function() {
    console.log(arguments.callee.i);
  }).i = i;
}

data[0]();
data[1]();
data[2]();

// 0
// 1
// 2
```

### 对应参数

传入的参数，实参和 `arguments` 的值会共享，当没有传入时，实参与 `arguments` 值不会共享

除此之外，以上是在非严格模式下，如果是在严格模式下，实参和 `arguments` 是不会共享的

```js
unction foo(name, age, sex, hobbit) {

    console.log(name, arguments[0]); // name name

    // 改变形参
    name = 'new name';

    console.log(name, arguments[0]); // new name new name

    // 改变arguments
    arguments[1] = 'new age';

    console.log(age, arguments[1]); // new age new age

    // 测试未传入的是否会绑定
    console.log(sex); // undefined

    sex = 'new sex';

    console.log(sex, arguments[2]); // new sex undefined

    arguments[3] = 'new hobbit';

    console.log(hobbit, arguments[3]); // undefined new hobbit

}

foo('name', 'age')
```

```js
// 使用 apply 将 foo 的参数传递给 bar
function foo() {
  bar.apply(this, arguments);
}
function bar(a, b, c) {
  console.log(a, b, c);
}

foo(1, 2, 3);
```
