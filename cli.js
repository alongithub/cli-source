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