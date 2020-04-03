# React-Redux Subscription

## Subscription

```js
export default class Subscription {
  constructor(store, parentSub) {
    // redux store
    this.store = store;
    // 订阅内容

    this.parentSub = parentSub;

    this.unsubscribe = null;

    // 订阅记录数组
    this.listeners = nullListeners;

    this.handleChangeWrapper = this.handleChangeWrapper.bind(this);
  }

  addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  }

  notifyNestedSubs() {
    this.listeners.notify();
  }

  handleChangeWrapper() {
    // 订阅内容变更后的回调函数
    if (this.onStateChange) {
      this.onStateChange();
    }
  }

  isSubscribed() {
    return Boolean(this.unsubscribe);
  }

  // 订阅
  trySubscribe() {
    // 若传递了发布订阅器则使用该订阅器订阅方法进行订阅
    // 否则使用store的订阅方法
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub
        ? this.parentSub.addNestedSub(this.handleChangeWrapper)
        : this.store.subscribe(this.handleChangeWrapper);
      // 创建订阅集合对象
      // { clear:function; get:{};notify: function, subscribe: function  }
      // 内部包装了一个发布订阅器；
      // 分别对应发布（执行所有回调），订阅(在订阅集合中添加回调)
      this.listeners = createListenerCollection();
    }
  }
  // 取消订阅
  tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  }
}
```
