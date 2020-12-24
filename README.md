# fronted-deploy-cli

前端本地部署至远程服务器

## 安装依赖

```
npm i fronted-deploy-cli -D

```

## 配置文件

项目根目录添加配置文件 `fd.config.js`

```js
module.exports = {
  localZip: './dist/dist.zip', // 上传文件
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