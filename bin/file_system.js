const fs = require('fs');

const writeFile = async (path, data) =>
  await new Promise((resolve, reject) => {
    fs.writeFile(path, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

const deleteFile = async (path) =>
  await new Promise((resolve, reject) => {
    fs.fs.unlink(path, data, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

const isExist = (path) => fs.existsSync(path);

module.exports = {
  isExist,
  writeFile,
  deleteFile,
};
