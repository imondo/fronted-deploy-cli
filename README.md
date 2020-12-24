# fronted-deploy-cli

前端本地部署至远程服务器

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
[1/8] 连接服务器
[2/8] 服务器连接成功！
[3/8] 压缩文件
[4/8] 上传压缩的项目文件
[5/8] 删除原项目的文件
[6/8] 解压缩上传的项目文件
[7/8] 删除服务器上的压缩的项目文件
[8/8] 部署成功！
```