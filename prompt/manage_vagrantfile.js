const inquirer = require('inquirer');

const { addNewVagrantFile } = require('./add_new_vagrantfile');
const { deleteVagrantFile } = require('./delete_vagrant_file');

const prompt = inquirer.createPromptModule();

const ADD_NEW_VAGRANTFILE = 'Add new Vagrantfile';
const DELETE_VAGRANTFILE = 'Delete existing Vagrantfile';

const actions = {
  [ADD_NEW_VAGRANTFILE]: addNewVagrantFile,
  [DELETE_VAGRANTFILE]: deleteVagrantFile,
};

const questions = [
  {
    type: 'list',
    name: 'what_i_do',
    message: 'What do you want to do?',
    choices: [ADD_NEW_VAGRANTFILE, DELETE_VAGRANTFILE],
  },
];

const initCli = async () => {
  const { what_i_do } = await prompt(questions);
  const action = actions[what_i_do];

  try {
    await action();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { initCli };
