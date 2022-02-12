const inquirer = require('inquirer');
const { format } = require('../bin/date');
const { isExist } = require('../bin/file_system');
const { vagrantUp } = require('../bin/script_up');
const { vagrantDown } = require('../bin/script_down');
const { vagrantSsh } = require('../bin/script_ssh');
const { vagrantRemove } = require('../bin/script_remove');

const { STORAGE_PATH } = require('../constants/core');
const { vagrantShowSshConfig } = require('../bin/script_show_ssh_config');

const prompt = inquirer.createPromptModule();

const actions = {
  up: vagrantUp,
  down: vagrantDown,
  ssh: vagrantSsh,
  remove: vagrantRemove,
  'ssh-config': vagrantShowSshConfig,
};

/**
 *
 * @param {"up", "down", "ssh", "remove", "ssh-config"} type
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
