const inquirer = require('inquirer');

const { vagrant } = require('./vagrant_command');

const prompt = inquirer.createPromptModule();

const UP = 'UP';
const DOWN = 'Down';
// const REMOVE = 'Remove';
const SSH = 'SSH';
const SHOW_VAGRANTFILE_CONFIG = 'Show ssh config';

const actions = {
  [UP]: () => vagrant('up'),
  [SSH]: () => vagrant('ssh'),
  [DOWN]: () => vagrant('down'),
  //   [REMOVE]: () => vagrant('remove'),
  [SHOW_VAGRANTFILE_CONFIG]: () => vagrant('ssh-config'),
};

const questions = [
  {
    type: 'list',
    name: 'what_i_do',
    message: 'What do you want to do?',
    choices: [
      UP,
      SSH,
      DOWN,
      // REMOVE,
      SHOW_VAGRANTFILE_CONFIG,
    ],
  },
];

(async () => {
  const { what_i_do } = await prompt(questions);
  const action = actions[what_i_do];

  try {
    await action();
  } catch (error) {
    console.error(error);
  }
})();
