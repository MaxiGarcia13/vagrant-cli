const { exec, spawn } = require('./exec');
const { getLocations } = require('./locations');

const getConfig = (arr, type) => {
  const config = arr.find((ty) => ty.includes(type));
  return config.replace(type, '').trim();
};

const vagrantSsh = async (path) => {
  try {
    console.log('🧑🏼‍💻 Vagrant Shh');

    spawn(`vagrant ssh`, path);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantSsh };
