const path = require('path');

module.exports = {
  localZipDir: path.resolve(__dirname, './src'),
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