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