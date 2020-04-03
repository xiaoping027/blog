# axios 源码浅析

## 介绍

- 从浏览器中创建 XMLHttpRequests
- 从 node.js 创建 http 请求
- 支持 Promise API
- 拦截请求和响应
- 转换请求数据和响应数据
- 取消请求
- 自动转换 JSON 数据
- 客户端支持防御 XSRF

### 目录结构

```js
.
├── adapters                  # 定义请求的适配器 xhr、http
│ ├── README.md
│ ├── http.js                 # http 适配器
│ └── xhr.js                  # xhr 适配器
├── axios.js                  # export 接口
├── cancel                    # 取消功能
│ ├── Cancel.js
│ ├── CancelToken.js
│ └── isCancel.js
├── core                      # 核心
│ ├── Axios.js
│ ├── InterceptorManager.js   # 拦截器
│ ├── README.md
│ ├── buildFullPath.js        # 通过将baseURL与请求的URL组合来创建新的URL
│ ├── createError.js          # 使用指定的消息，配置，错误代码，请求和响应来创建错误
│ ├── dispatchRequest.js      # 使用配置的适配器向服务器发送请求。
│ ├── enhanceError.js         # 使用指定的配置，错误代码和响应更新错误
│ ├── mergeConfig.js           # 合并config
│ ├── settle.js               # 根据http响应状态，改变Promise的状态
│ └── transformData.js        # 转换数据
├── defaults.js               # 默认配置
├── helpers                   # 辅助函数
│ ├── README.md
│ ├── bind.js                 # bind this
│ ├── buildURL.js             # 通过在末尾附加参数来构建URL
│ ├── combineURLs.js          # 通过组合指定的URL创建新的UR
│ ├── cookies.js              # 标准浏览器环境和非标砖浏览器环境
│ ├── deprecatedMethod.js     # 已经废弃的方法 提供警告
│ ├── isAbsoluteURL.js        # 是否是绝对路径
│ ├── isURLSameOrigin.js      # 是否同源
│ ├── isValidXss.js           # 阻止xss
│ ├── normalizeHeaderName.js  # 支持url search params
│ ├── parseHeaders.js         # 格式化 heaeder
│ └── spread.js               # 改变this指向
└── utils.js                  # 工具函数
```

### axios export

```js
// 创建一个Axios实例
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // 将axios.prototype复制到实例
  utils.extend(instance, Axios.prototype, context);

  // 复制 context 到实例
  utils.extend(instance, context);

  return instance;
}
//创建要导出的默认实例
var axios = createInstance(defaults);

axios.Axios = Axios;

// 工厂模式创造实例
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// 为 axios 实例化的对象增加不同的方法。
axios.create = function create(instanceConfig) {
axios.Cancel = require("./cancel/Cancel");
axios.CancelToken = require("./cancel/CancelToken");
axios.isCancel = require("./cancel/isCancel");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require("./helpers/spread");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;
```

## 工具函数

```js
module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};
```

### 判断类型

- isArray
- isArrayBuffer
- isDate
- isFile
- isBlob

```js
var toString = Object.prototype.toString;
```

通过原型链判断，

```js
function isArray(val) {
  return toString.call(val) === "[object Array]";
}
```

其他类似

> typeof 能够正确的判断基本数据类型，但是除了 null, typeof null 输出的是对象
>
> instanceof 是通过原型链判断的，A instanceof B, 在 A 的原型链中层层查找，是否有原型等于 B.prototype，如果一直找到 A 的原型链的顶端(null;即 Object.prototype.**proto**),仍然不等于 B.prototype，那么返回 false，否则返回 true. instanceof 只能用来判断两个对象是否属于实例关系， 而不能判断一个对象实例具体属于哪种类型
>
> constructor 当一个函数 F 被定义时，JS 引擎会为 F 添加 prototype 原型，然后再在 prototype 上添加一个 constructor 属性，并让其指向 F 的引用
>
> toString() 是 Object 的原型方法，调用该方法，默认返回当前对象的 [[Class]] 。这是一个内部属性，其格式为 [object Xxx] ，其中 Xxx 就是对象的类型。对于 Object 对象，直接调用 toString() 就能返回 [object Object] 。而对于其他对象，则需要通过 call / apply 来调用才能返回正确的类型信息

```js
Object.prototype.toString.call(""); // [object String]
Object.prototype.toString.call(1); // [object Number]
Object.prototype.toString.call(true); // [object Boolean]
Object.prototype.toString.call(Symbol()); //[object Symbol]
Object.prototype.toString.call(undefined); // [object Undefined]
Object.prototype.toString.call(null); // [object Null]
Object.prototype.toString.call(newFunction()); // [object Function]
Object.prototype.toString.call(newDate()); // [object Date]
Object.prototype.toString.call([]); // [object Array]
Object.prototype.toString.call(newRegExp()); // [object RegExp]
Object.prototype.toString.call(newError()); // [object Error]
Object.prototype.toString.call(document); // [object HTMLDocument]
Object.prototype.toString.call(window); //[object global] window 是全局对象 global 的引用
```

- isUndefined
- isFormData
- isNumber
- isObject
- isURLSearchParams

这几种判断类型的方法基本上就是借助 `typeof`实现,`object`需要注意

```js
function isObject(val) {
  return val !== null && typeof val === "object";
}
```

### forEach

遍历数组或对象，为每个项目调用一个函数。如果`obj`是一个数组回调，则称为传递

每个项目的值，索引和完整数组。如果`obj`是一个对象回调，则称为传递
每个属性的值，键和完整对象。

```js
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === "undefined") {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== "object") {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}
```

### merge&deepMerge

接受期望每个参数都是对象的 varargs，然后
不变地合并每个对象的属性并返回结果。

当多个对象包含相同的键时，后面的对象参数列表优先。

```js
//  var result = merge({foo: 123}, {foo: 456});
//  * console.log(result.foo); // outputs 456
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
```

功能等同于合并,保留原始对象。

```js
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === "object" && typeof val === "object") {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === "object") {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}
```

### extend

通过可变地添加对象 b 的属性来扩展对象 a

```js
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === "function") {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}
```

## 使用方法

### axios(config)

```js
// 发送 POST 请求
axios({
  method: "post",
  url: "/user/12345",
  data: {
    firstName: "Fred",
    lastName: "Flintstone"
  }
});
```

### axios(url[, config])

```js
// 发送 GET 请求（默认的方法）
axios("/user/12345");
```

### axios.request(config)

```js
axios.request({
  url,
  method,
  headers
});
```

### axios.get(url[, config])

（对于 get、delete 等方法）

```js
axios.get(url, {
  headers
});
```

### axios.post(url[, data[, config]])

```js
axios.post(url, data, {
  headers
});
```

### 源码分析

```js
function createInstance(defaultConfig) {
  // 创建一个Axios实例
  var context = new Axios(defaultConfig);

  // 以下代码也可以这样实现：var instance = Axios.prototype.request.bind(context);
  // 这样instance就指向了request方法，且上下文指向context，所以可以直接以 instance(option) 方式调用
  // Axios.prototype.request 内对第一个参数的数据类型判断，使我们能够以 instance(url, option) 方式调用
  var instance = bind(Axios.prototype.request, context);

  // 把Axios.prototype上的方法扩展到instance对象上，
  // 这样 instance 就有了 get、post、put等方法
  // 并指定上下文为context，这样执行Axios原型链上的方法时，this会指向context
  utils.extend(instance, Axios.prototype, context);

  // 把context对象上的自身属性和方法扩展到instance上
  // 注：因为extend内部使用的forEach方法对对象做for in 遍历时，只遍历对象本身的属性，而不会遍历原型链上的属性
  // 这样，instance 就有了  defaults、interceptors 属性。（这两个属性后面我们会介绍）
  utils.extend(instance, context);

  return instance;
}

// 接收默认配置项作为参数（后面会介绍配置项），创建一个Axios实例，最终会被作为对象导出
var axios = createInstance(defaults);
```

```js
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === "string") {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = "get";
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(
    interceptor
  ) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(
    interceptor
  ) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(
  ["delete", "get", "head", "options"],
  function forEachMethodNoData(method) {
    /*eslint func-names:0*/
    Axios.prototype[method] = function(url, config) {
      return this.request(
        utils.merge(config || {}, {
          method: method,
          url: url
        })
      );
    };
  }
);

utils.forEach(["post", "put", "patch"], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(
      utils.merge(config || {}, {
        method: method,
        url: url,
        data: data
      })
    );
  };
});
```

`utils.forEach`，`utils.merge`遍历，合并配置就可以以多种方式发起 `http` 请求了: `axios()、axios.get()、axios.post()`

低到高是： —> 默认配置对象
`defaults（/lib/defaults.js) —> { method: 'get' } —> Axios 实例属性 this.defaults —> request 请求的参数 config`

## axios 拦截器

每个 `axios` 实例都有一个 `interceptors` 实例属性， `interceptors` 对象上有两个属性 `request、response`

```js
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}
```

### InterceptorManager

存放拦截器方法，数组内每一项都是有两个属性的对象，两个属性分别对应成功和失败后执行的函数

```js
function InterceptorManager() {
  this.handlers = [];
}

// 往拦截器里添加拦截方法
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};
// 用来注销指定的拦截器
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};
//  遍历this.handlers，并将this.handlers里的每一项作为参数传给fn执行
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};
```

### 拦截过程

`Axios.js`

```js
var chain = [dispatchRequest, undefined];
//  初始化一个promise对象，状态为resolved，接收到的参数为config对象
var promise = Promise.resolve(config);

//  注意：interceptor.fulfilled 或 interceptor.rejected 是可能为undefined
this.interceptors.request.forEach(function unshiftRequestInterceptors(
  interceptor
) {
  chain.unshift(interceptor.fulfilled, interceptor.rejected);
});

// 添加了拦截器后的chain数组大概会是这样的：
// [
//   requestFulfilledFn, requestRejectedFn, ...,
//   dispatchRequest, undefined,
//   responseFulfilledFn, responseRejectedFn, ....,
// ]

this.interceptors.response.forEach(function pushResponseInterceptors(
  interceptor
) {
  chain.push(interceptor.fulfilled, interceptor.rejected);
});

// 只要chain数组长度不为0，就一直执行while循环
while (chain.length) {
  // 数组的 shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
  // 每次执行while循环，从chain数组里按序取出两项，并分别作为promise.then方法的第一个和第二个参数

  // 按照我们使用InterceptorManager.prototype.use添加拦截器的规则，
  // 正好每次添加的就是我们通过InterceptorManager.prototype.use方法添加的成功和失败回调

  // 通过InterceptorManager.prototype.use往拦截器数组里添加拦截器时使用的数组的push方法，
  // 对于请求拦截器:
  // 从拦截器数组按序读到后是通过unshift方法往chain数组数里添加的，又通过shift方法从chain数组里取出的，
  // 所以得出结论：对于请求拦截器，先添加的拦截器会后执行
  // 对于响应拦截器:
  // 从拦截器数组按序读到后是通过push方法往chain数组里添加的，又通过shift方法从chain数组里取出的，
  // 所以得出结论：对于响应拦截器，添加的拦截器先执行

  // 第一个请求拦截器的fulfilled函数会接收到promise对象初始化时传入的config对象，
  // 而请求拦截器又规定用户写的fulfilled函数必须返回一个config对象，
  // 所以通过promise实现链式调用时，每个请求拦截器的fulfilled函数都会接收到一个config对象

  // 第一个响应拦截器的fulfilled函数会接受到dispatchRequest（也就是我们的请求方法）请求到的数据（也就是response对象）,
  // 而响应拦截器又规定用户写的fulfilled函数必须返回一个response对象，
  // 所以通过promise实现链式调用时，每个响应拦截器的fulfilled函数都会接收到一个response对象

  // 任何一个拦截器的抛出的错误，都会被下一个拦截器的rejected函数收到，
  // 所以dispatchRequest抛出的错误才会被响应拦截器接收到。

  // 因为axios是通过promise实现的链式调用，所以我们可以在拦截器里进行异步操作，
  // 而拦截器的执行顺序还是会按照我们上面说的顺序执行，
  // 也就是 dispatchRequest 方法一定会等待所有的请求拦截器执行完后再开始执行，
  // 响应拦截器一定会等待 dispatchRequest 执行完后再开始执行。

  promise = promise.then(chain.shift(), chain.shift());
}

return promise;
```

## 取消请求

### 用法

```js
const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get("/user/12345", {
    cancelToken: source.token
  })
  .catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      // 处理错误
    }
  });

axios.post(
  "/user/12345",
  {
    name: "new name"
  },
  {
    cancelToken: source.token
  }
);

// 取消请求（message 参数是可选的）
```

还可以通过传递一个 executor 函数到 CancelToken 的构造函数来创建 cancel token：

```js
const CancelToken = axios.CancelToken;
let cancel;

axios.get("/user/12345", {
  cancelToken: new CancelToken(function executor(c) {
    // executor 函数接收一个 cancel 函数作为参数
    cancel = c;
  })
});

// cancel the request
cancel();
```

### CancelToken

```js
// “CancelToken”是可用于请求取消操作的对象

function CancelToken(executor) {
  if (typeof executor !== "function") {
    throw new TypeError("executor must be a function.");
  }

  var resolvePromise;
  // 取消核心
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

// 如果请求取消，则抛出“取消”。
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

// 返回一个对象，该对象包含一个新的“ CancelToken”和一个函数，该函数在被调用时，
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};
```

```js
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return "Cancel" + (this.message ? ": " + this.message : "");
};

Cancel.prototype.__CANCEL__ = true;
```
