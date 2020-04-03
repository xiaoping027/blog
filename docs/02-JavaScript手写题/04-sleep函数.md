# 实现一个 sleep 函数

## Promise 实现

```js
const sleep = wait => {
  const sleepTime = new Promise(reslove => setTimeout(reslove, wait * 1000));
};
sleep(1000).then(() => {
  // 这里写你的骚操作
});

async function sleepAsync() {
  console.log("fuck the code");
  await sleep(1000);
  console.log("fuck the code again");
}
```

## generator

```js
function* sleep3(time) {
  yield new Promise(resolve => {
    setTimeout(resolve, time);
  });
}

sleep3(5000)
  .next()
  .value.then(() => {
    console.log("睡了一会儿，然后做你做的事情");
  });
```

## callback

```js
function sleep4(func, time) {
  setTimeout(func, time);
}
```
