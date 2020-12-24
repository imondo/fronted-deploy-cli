const adm_zip = require("adm-zip");
const zip = new adm_zip();

function compress(distDir, name) {
  return new Promise(resolve => {
    zip.addLocalFolder(distDir);
    zip.writeZip(`${distDir}/${name}.zip`);
    resolve();
  })
}

module.exports = compress;