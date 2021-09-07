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
        if (file === "README.md") {
          current.link = `${parentName}/`;
        } else {
          // const suffixName = file.slice(-3);
          // if (suffixName !== ".md") return;
          // current.link = `${parentName}/${file}`;
          current.link = `${parentName}/${file.slice(0, -3)}`;
        //   current=`${parentName}/${file}`
        }
      }
      return current;
    })
    .filter((item) => item);
}

const sidebar = buildChildren(workPath);
console.log(sidebar)
module.exports = {
    title: 'Hello VitePress',
    description: 'Just playing around.',
    head:[
        ['meta',{name:'referrer',content:'never'}],//会出现在html的head里，用来绕过语雀的图片防盗链
        ['link',{href:'/logo/klee.ico',rel:'SHORTCUT ICON'}]
      ],
    themeConfig: {
        repo: 'vuejs/vitepress',
        docsDir: 'docs',
    
        // editLinks: true,
        // editLinkText: 'Edit this page on GitHub',
        // lastUpdated: 'Last Updated',
    
        // algolia: {
        //   apiKey: 'c57105e511faa5558547599f120ceeba',
        //   indexName: 'vitepress'
        // },
    
        // carbonAds: {
        //   carbon: 'CEBDT27Y',
        //   custom: 'CKYD62QM',
        //   placement: 'vuejsorg'
        // },
    
        // nav: [
        //   { text: 'Guide', link: '/', activeMatch: '^/$|^/guide/' }
        // ],
        sidebar
        // sidebar:{'/':[
        //     {
        //         text:'123',
        //         children:[
        //             {text:'123',link:'/'}
        //         ]
        //     }
        // ]}
        // sidebar: {
        //   '/guide/': getGuideSidebar(),
        //   '/config/': getConfigSidebar(),
        //   '/': getGuideSidebar()
        // }
      }
}
