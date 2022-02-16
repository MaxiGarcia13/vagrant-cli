const { exec } = require('./exec');
const { getLocations } = require('./locations');

const vagrantReload = async (path) => {
  try {
    console.log('⚙️  Reload vagrant');

    const { moveToFileLocation } = await getLocations(path);

    await exec(`${moveToFileLocation} && vagrant reload`);

    console.log('Succes 🎉');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantReload };
