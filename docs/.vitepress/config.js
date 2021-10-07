const fs = require("fs");
const path = require("path");
const process = require("process");

const ignoreList = [".vitepress","README.md","public","index.md"];

const workPath = path.join(process.cwd() + "/docs");

function buildChildren(path, parentName = "") {
  const files = fs.readdirSync(path);
  return files
    .map((file) => {
      if (ignoreList.includes(file)) return;
      // const current = { text: file };
      let current = { text: file };
      const subPath = `${path}/${file}`;
      if (fs.statSync(subPath).isDirectory()) {
        current.children = buildChildren(subPath, `${parentName}/${file}`);
      } else {
        current.link = `${parentName}/${file.slice(0, -3)}`;
      }
      return current;
    })
    .filter((item) => item);
}

const sidebar = buildChildren(workPath);
module.exports = {
    title: '前端知识整理',
    description: 'Just playing around.',
    dest:'./docs/FE-Knowledge2',
    head:[
        ['meta',{name:'referrer',content:'never'}],//会出现在html的head里，用来绕过语雀的图片防盗链
        ['link',{href:'/logo/klee.ico',rel:'SHORTCUT ICON'}]
    ],
    base:"/FE-Knowledge2/",
    themeConfig: {
        repo: 'wl1532502541/FE-Knowledge2',
        docsDir: 'docs',
        logo:'/logo/book.png',
        nav: [
          { text: '首页', link: '/'}
        ],
        sidebar
      }
}
