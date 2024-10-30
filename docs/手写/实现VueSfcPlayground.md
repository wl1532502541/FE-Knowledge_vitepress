## 简易版

左侧单文件、右侧预览

### 效果

<vue-sfc-playground-simple />


### 原理

![Vue SFC Playground 简易版原理图](/FE-Knowledge2/vuesfcsimple.png)

简易版 Vue SFC Playground 的主要组成部分和工作原理如下：

1. 编辑器组件：使用 CodeMirror 实现，支持 Vue 单文件组件的语法高亮和编辑。

2. 预览组件：使用 iframe 创建一个沙箱环境，用于渲染编辑器中的代码。

3. 编译过程：利用 Vue 的编译器将 SFC 代码编译成可执行的 JavaScript。

4. 状态管理：使用 Vue 的 provide/inject 机制在组件间共享代码状态。

5. 实时更新：通过 postMessage 在编辑器和预览框之间传递编译后的代码，实现实时预览。

这种设计既保证了代码编辑的流畅性，又确保了预览环境的安全性和隔离性。

## 功能丰富版

正是 repl https://github.com/vuejs/repl

### 效果

todo

### 原理
1. 文件选择器： 支持多个文件。各文件编译结果存在一个map中，将主文件中import同级文件的语句转换成变量引入即可。

2. 依赖选择器： 支持在不打包的情况下引入cdn模块，支持版本选择，依赖importMap实现

3. 实时预览：使用postMessage在主窗口和预览iframe之间通信，实现代码编辑和预览的实时同步更新

4. 编辑器：支持codeMirror或者monoeditor

5. 代码共享：将当前的代码和配置序列化为字符串，可以使用压缩算法减小数据大小，将序列化后的数据编码到URL中，支持生成可分享的链接

