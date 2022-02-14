const { exec } = require('./exec');
const { getLocations } = require('./locations');

const vagrantDown = async (path) => {
  try {
    console.log('🚦 Down vagrant');

    const { moveToFileLocation } = await getLocations(path);

    await exec(`${moveToFileLocation} && vagrant suspend`);

    console.log('Succes 🎉');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantDown };
