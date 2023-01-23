import * as fs from "fs"
import * as path from "path"
import * as process from "process"

const ignoreList = [".vitepress", "README.md", "public", "index.md", ".DS_Store"];

function buildChildren(path, parentName = "") {
  const files = fs.readdirSync(path);
  return files
    .map((file) => {
      if (ignoreList.includes(file)) return;
      let current = { text: file } as { text: string, items?: any, link?: any, collapsible: boolean };
      const subPath = `${path}/${file}`;
      if (fs.statSync(subPath).isDirectory()) {
        current.items = buildChildren(subPath, `${parentName}/${file}`);
        current.collapsible = true
      } else {
        current.link = `${parentName}/${file.slice(0, -3)}`;
        current.text = `${file.slice(0, -3)}`;
      }
      return current;
    })
    .filter((item) => item);
}

const workPath = path.join(process.cwd() + "/docs");
const sidebar = buildChildren(workPath);

export default {
  title: '前端知识整理',
  head: [
    ['meta', { name: 'referrer', content: 'never' }],//会出现在html的head里，用来绕过语雀的图片防盗链
    ['link', { href: './logo/klee.ico', rel: 'SHORTCUT ICON' }]
  ],
  base: "/FE-Knowledge2/",
  lastUpdated: true,
  themeConfig: {
    docsDir: 'docs',
    logo: '/logo/book.png',
    nav: [
      { text: '首页', link: '/' }
    ],
    sidebar,
    footer: {
      message: 'MIT Licensed',
      copyright: 'Copyright © 2021-present Leinaldo'
    },
    // algolia: {
    //   appId: '...',
    //   apiKey: '...',
    //   indexName: '...'
    // }
  }
}