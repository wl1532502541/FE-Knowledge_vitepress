import{_ as t,c as a,an as r,o}from"./chunks/framework.CkyLdKpM.js";const d=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"好文阅读历史/202202.md","filePath":"好文阅读历史/202202.md","lastUpdated":1678807809000}'),n={name:"好文阅读历史/202202.md"};function p(i,e,h,s,l,u){return o(),a("div",null,e[0]||(e[0]=[r('<h2 id="_1-为什么现在我更推荐-pnpm-而不是-npm-yarn" tabindex="-1">1.为什么现在我更推荐 pnpm 而不是 npm/yarn? <a class="header-anchor" href="#_1-为什么现在我更推荐-pnpm-而不是-npm-yarn" aria-label="Permalink to &quot;1.为什么现在我更推荐 pnpm 而不是 npm/yarn?&quot;">​</a></h2><p>它由 npm/yarn 衍生而来，但却解决了 npm/yarn 内部潜在的 bug，并且极大了地优化了性能，扩展了使用场景。</p><p>原文地址：<a href="https://jishuin.proginn.com/p/763bfbd3bcff" target="_blank" rel="noreferrer">https://jishuin.proginn.com/p/763bfbd3bcff</a></p><h2 id="_2-转转智能代码平台神笔马良的研发与实践" tabindex="-1">2.转转智能代码平台神笔马良的研发与实践 <a class="header-anchor" href="#_2-转转智能代码平台神笔马良的研发与实践" aria-label="Permalink to &quot;2.转转智能代码平台神笔马良的研发与实践&quot;">​</a></h2><p>神笔马良相比业界其他的智能代码项目，更看重生成代码的真正可用性和可维护性。我们在结构、样式、命名、组件拆分、节点循环等多个方面进行了独特的思考与探索，本次我将重点为大家分享神笔马良落地实践的案例，同时提供一些前端智能化技术难点的解决思路。</p><p>原文地址：<a href="https://mp.weixin.qq.com/s/IzMTsDT6--V4SyAGoHqT8g" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/IzMTsDT6--V4SyAGoHqT8g</a></p><h2 id="_3-在-2020-年用-rust-写前端什么体验" tabindex="-1">3.在 2020 年用 Rust 写前端什么体验 <a class="header-anchor" href="#_3-在-2020-年用-rust-写前端什么体验" aria-label="Permalink to &quot;3.在 2020 年用 Rust 写前端什么体验&quot;">​</a></h2><p>Rust 语言是一门有趣的语言，在学习 Rust 后我想找点东西实践下，然后就发现了由 Rust 编写可以用 Rust 编写网页的 Yew 框架。由于对 Rust 相关工具链的不熟悉，我感觉自己回到了刚刚接触 React + Webpack 的时候，一脸懵逼，什么都没有头绪的样子。那个时候，我写了个 Todo 应用来帮助自己熟悉工具链，现在当然是继续重复作为菜鸟时做的事情，写一个 Todo 应用来熟悉工具链！</p><p>原文地址：<a href="https://juejin.cn/post/6878143952416374798" target="_blank" rel="noreferrer">https://juejin.cn/post/6878143952416374798</a><br> github 地址：<a href="https://github.com/iheyunfei/yew-todo-demo" target="_blank" rel="noreferrer">https://github.com/iheyunfei/yew-todo-demo</a><br> demo：<a href="https://iheyunfei.github.io/yew-todo-demo/" target="_blank" rel="noreferrer">https://iheyunfei.github.io/yew-todo-demo/</a></p><h2 id="_4-可视化拖拽组件库一些技术要点原理分析" tabindex="-1">4.可视化拖拽组件库一些技术要点原理分析 <a class="header-anchor" href="#_4-可视化拖拽组件库一些技术要点原理分析" aria-label="Permalink to &quot;4.可视化拖拽组件库一些技术要点原理分析&quot;">​</a></h2><p>本文主要对以下技术要点进行分析：</p><p>1.编辑器 2.自定义组件 3.拖拽 4.删除组件、调整图层层级 5.放大缩小 6.撤消、重做 7.组件属性设置 8.吸附 9.预览、保存代码 10.绑定事件 11.绑定动画 12.导入 PSD 13.手机模式</p><p>原文地址：<a href="https://juejin.cn/post/6908502083075325959" target="_blank" rel="noreferrer">https://juejin.cn/post/6908502083075325959</a><br> github：<a href="https://github.com/woai3c/visual-drag-demo" target="_blank" rel="noreferrer">https://github.com/woai3c/visual-drag-demo</a><br> demo：<a href="https://woai3c.github.io/visual-drag-demo/#/" target="_blank" rel="noreferrer">https://woai3c.github.io/visual-drag-demo/#/</a></p><h2 id="_5-深入剖析-http3-协议" tabindex="-1">5.深入剖析 HTTP3 协议 <a class="header-anchor" href="#_5-深入剖析-http3-协议" aria-label="Permalink to &quot;5.深入剖析 HTTP3 协议&quot;">​</a></h2><p>HTTP2 协议虽然大幅提升了 HTTP/1.1 的性能，然而，基于 TCP 实现的 HTTP2 遗留下 3 个问题： 有序字节流引出的 队头阻塞（Head-of-line blocking），使得 HTTP2 的多路复用能力大打折扣； TCP 与 TLS 叠加了握手时延，建链时长还有 1 倍的下降空间； 基于 TCP 四元组确定一个连接，这种诞生于有线网络的设计，并不适合移动状态下的无线网络，这意味着 IP 地址的频繁变动会导致 TCP 连接、TLS 会话反复握手，成本高昂。 HTTP3 协议解决了这些问题： HTTP3 基于 UDP 协议重新定义了连接，在 QUIC 层实现了无序、并发字节流的传输，解决了队头阻塞问题（包括基于 QPACK 解决了动态表的队头阻塞）； HTTP3 重新定义了 TLS 协议加密 QUIC 头部的方式，既提高了网络攻击成本，又降低了建立连接的速度（仅需 1 个 RTT 就可以同时完成建链与密钥协商）； HTTP3 将 Packet、QUIC Frame、HTTP3 Frame 分离，实现了连接迁移功能，降低了 5G 环境下高速移动设备的连接维护成本。</p><p>原文地址：<a href="https://www.taohui.tech/2021/02/04/%E7%BD%91%E7%BB%9C%E5%8D%8F%E8%AE%AE/%E6%B7%B1%E5%85%A5%E5%89%96%E6%9E%90HTTP3%E5%8D%8F%E8%AE%AE/" target="_blank" rel="noreferrer">https://www.taohui.tech/2021/02/04/网络协议/深入剖析HTTP3协议/</a></p><h2 id="_6-译-robin-marx-quic-和-http-3-队头阻塞的细节" tabindex="-1">6.（译）Robin Marx: QUIC 和 HTTP/3 队头阻塞的细节 <a class="header-anchor" href="#_6-译-robin-marx-quic-和-http-3-队头阻塞的细节" aria-label="Permalink to &quot;6.（译）Robin Marx: QUIC 和 HTTP/3 队头阻塞的细节&quot;">​</a></h2><p>目录： 1.什么是队头阻塞？ 2.HTTP/1.1 的队头阻塞 3.HTTP/2（基于 TCP）的队头阻塞 4.HTTP/3（基于 QUIC）的队头阻塞 5.总结与结论 彩蛋内容： 彩蛋：HTTP/1.1 管道 彩蛋：TLS 队头阻塞 彩蛋：传输拥堵控制 彩蛋：多路复用是否重要？</p><p>原文地址：<a href="https://zhuanlan.zhihu.com/p/330300133" target="_blank" rel="noreferrer">https://zhuanlan.zhihu.com/p/330300133</a><br> 英文原文地址：<a href="https://calendar.perfplanet.com/2020/head-of-line-blocking-in-quic-and-http-3-the-details/" target="_blank" rel="noreferrer">https://calendar.perfplanet.com/2020/head-of-line-blocking-in-quic-and-http-3-the-details/</a></p><h2 id="_7-webapi-xmlhttprequest-是怎么实现的" tabindex="-1">7.Webapi：XMLHttpRequest 是怎么实现的 <a class="header-anchor" href="#_7-webapi-xmlhttprequest-是怎么实现的" aria-label="Permalink to &quot;7.Webapi：XMLHttpRequest 是怎么实现的&quot;">​</a></h2><p>对比上一篇文章，setTimeout 是直接将延迟任务添加到延迟队列中，而 XMLHttpRequest 发起请求，是由浏览器的其他进程或者线程去执行，然后再将执行结果利用 IPC 的方式通知渲染进程，之后渲染进程再将对应的消息添加到消息队列中。如果你搞懂了 setTimeout 和 XMLHttpRequest 的工作机制后，再来理解其他 WebAPI 就会轻松很多了，因为大部分 WebAPI 的工作逻辑都是类似的。</p><p><img src="https://s2.loli.net/2022/02/27/CVF9f8Hxgq53Msl.png" alt="image.png"></p><p>原文地址：<a href="https://blog.poetries.top/browser-working-principle/guide/part4/lesson17.html" target="_blank" rel="noreferrer">https://blog.poetries.top/browser-working-principle/guide/part4/lesson17.html</a></p><h2 id="_8-技术周报·2022-年的-css" tabindex="-1">8 技术周报·2022 年的 CSS <a class="header-anchor" href="#_8-技术周报·2022-年的-css" aria-label="Permalink to &quot;8 技术周报·2022 年的 CSS&quot;">​</a></h2><p>原文地址：<a href="https://mp.weixin.qq.com/s/rkPPwZNGqZAlZ_gqC7JSVg" target="_blank" rel="noreferrer">https://mp.weixin.qq.com/s/rkPPwZNGqZAlZ_gqC7JSVg</a></p>',25)]))}const b=t(n,[["render",p]]);export{d as __pageData,b as default};
