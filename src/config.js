const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function () {
  const configLocalPath = path.resolve(process.cwd(), 'fd.config.local.js');
  const configBasePath = path.resolve(process.cwd(), 'fd.config.js');
  
  if (fs.existsSync(configLocalPath)) {
    return require(configLocalPath);
  }

  if (fs.existsSync(configBasePath)) {
    return require(configBasePath);
  }

  if (!fs.existsSync(configLocalPath) && !fs.existsSync(configBasePath)) {
    console.log(chalk.red(`配置文件不存在`));
    process.exit();
  }
  
}

