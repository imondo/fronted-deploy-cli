const path = require('path');
const { NodeSSH } = require('node-ssh');
const config = require('./config')();
const compress = require('./compress');

const SSH = new NodeSSH();

deploy(config);

async function deploy(config) {
  console.log('[1/8] 压缩文件');
  await compress(path.resolve(process.cwd(), `${config.localZipDir}`), config.localZipName);
  
  // 连接服务器
  console.log('[2/8] 连接服务器');
  await connectServer(config.ssh);
  try {
    
    // 上传压缩的项目文件
    console.log('[4/8] 上传压缩的项目文件');
    await SSH.putFile(
      path.resolve(process.cwd(), `${config.localZipDir}/${config.localZipName}.zip`),
      `${config.distDir}/${config.distZipName}.zip`
    );

    // 删除原项目的文件
    console.log('[5/8] 删除原项目的文件');
    await runCommand(`sudo rm -rf ${config.distZipName}`, config.distDir);

    // 解压缩上传的项目文件
    console.log('[6/8] 解压缩上传的项目文件');
    await runCommand(`sudo unzip ./${config.distZipName}.zip -d ${config.distZipName}`, config.distDir);

    // 删除服务器上的压缩的项目文件
    console.log('[7/8] 删除服务器上的压缩的项目文件');
    await runCommand(`sudo rm -rf ./${config.distZipName}.zip`, config.distDir);

    console.log('[8/8] 部署成功！');

    process.exit();
  } catch (err) {
    console.log('[9/8] 项目部署失败！', err)
    process.exit(1);
  }
}

async function connectServer(params) {
  await SSH.connect(params)
    .then(() => {
      console.log('[3/8] 服务器连接成功！');
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
