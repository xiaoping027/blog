# Promise & async/await 使用

`Promise` 对象用于表示一个异步操作的最终完成 (或失败), 及其结果值.

`Promise` 对象是一个代理对象（代理一个值），被代理的值在 `Promise` 对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（`handlers`）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的 `promise` 对象

一个 `Promise` 有以下几种状态:

- `pending`: 初始状态，既不是成功，也不是失败状态。
- `fulfilled`: 意味着操作成功完成。
- `rejected`: 意味着操作失败。

![img](https://mdn.mozillademos.org/files/8633/promises.png)

```js
function myAsyncFunction(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);
    xhr.onload = () => resolve(xhr.responseText);
    xhr.onerror = () => reject(xhr.statusText);
    xhr.send();
  });
}
```

## 请求

```js
var getData = function(url) {
  var promise = new Promise(function(reslove, reject) {
    var req = new XMLHttpRequest();
    req.open("GET", URL, true);
    req.responseType = "json";
    req.setRequestHeader("Accept", "application/json");
    req.onload = function() {
      if (req.status === 200) {
        resolve(req);
      } else {
        reject(new Error(req.statusText));
      }
    };
    req.onerror = function() {
      reject(new Error(req.statusText));
    };
    req.send();
  });
  return promise;
};

getData.then(res => console.log(res)).catch(err => console.log(err));
```

```js
let promise = new Promise((resolve, reject) => {
  console.log("Promise1");
  resolve();
  console.log("Promise2");
});

promise.then(() => {
  console.log("resolved.");
});

console.log("Hi!");

// Promise1
// Promise2
// Hi!
// resolved
```

## Promise.all

其中的一个请求失败了就会走 `catch`

```js
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, "foo");
});

Promise.all([p1, p2, p3]).then(values => {
  console.log(values); // [3, 1337, "foo"]
});
```

## Promise.allSettled

```js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(reject, 100, "foo")
);
const promises = [promise1, promise2];

Promise.allSettled(promises).then(results =>
  results.forEach(result => console.log(result.status))
);

// expected output:
// "fulfilled"
// "rejected"
```

## Promise.race

返回一个 `promise`，一旦迭代器中的某个 `promise` 解决或拒绝，返回的 `promise` 就会解决或拒绝。

```js
const promise1 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 500, "one");
});

const promise2 = new Promise(function(resolve, reject) {
  setTimeout(resolve, 100, "two");
});

Promise.race([promise1, promise2]).then(function(value) {
  console.log(value);
  // Both resolve, but promise2 is faster
});
// expected output: "two"
```

## async/await

```js
const awaitWrap = promise => {
  return promise.then(data => [null, data]).catch(err => [err, null]);
};
async function use() {
  const [err, data] = await awaitWrap(fetchData());
  console.log("err", err);
  console.log("data", data);
}
```
