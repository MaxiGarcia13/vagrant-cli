const { exec } = require('./exec');

const getLocations = async (path) => {
  const fileLocation = path;
  const currentDirectory = await exec('pwd');

  const moveToFileLocation = `cd ${path}`;
  const moveToCurrentDirectory = `cd ${currentDirectory}`;

  return {
    fileLocation,
    currentDirectory,
    moveToFileLocation,
    moveToCurrentDirectory,
  };
};

module.exports = {
  getLocations,
};
