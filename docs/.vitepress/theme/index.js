import Theme from 'vitepress/theme'
// import LnUi from 'ln-ui'
import './custom.css'

export default {
  ...Theme,
  enhanceApp: async ({ app }) => {
    // app.use(LnUi)
    // 遍历cssdemos，注册组件
    const components = import.meta.globEager('./css_demos/**/*.vue');
    Object.entries(components).forEach(([path, component]) => {
      console.log("vitepress path component", path, component)
      // 获取组件名称，可以根据文件名或其他逻辑定制
      let componentName = path.split('/').pop().replace(/\.\w+$/, '');
      if (componentName == "index") {
        // 用文件夹名作组件名
        let arr = path.split('/');
        arr.pop();
        componentName = arr.pop();
      }
      // 注册组件
      console.log("注册组件", componentName)
      app.component(componentName, component.default);
    });
  },
}
