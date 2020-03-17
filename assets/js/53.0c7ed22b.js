(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{257:function(t,a,s){"use strict";s.r(a);var n=s(10),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"react-组件更新"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#react-组件更新"}},[t._v("#")]),t._v(" React-组件更新")]),t._v(" "),s("p",[t._v("当组件被装载到 "),s("code",[t._v("DOM")]),t._v(" 树上之后，用户在网页上可以看到组件的第一印象，但是要提供更好的交互体验，就要让该组件可以随着用户操作改变展现的内容，当 "),s("code",[t._v("props")]),t._v(" 或者 "),s("code",[t._v("state")]),t._v(" 被修改的时候,以及执行 "),s("code",[t._v("this.forceUpdate()")]),t._v("，就会引发组件的更新过程。更新过程会依次调用下面的生命周期函数，其中 "),s("code",[t._v("render")]),t._v(" 函数和装载过程一样，没有差别。")]),t._v(" "),s("h2",{attrs:{id:"生命周期"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生命周期"}},[t._v("#")]),t._v(" 生命周期")]),t._v(" "),s("h3",{attrs:{id:"static-getderivedstatefromprops"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#static-getderivedstatefromprops"}},[t._v("#")]),t._v(" static getDerivedStateFromProps()")]),t._v(" "),s("p",[t._v("在调用 "),s("code",[t._v("render")]),t._v(" 方法之前调用，并且在初始挂载及后续更新时都会被调用。它应返回一个对象来更新 state，如果返回 null 则不更新任何内容。")]),t._v(" "),s("p",[t._v("唯一作用：让组件在 "),s("code",[t._v("props")]),t._v(" 变化时更新 "),s("code",[t._v("state")]),t._v("。")]),t._v(" "),s("ul",[s("li",[t._v("1.直接复制 props 到 state 上；")]),t._v(" "),s("li",[t._v("2.如果 props 和 state 不一致就更新 state")])]),t._v(" "),s("blockquote",[s("p",[s("a",{attrs:{href:"https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://zh-hans.reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html#when-to-use-derived-state"),s("OutboundLink")],1)])]),t._v(" "),s("h3",{attrs:{id:"shouldcomponentupdate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#shouldcomponentupdate"}},[t._v("#")]),t._v(" shouldComponentUpdate()")]),t._v(" "),s("p",[t._v("当 "),s("code",[t._v("props")]),t._v(" 或 "),s("code",[t._v("state")]),t._v(" 发生变化时，"),s("code",[t._v("shouldComponentUpdate()")]),t._v(" 会在渲染执行之前被调用。返回值默认为 "),s("code",[t._v("true")]),t._v(" 。首次渲染或使用 "),s("code",[t._v("forceUpdate()")]),t._v(" 时不会调用该方法。")]),t._v(" "),s("h3",{attrs:{id:"render"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#render"}},[t._v("#")]),t._v(" render()")]),t._v(" "),s("p",[s("code",[t._v("render()")]),t._v(" 函数应该为纯函数，这意味着在不修改组件 "),s("code",[t._v("state")]),t._v(" 的情况下，每次调用时都返回相同的结果，并且它不会直接与浏览器交互。")]),t._v(" "),s("h3",{attrs:{id:"getsnapshotbeforeupdate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#getsnapshotbeforeupdate"}},[t._v("#")]),t._v(" getSnapshotBeforeUpdate()")]),t._v(" "),s("p",[t._v("在最近一次渲染输出（提交到 "),s("code",[t._v("DOM")]),t._v(" 节点）之前调用。它使得组件能在发生更改之前从 "),s("code",[t._v("DOM")]),t._v(" 中捕获一些信息（例如，滚动位置）.")]),t._v(" "),s("p",[t._v("此生命周期的任何返回值将作为参数传递给 "),s("code",[t._v("componentDidUpdate()")]),t._v("。")]),t._v(" "),s("h3",{attrs:{id:"componentdidupdate"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#componentdidupdate"}},[t._v("#")]),t._v(" componentDidUpdate()")]),t._v(" "),s("p",[s("code",[t._v("componentDidUpdate()")]),t._v(" 会在更新后会被立即调用。首次渲染不会执行此方法")]),t._v(" "),s("p",[t._v("可以在 "),s("code",[t._v("componentDidUpdate()")]),t._v(" 中直接调用 "),s("code",[t._v("setState()")]),t._v("，但请注意它必须被包裹在一个条件语句里.")]),t._v(" "),s("h2",{attrs:{id:"setstate-过程"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#setstate-过程"}},[t._v("#")]),t._v(" setState 过程")]),t._v(" "),s("ul",[s("li",[s("p",[s("code",[t._v("setState")]),t._v(" 不会立刻改变 "),s("code",[t._v("React")]),t._v(" 组件中 "),s("code",[t._v("state")]),t._v(" 的值")])]),t._v(" "),s("li",[s("p",[s("code",[t._v("setState")]),t._v(" 通过引发一次组件的更新过程来引发重新绘制")])]),t._v(" "),s("li",[s("p",[t._v("多次 "),s("code",[t._v("setState")]),t._v(" 函数调用产生的效果会合并。")])]),t._v(" "),s("li",[s("p",[s("code",[t._v("setState")]),t._v(" 只在合成事件和钩子函数中是“异步”的，在"),s("code",[t._v("原生事件")]),t._v("和 "),s("code",[t._v("setTimeout")]),t._v(" 中都是同步的。")])]),t._v(" "),s("li",[s("p",[s("code",[t._v("setState")]),t._v(" 的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”，当然可以通过第二个参数 "),s("code",[t._v("setState")]),t._v("(partialState, callback) 中的 "),s("code",[t._v("callback")]),t._v(" 拿到更新后的结果。")])]),t._v(" "),s("li",[s("p",[s("code",[t._v("setState")]),t._v(" 的批量更新优化也是建立在“异步”（合成事件、钩子函数）之上的，在原生事件和 "),s("code",[t._v("setTimeout")]),t._v(" 中不会批量更新，在“异步”中如果对同一个值进行多次 "),s("code",[t._v("setState")]),t._v(" ， "),s("code",[t._v("setState")]),t._v(" 的批量更新策略会对其进行覆盖，取最后一次的执行，如果是同时 "),s("code",[t._v("setState")]),t._v(" 多个不同的值，在更新时会对其进行合并批量更新。")])])]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token class-name"}},[t._v("ReactComponent")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("prototype"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function-variable function"}},[t._v("setState")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("partialState"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//  将setState事务放进队列中")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("updater"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueSetState")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" partialState"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("updater"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueCallback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("this")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"setState"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("在当前节点对应的 "),s("code",[t._v("Fiber")]),t._v(" 对象上创建了 Update 之后，进就如 "),s("code",[t._v("scheduleWork")]),t._v(" 调度阶段。")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" classComponentUpdater "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// isMounted")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueSetState")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("inst"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fiber "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ReactInstanceMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("inst"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" currentTime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestCurrentTime")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" expirationTime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("computeExpirationForFiber")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("currentTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" update "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expirationTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("payload "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" payload"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scheduleWork")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" expirationTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("// replaceState")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueForceUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token parameter"}},[t._v("inst"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" callback")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" fiber "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ReactInstanceMap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("get")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("inst"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" currentTime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestCurrentTime")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" expirationTime "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("computeExpirationForFiber")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("currentTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("const")]),t._v(" update "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("createUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("expirationTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("tag "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" ForceUpdate"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("undefined")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("&&")]),t._v(" callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("!==")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("null")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n      update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("callback "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" callback"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("enqueueUpdate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" update"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("scheduleWork")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("fiber"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" expirationTime"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);