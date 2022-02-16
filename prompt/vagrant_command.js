const inquirer = require('inquirer');
const { format } = require('../scripts/date');
const { isExist } = require('../scripts/file_system');
const { vagrantUp } = require('../scripts/script_up');
const { vagrantDown } = require('../scripts/script_down');
const { vagrantSsh } = require('../scripts/script_ssh');
const { vagrantRemove } = require('../scripts/script_remove');
const { vagrantReload } = require('../scripts/script_reload');

const { STORAGE_PATH } = require('../constants/core');
const { vagrantShowSshConfig } = require('../scripts/script_show_ssh_config');

const prompt = inquirer.createPromptModule();

const actions = {
  up: vagrantUp,
  down: vagrantDown,
  ssh: vagrantSsh,
  remove: vagrantRemove,
  reload: vagrantReload,
  'ssh-config': vagrantShowSshConfig,
};

/**
 *
 * @param {"up", "down", "ssh", "remove", "reload", "ssh-config"} type
 */
const vagrant = async (type) => {
  if (!isExist(STORAGE_PATH)) {
    throw new Error("You don't have Vagrantfile loaded");
  }

  const action = actions[type];

  const storageData = require(STORAGE_PATH);

  const questions = [
    {
      type: 'list',
      name: 'name',
      message: 'Choose vagrantfile',
      choices: Object.keys(storageData).map((key) => ({
        name: `${key} created: ${format(storageData[key].ts)}`,
        value: key,
      })),
    },
  ];

  try {
    const { name } = await prompt(questions);
    const { path } = storageData[name];

    await action(path);
  } catch (error) {
    throw error;
  }
};

module.exports = { vagrant };
