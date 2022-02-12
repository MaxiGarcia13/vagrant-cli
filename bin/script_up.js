const { exec } = require('./exec');
const { getLocations } = require('./locations');

const vagrantUp = async (path) => {
  try {
    console.log('🏗  Up vagrant');

    const { moveToFileLocation, moveToCurrentDirectory } = await getLocations(path);

    const ssh_add = 'ssh-add --apple-use-keychain ./.vagrant/machines/default/virtualbox/private_key';

    await exec(`${moveToFileLocation} && vagrant up && ${ssh_add} && ${moveToCurrentDirectory}`);

    console.log('Succes 🎉');
  } catch (error) {
    console.log(error);
  }
};

module.exports = { vagrantUp };
