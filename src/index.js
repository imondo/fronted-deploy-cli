const path = require('path');
const { NodeSSH } = require('node-ssh');
const config = require('./config')();

const SSH = new NodeSSH();

deploy(config);

async function deploy(config) {
  // 连接服务器
  await connectServer(config.ssh);
  try {
    // 上传压缩的项目文件
    await SSH.putFile(
      path.resolve(process.cwd(), config.localZip),
      `${config.distDir}/${config.distZipName}.zip`
    );

    // 删除原项目的文件
    await runCommand(`sudo rm -rf ${config.distZipName}`, config.distDir);

    // 解压缩上传的项目文件
    await runCommand(`sudo unzip ./${config.distZipName}.zip -d ${config.distZipName}`, config.distDir);

    // 删除服务器上的压缩的项目文件
    await runCommand(`sudo rm -rf ./${config.distZipName}.zip`, config.distDir);

    // 删除服务器上的压缩的项目文件
    await runCommand(`sudo rm -rf ./${config.distZipName}.zip`, config.distDir);

    console.log('部署成功！');

    process.exit();
  } catch (err) {
    console.log('项目部署失败！', err)
    process.exit(1);
  }
}

async function connectServer(params) {
  await SSH.connect(params)
    .then(() => {
      console.log('服务器连接成功！');
    })
    .catch((err) => {
      console.log('服务器连接失败！');
      process.exit(1);
    });
}

/**
 * 通过 ssh 在服务器上命令
 * @param {*} cmd shell 命令
 * @param {*} cwd 路径
 */
async function runCommand(cmd, cwd) {
  await SSH.execCommand(cmd, {
    cwd,
    onStderr(chunk) {
      console.log(`${cmd}, stderrChunk, ${chunk.toString('utf8')}`);
    },
  });
}
