// console.log('hello')
const fs = require('fs');
const path = require('path');


const componentsDir = path.join(__dirname, '../docs/.vitepress/theme/css_demos');
const docsDir = path.join(__dirname, '../docs/CSS_DEMOS');

// 确保docs目录存在
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir);
}

// 读取components目录下的所有.vue文件
fs.readdir(componentsDir, (err, files) => {
  if (err) {
    console.error('Error reading components directory:', err);
    return;
  }

  files.forEach(name => {
    console.log("name", name)
    // 区分文件夹和文件
    fs.stat(path.join(componentsDir, name), (err, stats) => {
      if (err) {
        console.error("无法获取文件状态: ", err);
        return;
      }

      let componentName;
      // = name.replace('.vue', '');
      if (stats.isDirectory()) {
        console.log(`${path.join(componentsDir, name)} 是一个文件夹`);
        componentName = name
        name = name + "/index.vue"
      } else if (stats.isFile()) {
        console.log(`${path.join(componentsDir, name)} 是一个文件`);
        componentName = name.replace('.vue', '')
      }
      // 还可以使用 stats.isSymbolicLink(), stats.isBlockDevice(), 等来检查其他类型
      if (name.endsWith('.vue')) {
        // if(name=="index.vue"){
        //   // 获取完整的文件或子目录路径
        // const fullPath = path.join(parentDirPath, file);
        // // 使用path.basename获取父目录名称
        // // 注意：这里的"parentDirName"实际上会是你提供的parentDirPath的最后一部分
        // const parentDirName = path.basename(path.dirname(fullPath));
        // }
        // const componentName = name.replace('.vue', '');
        const componentPath = path.join(componentsDir, name);
        const mdPath = path.join(docsDir, `${componentName}.md`);

        // 读取.vue文件的内容
        const content = fs.readFileSync(componentPath, 'utf8');

        // 生成Markdown文件内容
        const mdContent = `# ${componentName}\n\n## \n <${componentName}/>\n\n## \n \`\`\`vue\n${content}\n\`\`\``;

        // 写入Markdown文件
        fs.writeFileSync(mdPath, mdContent, 'utf8');
        console.log(`Generated Markdown for ${componentName}`);
      }
    });

  });
});