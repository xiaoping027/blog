(window.webpackJsonp=window.webpackJsonp||[]).push([[132],{333:function(e,a,o){"use strict";o.r(a);var r=o(10),t=Object(r.a)({},(function(){var e=this,a=e.$createElement,o=e._self._c||a;return o("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[o("h1",{attrs:{id:"webpack-devtool-说明"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#webpack-devtool-说明"}},[e._v("#")]),e._v(" webpack devtool 说明")]),e._v(" "),o("p",[e._v("此选项控制是否生成，以及如何生成 source map")]),e._v(" "),o("p",[o("img",{attrs:{src:"https://raw.githubusercontent.com/xiaoping027/imgroom/master/20200110221457.png",alt:"devtool"}})]),e._v(" "),o("h2",{attrs:{id:"开发环境"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#开发环境"}},[e._v("#")]),e._v(" 开发环境")]),e._v(" "),o("ul",[o("li",[o("p",[e._v("eval 每个模块都使用 eval() 执行，并且都有 //@ sourceURL。此选项会非常快地构建。主要缺点是，由于会映射到转换后的代码，而不是映射到原始代码（没有从 loader 中获取 source map），所以不能正确的显示行数。")])]),e._v(" "),o("li",[o("p",[e._v("eval-source-map - 每个模块使用 eval() 执行，并且 source map 转换为 DataUrl 后添加到 eval() 中。初始化 source map 时比较慢，但是会在重新构建时提供比较快的速度，并且生成实际的文件。行数能够正确映射，因为会映射到原始代码中。它会生成用于开发环境的最佳品质的 source map。")])]),e._v(" "),o("li",[o("p",[e._v('cheap-eval-source-map - 类似 eval-source-map，每个模块使用 eval() 执行。这是 "cheap(低开销)" 的 source map，因为它没有生成列映射(column mapping)，只是映射行数。它会忽略源自 loader 的 source map，并且仅显示转译后的代码，就像 eval devtool')])]),e._v(" "),o("li",[o("p",[e._v("heap-module-eval-source-map - 类似 cheap-eval-source-map，并且，在这种情况下，源自 loader 的 source map 会得到更好的处理结果。然而，loader source map 会被简化为每行一个映射(mapping)。")])])]),e._v(" "),o("h2",{attrs:{id:"生产环境"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#生产环境"}},[e._v("#")]),e._v(" 生产环境")]),e._v(" "),o("ul",[o("li",[o("p",[e._v("(none)（省略 devtool 选项） - 不生成 source map。这是一个不错的选择。")])]),e._v(" "),o("li",[o("p",[e._v("source-map - 整个 source map 作为一个单独的文件生成。它为 bundle 添加了一个引用注释，以便开发工具知道在哪里可以找到它。")])]),e._v(" "),o("li",[o("p",[e._v("hidden-source-map - 与 source-map 相同，但不会为 bundle 添加引用注释。如果你只想 source map 映射那些源自错误报告的错误堆栈跟踪信息，但不想为浏览器开发工具暴露你的 source map，这个选项会很有用")])]),e._v(" "),o("li",[o("p",[e._v("nosources-source-map - 创建的 source map 不包含 sourcesContent(源代码内容)。它可以用来映射客户端上的堆栈跟踪，而无须暴露所有的源代码。你可以将 source map 文件部署到 web 服务器。")])])]),e._v(" "),o("blockquote",[o("p",[o("a",{attrs:{href:"http://cheng.logdown.com/posts/2016/03/25/679045",target:"_blank",rel:"noopener noreferrer"}},[e._v("http://cheng.logdown.com/posts/2016/03/25/679045"),o("OutboundLink")],1)])])])}),[],!1,null,null,null);a.default=t.exports}}]);