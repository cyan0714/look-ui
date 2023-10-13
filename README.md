# look-ui

# 鹿鸣前端组件包

## 如何新建组件?
1. 在 packages 目录下新建组件文件夹, 名字为 look-xxx, 目录结构参考现有组件
2. 在 packages/index.js 文件中引入该组件即可

## 如何打包成组件库?
1. 在终端执行 `npm run lib` 命令即可

## 如何发布到 npm ?
1. 修改 package.json 中的 version 版本号
2. 修改 npm 源为 npm 官方源, 否则在第3步会报错, 在终端执行 `npm config set registry https://registry.npmjs.org/`
3. 执行 `npm login` , 登录 npm 账号
4. 执行 `npm publish` 发布到 npm 官方源
