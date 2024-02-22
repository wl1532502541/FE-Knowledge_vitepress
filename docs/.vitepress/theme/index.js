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
      // 获取组件名称，可以根据文件名或其他逻辑定制
      const componentName = path.split('/').pop().replace(/\.\w+$/, '');
      // 注册组件
      app.component(componentName, component.default);
    });
  },
}
