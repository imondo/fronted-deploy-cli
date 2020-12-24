const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

module.exports = function () {
  const configPath = path.resolve(process.cwd(), 'fd.config.js');

  if (!fs.existsSync(configPath)) {
    console.log(chalk.red(`配置文件${configPath}不存在`));
    process.exit();
  }
  return require(configPath);
}

