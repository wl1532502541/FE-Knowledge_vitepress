import{_ as e,c as i,an as l,o as r}from"./chunks/framework.CkyLdKpM.js";const b=JSON.parse('{"title":"移动端体验优化","description":"","frontmatter":{},"headers":[],"relativePath":"移动端/体验优化.md","filePath":"移动端/体验优化.md","lastUpdated":1693156821000}'),t={name:"移动端/体验优化.md"};function o(h,a,n,d,u,s){return r(),i("div",null,a[0]||(a[0]=[l('<h1 id="移动端体验优化" tabindex="-1">移动端体验优化 <a class="header-anchor" href="#移动端体验优化" aria-label="Permalink to &quot;移动端体验优化&quot;">​</a></h1><h2 id="序" tabindex="-1">序 <a class="header-anchor" href="#序" aria-label="Permalink to &quot;序&quot;">​</a></h2><p>当技术已不再是产品核心竞争力时，产品竞争的实质就是用户体验之争。</p><p>考虑到市面上绝大多数 APP 都是 Native+H5 相结合的应用，因此将从 Native 端和 H5 端分别总结如何优化体验。</p><h2 id="native-端体验优化" tabindex="-1">Native 端体验优化 <a class="header-anchor" href="#native-端体验优化" aria-label="Permalink to &quot;Native 端体验优化&quot;">​</a></h2><p>评判标准</p><ul><li>启动速度要快</li><li>交互流畅不卡顿</li><li>有离线缓存</li><li>支持弱网环境</li><li>友好的用户提示</li></ul><p>作为技术人需要重点把控的是前 4 点，第 5 点可能更多需要设计同学介入。</p><h3 id="内存优化" tabindex="-1">内存优化 <a class="header-anchor" href="#内存优化" aria-label="Permalink to &quot;内存优化&quot;">​</a></h3><ul><li>系统对 APP 内存占用有限制（具体大小依不同手机厂商而异）</li><li>避免大量的内存泄露，可以使用 leakcanary 进行自动检测，若要深入分析，可以使用 Android Studio 手动 dump 内存下来用 MAT 工具进行分析，发现其中潜在的内存泄露对象。</li><li>尽量使用成熟的图片开源框架，如 Glide 或者 Picasso 等展示图片或者 Gif。</li><li>避免内存抖动，原因一般是大量频繁的创建对象，导致频繁触发 GC，以致于 APP 使用卡顿，比如常见的场景是在自定义控件的 onDraw 方法创建对象，因为 onDraw 方法会频繁调用，在 onDraw 方法中创建大对象会导致内存急剧增长，触发 GC 导致卡顿。因此要尽量避免在循环体中创建对象，可以考虑使用对象池一次创建多处复用来规避内存抖动。</li></ul><h3 id="ui-渲染优化" tabindex="-1">UI 渲染优化 <a class="header-anchor" href="#ui-渲染优化" aria-label="Permalink to &quot;UI 渲染优化&quot;">​</a></h3><ul><li>UI 渲染性能关系到 APP 的流畅度</li><li>16ms 内未能完成一次绘制就会出现掉帧，给人感觉就是页面卡顿</li></ul><h4 id="布局不合理" tabindex="-1">布局不合理 <a class="header-anchor" href="#布局不合理" aria-label="Permalink to &quot;布局不合理&quot;">​</a></h4><ul><li>避免不必要嵌套，使用 Hierarchy View 进行辅助查看布局层级关系，来识别嵌套是否合理；</li><li>同时要根据具体场景合理使用哪一种布局，如 RelativeLayout 不能滥用，对于复杂布局可以用 ConstaintLayout 代替；</li><li>此外还可以使用 viewstub 进行延迟加载布局，用 merge 和 include 进行布局复用。</li></ul><h4 id="过度绘制-overdraw" tabindex="-1">过度绘制（overdraw） <a class="header-anchor" href="#过度绘制-overdraw" aria-label="Permalink to &quot;过度绘制（overdraw）&quot;">​</a></h4><ul><li>比如不可见的层叠部分设置了背景色，浪费计算资源。</li><li>简单方法识别过度绘制是否严重：在 Android 系统中开发主菜单里面打开「调试 GPU 过度绘制」开关就能看到界面 UI 元素被不同的颜色块标注。颜色从原色——蓝色——绿色——粉色——红色依次代表过度绘制严重程度从低到高，一般而言需要关心红色的色块 UI 元素，因为它有严重的过度绘制，是有优化空间的。</li></ul><h4 id="主线程有复杂耗时任务" tabindex="-1">主线程有复杂耗时任务 <a class="header-anchor" href="#主线程有复杂耗时任务" aria-label="Permalink to &quot;主线程有复杂耗时任务&quot;">​</a></h4><ul><li>主线程（UI 线程）不能有复杂耗时的计算任务，否则会导致 UI 无响应，卡顿，最终导致 ANR 的发生。</li></ul><h3 id="网络优化" tabindex="-1">网络优化 <a class="header-anchor" href="#网络优化" aria-label="Permalink to &quot;网络优化&quot;">​</a></h3><ul><li>保证接口设计的合理性，必要时合并网络请求，减少请求次数；</li><li>网络缓存，针对服务端返回的数据设置有效时间，在有效时间内不走网络请求，减少流量消耗，可以按照自己业务的特性自定义缓存的实现。在弱网或者是无网络的情况下，因为有缓存的支持，不至于 APP 打开一片空白，这给用户更好的体验。</li><li>数据压缩，如 Gzip 压缩 request 和 response，减少网络流量传输。</li></ul><h3 id="启动优化" tabindex="-1">启动优化 <a class="header-anchor" href="#启动优化" aria-label="Permalink to &quot;启动优化&quot;">​</a></h3><ul><li>最主要的思路避免把全部的初始化任务放在 Application 中，可以使用子线程或者懒加载的方式来处理初始化任务；</li><li>另外常规套路是会给第一个 Activity 设置 theme，这样打开 APP 瞬间看到不是白屏，给用户的感觉就是启动速度得到改善。</li></ul><h2 id="h5-页面加速优化" tabindex="-1">H5 页面加速优化 <a class="header-anchor" href="#h5-页面加速优化" aria-label="Permalink to &quot;H5 页面加速优化&quot;">​</a></h2><h3 id="页面启动白屏时间" tabindex="-1">页面启动白屏时间 <a class="header-anchor" href="#页面启动白屏时间" aria-label="Permalink to &quot;页面启动白屏时间&quot;">​</a></h3><h4 id="耗时拆解" tabindex="-1">耗时拆解 <a class="header-anchor" href="#耗时拆解" aria-label="Permalink to &quot;耗时拆解&quot;">​</a></h4><p>从用户点 H5 链接到页面渲染完成展示给用户，需要经历的粗略过程</p><ul><li>Webview 初始化</li><li>下载静态资源（html、js 和 css 等）</li><li>数据请求</li><li>渲染（解析、组装、绘制）</li></ul><p>总耗时(t) = Webview 初始化耗时(t1) + 下载静态资源耗时(t2) + 数据请求耗时(t3) + 渲染耗时(t4)</p><p>其中 Webview 初始化、静态资源加载以及数据请求占用的耗时是比较多的，且这个耗时页面一定处于白屏阶段。</p><h4 id="静态资源的优化" tabindex="-1">静态资源的优化 <a class="header-anchor" href="#静态资源的优化" aria-label="Permalink to &quot;静态资源的优化&quot;">​</a></h4><h5 id="前端视角" tabindex="-1">前端视角 <a class="header-anchor" href="#前端视角" aria-label="Permalink to &quot;前端视角&quot;">​</a></h5><p>从前端的角度入手，可以有以下几个优化手段：</p><ul><li>资源压缩，前端有成熟的工具可以对生成的 js、css 等产物进行压缩，若有必要可以还考虑 gzip 压缩，获得更大的压缩比。</li><li>资源请求合并，过多分散的资源包会产生过多的网络请求，但也不能随意合并，最佳的方式是按照页面或者模块进行划分，并配置 async 属性来异步加载 script 脚本。</li><li>配置浏览器缓存，主要指强缓存和协商缓存，可以大大减少网络时延，减少服务器压力。</li><li>按需加载（懒加载）有效提高首页性能。</li><li>骨架屏。但是如何生成质量高的骨架屏也是一个难点，需要综合考虑 ROI 来选择是否使用骨架屏。</li></ul><h5 id="客户端视角" tabindex="-1">客户端视角 <a class="header-anchor" href="#客户端视角" aria-label="Permalink to &quot;客户端视角&quot;">​</a></h5><p>从客户端角度入手，其实是客户端预加载静态资源或者提前内置到手机本地，因此客户端需要维护要加载到本地的静态资源列表，当页面打开时，拦截 webview 资源请求，根据资源 URL 路由到本地对应资源，这样的速度是极快的。自己去实现该过程会比较繁琐，上述过程的实现其实就是离线包方案，离线包机制能帮助做好静态资源更新、管理、拦截、重定向以及异常链路，如支付宝的 nebula 容器自带离线包解决方案。但是单个离线包不宜过大，一般 0-4M，对于较大应用有时候会突破这个限制，实际项目中将一些共用通用的框架资源（如 React、lodash、moment）提取出来，提前预置 APP 中来解决单个离线包大小限制，除此之外成熟的离线包方案自带公共包机制，也可以解决离线包过大的问题</p><h4 id="数据请求优化" tabindex="-1">数据请求优化 <a class="header-anchor" href="#数据请求优化" aria-label="Permalink to &quot;数据请求优化&quot;">​</a></h4><ul><li>请求合并</li><li>请求提前</li></ul><h4 id="webview-初始化" tabindex="-1">webview 初始化 <a class="header-anchor" href="#webview-初始化" aria-label="Permalink to &quot;webview 初始化&quot;">​</a></h4><ul><li>初始化的过程在 android 系统中需要大约 500ms 以上的时间。</li><li>有一种手段是使用对象复用机制，提前创建 webview 对象池，需要使用 webview 时直接从池中获取初始化完毕的对象，这种类似于线程池的方式可以避免每次打开 H5 页面都要初始化 webview 实例，从而提升页面打开速度。</li></ul><h3 id="h5-页面的交互体验-如响应流畅度" tabindex="-1">H5 页面的交互体验，如响应流畅度 <a class="header-anchor" href="#h5-页面的交互体验-如响应流畅度" aria-label="Permalink to &quot;H5 页面的交互体验，如响应流畅度&quot;">​</a></h3><h3 id="页面渲染性能" tabindex="-1">页面渲染性能 <a class="header-anchor" href="#页面渲染性能" aria-label="Permalink to &quot;页面渲染性能&quot;">​</a></h3><h2 id="参考" tabindex="-1">参考 <a class="header-anchor" href="#参考" aria-label="Permalink to &quot;参考&quot;">​</a></h2><p>1.移动端体验优化经验总结与实践</p><p>地址:<a href="https://github.com/ProtoTeam/blog/blob/master/040.%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BD%93%E9%AA%8C%E4%BC%98%E5%8C%96%E7%BB%8F%E9%AA%8C%E6%80%BB%E7%BB%93%E4%B8%8E%E5%AE%9E%E8%B7%B5.md#%E7%A7%BB%E5%8A%A8%E7%AB%AF%E4%BD%93%E9%AA%8C%E4%BC%98%E5%8C%96%E7%BB%8F%E9%AA%8C%E6%80%BB%E7%BB%93%E4%B8%8E%E5%AE%9E%E8%B7%B5" target="_blank" rel="noreferrer">https://github.com/ProtoTeam/blog/blob/master/040.移动端体验优化经验总结与实践.md#移动端体验优化经验总结与实践</a></p>',44)]))}const m=e(t,[["render",o]]);export{b as __pageData,m as default};
