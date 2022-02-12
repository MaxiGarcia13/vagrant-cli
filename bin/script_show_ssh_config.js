const { exec } = require('./exec');
const { getLocations } = require('./locations');

const vagrantShowSshConfig = async (path) => {
  try {
    console.log('🗑 Remove VM');

    const { moveToFileLocation } = await getLocations(path);

    await exec(`${moveToFileLocation} && vagrant ssh-config`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantShowSshConfig };
