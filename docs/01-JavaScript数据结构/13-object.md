# Object

```js
// 以构造函数形式来调用
new Object([value]);
```

## constructor

返回创建实例对象的 `Object` 构造函数的引用。`注意，此属性的值是对函数本身的引用，而不是一个包含函数名称的字符串`

```js
var o = {};
o.constructor === Object; // true

var o = new Object();
o.constructor === Object; // true

var a = [];
a.constructor === Array; // true

var a = new Array();
a.constructor === Array; // true

var n = new Number(3);
n.constructor === Number; // true
```

- 改变对象的 `constructor`
  依赖一个对象的 `constructor` 属性并不安全

- 改变函数的 `constructor`
  此属性用于定义一个构造函数，并使用 `new` 和继承原型链进一步调用它

```js
function Parent() {}
Parent.prototype.parentMethod = function parentMethod() {};

function Child() {}
Child.prototype = Object.create(Parent.prototype); // re-define child prototype to Parent prototype

Child.prototype.constructor = Child; // return original constructor to Child
```

## Object.create()

创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

```js
Object.create = function(proto, propertiesObject) {
  function F() {}
  F.prototype = proto;
  return new F();
};
```

类式继承

```js
function Shape() {
  this.x = 0;
  this.y = 0;
}

// 父类的方法
Shape.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  console.info("Shape moved.");
};

// Rectangle - 子类(subclass)
function Rectangle() {
  Shape.call(this); // call super constructor.
}

// 子类续承父类
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

var rect = new Rectangle();
```

## Object.defineProperty()

会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象

```js
Object.defineProperty(obj, prop, descriptor);
```

> <https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty>

### 属性描述符

对象里目前存在的属性描述符有两种主要形式：数据描述符和存取描述符。数据描述符是一个具有值的属性，该值可能是可写的，也可能不是可写的。存取描述符是由`getter-setter`函数对描述的属性。描述符必须是这两种形式之一；不能同时是两者。

数据描述符和存取描述符均具有以下可选键值(默认值是在使用`Object.defineProperty()`定义属性的情况下)：

- `configurable`
  当且仅当该属性的 `configurable` 为 `true` 时，该属性描述符才能够被改变，同时该属性也能从对应的对象上被删除。默认为 `false`。
- `enumerable`
  当且仅当该属性的`enumerable`为`true`时，该属性才能够出现在对象的枚举属性中。默认为 `false`。
  数据描述符同时具有以下可选键值：

- `value`
  该属性对应的值。可以是任何有效的 `JavaScript` 值（数值，对象，函数等）。默认为 `undefined`。
- writable
  当且仅当该属性的`writable`为`true`时，`value`才能被赋值运算符改变。默认为 `false`。

存取描述符同时具有以下可选键值：

- `get`
  一个给属性提供 `getter` 的方法，如果没有 `getter` 则为 `undefined`。当访问该属性时，该方法会被执行，方法执行时没有参数传入，但是会传入 this 对象（由于继承关系，这里的 this 并不一定是定义该属性的对象）。
  默认为 `undefined`。
- `set`
  一个给属性提供 `setter` 的方法，如果没有 `setter` 则为 `undefined`。当属性值修改时，触发执行该方法。该方法将接受唯一参数，即该属性新的参数值。
  默认为 `undefined`。

## Object.defineProperties()

直接在一个对象上定义新的属性或修改现有属性，并返回该对象。

```js
Object.defineProperties(obj, props);
```

```js
var obj = {};
Object.defineProperties(obj, {
  property1: {
    value: true,
    writable: true
  },
  property2: {
    value: "Hello",
    writable: false
  }
  // etc. etc.
});
// {
//   property1: true;
//   property2: "Hello";
//   __proto__: Object;
// }
```

## Object.assign()

用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。

> 如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

## Object.entries()

返回一个给定对象自身可枚举属性的键值对数组，其排列与使用 `for...in` 循环遍历该对象时返回的顺序一致（区别在于 `for-in` 循环还会枚举原型链中的属性）

```js
var obj = { foo: "bar", baz: 42 };
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: "bar", baz: 42 }
```

## Object.keys()

返回一个由一个给定对象的自身可枚举属性组成的数组，数组中属性名的排列顺序和使用 `for...in` 循环遍历该对象时返回的顺序一致

## Object.values()

返回一个给定对象自身的所有可枚举属性值的数组，值的顺序与使用 `for...in` 循环的顺序相同 ( 区别在于 `for-in` 循环枚举原型链中的属性 )。

## Object.fromEntries()

把键值对列表转换为一个对象

```js
const entries = new Map([
  ["foo", "bar"],
  ["baz", 42]
]);

const obj = Object.fromEntries(entries);
```

```js
const arr = [
  ["0", "a"],
  ["1", "b"],
  ["2", "c"]
];
const obj = Object.fromEntries(arr);
console.log(obj); // { 0: "a", 1: "b", 2: "c" }
```
