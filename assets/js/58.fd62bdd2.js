(window.webpackJsonp=window.webpackJsonp||[]).push([[58],{262:function(t,e,s){"use strict";s.r(e);var r=s(10),a=Object(r.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"redux-源码介绍-index-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#redux-源码介绍-index-js"}},[t._v("#")]),t._v(" Redux 源码介绍 - index.js")]),t._v(" "),s("blockquote",[s("p",[s("a",{attrs:{href:"https://github.com/reduxjs/redux",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://github.com/reduxjs/redux"),s("OutboundLink")],1)]),t._v(" "),s("p",[s("a",{attrs:{href:"https://cn.redux.js.org/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://cn.redux.js.org/"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("开始看源码前，先过一遍文档。 建议"),s("code",[t._v("npm install redux")]),t._v("，查看"),s("code",[t._v("node_modules/redux/src")]),t._v(".")]),t._v(" "),s("h2",{attrs:{id:"index-js"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#index-js"}},[t._v("#")]),t._v(" index.js")]),t._v(" "),s("div",{staticClass:"language-js extra-class"},[s("pre",{pre:!0,attrs:{class:"language-js"}},[s("code",[s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" createStore "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./createStore"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" combineReducers "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./combineReducers"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" bindActionCreators "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./bindActionCreators"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" applyMiddleware "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./applyMiddleware"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" compose "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./compose"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("import")]),t._v(" __DO_NOT_USE__ActionTypes "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("from")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"./utils/actionTypes"')]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("isCrushed")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//忽略")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("export")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n  createStore"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  combineReducers"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  bindActionCreators"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  applyMiddleware"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  compose"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v("\n  __DO_NOT_USE__ActionTypes "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//不要使用")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("h2",{attrs:{id:"createstores"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#createstores"}},[t._v("#")]),t._v(" createStores")]),t._v(" "),s("p",[t._v("创建一个 "),s("code",[t._v("Redux store")]),t._v(" 来以存放应用中所有的 "),s("code",[t._v("state")]),t._v("。应用中应有且仅有一个 "),s("code",[t._v("store")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"combinereducers"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#combinereducers"}},[t._v("#")]),t._v(" combineReducers")]),t._v(" "),s("p",[t._v("随着应用变得越来越复杂，可以考虑将 "),s("code",[t._v("reducer")]),t._v(" 函数拆分成多个单独的函数，拆分后的每个函数负责独立管理 "),s("code",[t._v("state")]),t._v(" 的一部分。")]),t._v(" "),s("p",[s("code",[t._v("combineReducers")]),t._v(" 辅助函数的作用是，把一个由多个不同 "),s("code",[t._v("reducer")]),t._v(" 函数作为 "),s("code",[t._v("value")]),t._v(" 的 "),s("code",[t._v("object")]),t._v("，合并成一个最终的 "),s("code",[t._v("reducer")]),t._v(" 函数，然后就可以对这个 "),s("code",[t._v("reducer")]),t._v(" 调用 "),s("code",[t._v("createStore")]),t._v(" 方法")]),t._v(" "),s("h2",{attrs:{id:"applymiddleware"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#applymiddleware"}},[t._v("#")]),t._v(" applyMiddleware")]),t._v(" "),s("p",[s("code",[t._v("applyMiddleware")]),t._v(" 最常见的使用场景是无需引用大量代码或依赖类似 "),s("code",[t._v("Rx")]),t._v(" 的第三方库实现异步 "),s("code",[t._v("actions")]),t._v("。这种方式可以让你像 "),s("code",[t._v("dispatch")]),t._v(" 一般的 "),s("code",[t._v("actions")]),t._v(" 那样 "),s("code",[t._v("dispatch")]),t._v(" 异步 "),s("code",[t._v("actions")]),t._v("。")]),t._v(" "),s("h2",{attrs:{id:"bindactioncreators"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bindactioncreators"}},[t._v("#")]),t._v(" bindActionCreators")]),t._v(" "),s("p",[t._v("实现了在没有 "),s("code",[t._v("store")]),t._v(" 和 "),s("code",[t._v("dispatch")]),t._v(" 的组件中调用 "),s("code",[t._v("dispatch（action）")])]),t._v(" "),s("p",[t._v("用法例子")]),t._v(" "),s("blockquote",[s("p",[s("a",{attrs:{href:"https://cn.redux.js.org/docs/api/bindActionCreators.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://cn.redux.js.org/docs/api/bindActionCreators.html"),s("OutboundLink")],1)])]),t._v(" "),s("h2",{attrs:{id:"compose"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#compose"}},[t._v("#")]),t._v(" compose")]),t._v(" "),s("p",[t._v("从右到左来组合多个函数。")]),t._v(" "),s("p",[t._v("这是函数式编程中的方法，为了方便，被放到了 "),s("code",[t._v("Redux")]),t._v(" 里。\n当需要把多个 "),s("code",[t._v("store")]),t._v(" 增强器 依次执行的时候，需要用到它。")])])}),[],!1,null,null,null);e.default=a.exports}}]);