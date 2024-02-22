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

  files.forEach(file => {
    if (file.endsWith('.vue')) {
      const componentName = file.replace('.vue', '');
      const componentPath = path.join(componentsDir, file);
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