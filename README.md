# fronted-deploy-cli

前端本地部署至远程服务器

[![npm version](https://badge.fury.io/js/fronted-deploy-cli.svg)](http://badge.fury.io/js/fronted-deploy-cli)

![](https://nodei.co/npm/fronted-deploy-cli.png?downloads=true&downloadRank=true&stars=true)

## 安装依赖

```
npm i fronted-deploy-cli -D

```

## 配置文件

项目根目录添加配置文件 `fd.config.js`

```js
const path = require('path');

module.exports = {
  localZipDir: path.resolve(__dirname, './dist'),
  localZipName: 'dist',
  distDir: '/fronted', // 前端文件部署目录
  distZipName: 'dist', // 前端项目文件部署根目录
  ssh: { // ssh 配置
    host: 'test',
    username: 'test',
    password: 'test',
    port: 22
  }
}
```

## 执行命令

```
fd-cli
```

执行后，流程如下

```
[1/8] 压缩文件
[2/8] 连接服务器
[3/8] 服务器连接成功！
[4/8] 上传压缩的项目文件
[5/8] 删除原项目的文件
[6/8] 解压缩上传的项目文件
[7/8] 删除服务器上的压缩的项目文件
[8/8] 部署成功！
```

## 其他

由于配置存在服务器这种敏感信息，参考 `vue-cli` 添加了 `fd.config.local.js` 本地配置

项目可以在 `.gitignore` 文件中忽略掉 `fd.config.local.js` 文件
