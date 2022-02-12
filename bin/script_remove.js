const { exec } = require('./exec');

const vagrantRemove = async (path) => {
  try {
    console.log('🗑 Remove VM');

    const { moveToFileLocation } = await getLocations(path);

    await exec(`${moveToFileLocation} && vagrant destroy`);

    console.log('Succes 🎉');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantRemove };
