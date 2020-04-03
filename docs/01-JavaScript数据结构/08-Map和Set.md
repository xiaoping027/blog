# Map 和 Set

## Map

`Map`对象保存键值对。任何值(对象或者原始值) 都可以作为一个键或一个值。构造函数`Map`可以接受一个数组作为参数。

- set(key, value): 向其中加入一个键值对
- get(key): 若不存在 key 则返回 undefined
- has(key):返回布尔值
- delete(key): 删除成功则返回 true, 若 key 不存在或者删除失败会返回 false
- clear(): 将全部元素清除

遍历方法

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

## Set

`Set` 对象允许你存储任何类型的唯一值，无论是原始值或者是对象引用。

Set 对象是值的集合，你可以按照插入的顺序迭代它的元素。 `Set`中的元素只会出现一次，即 Set 中的元素是唯一的

- add(key)
- has(key)
- delete(key)
- clear()

遍历方法

每个值的键和值相等

- keys()：返回键名的遍历器
- values()：返回键值的遍历器
- entries()：返回键值对的遍历器
- forEach()：使用回调函数遍历每个成员

## WeakSet 和 WeakMap

- 弱版本集合的 key 只能是对象, 对于 value 的类型没有限制.
- WeakSet 只能是对象的集合，而不能是任何类型的任意值
- 弱版本集合没有 forEach 方法, 也没有 for in 方法, 也不能用数组来初始化（会报错）.
- 弱版本可用的方法较少. WeakSet 只有 add, has, delete 方法可用;
- WeakMap 只有 set, has, get, delete 方法可用.

根本区别

- 弱版本的集合和它们对应的强版本根本的区别在对于对象的引用的强弱上, 而对象指的是 key 位置的对象, 即以对象为 key 的情况.
