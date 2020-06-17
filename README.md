### 脚手架原理实现

脚手架的原理很简单，无非是将与定义的文件结构通过模板处理输出到目标文件，我们可以手动实现一个脚手架工具

1. 初始化项目  
创建文件夹`cli-source`  
`cd cli-source`  
初始化项目`yarn init`

2. 创建模板文件  
根目录下创建文件夹用于存放模板文件

```
// templates/index.html
<html>
    <head>
        <title><%=name%></title>
    </head>
    <body>
        
    </body>
</html>
// template/style.css
body{
    
}
```

3. 创建入口文件cli.js  
安装所需依赖

```
yarn add ejs
```
入口文件必须有标识
```javascript
// cli.js
#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const ejs = require('ejs');

inquirer.prompt([
    {
        type: 'input',
        name: 'name',
        message: 'Project name?'
    }
])
.then(anwser => {

    const tml = path.join(__dirname, 'templates');

    // 目标目录
    const destDir = process.cwd();

    // 复制模板文件到目标路径

    fs.readdir(tml, (err, files) => {
        if (err) {
            throw err
        }
        files.forEach(file => {
            ejs.renderFile(path.join(tml, file), anwser, (err, result) => {
                if (err) throw err;

                fs.writeFileSync(path.join(destDir, file), result)
            })
        })
    })

})
```
4. 修改package.json
添加bin指定执行文件

```
"bin": "cli.js",
```
5. 使用和发布
可以通过`yarn link`link到全局使用，或者通过`yarn publish`发布到npm