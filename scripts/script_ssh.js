const { spawn } = require('./exec');

const vagrantSsh = async (path) => {
  try {
    console.log('🧑🏼‍💻 Vagrant Shh');

    spawn(`vagrant ssh`, path);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantSsh };
