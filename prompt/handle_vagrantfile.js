const inquirer = require('inquirer');

const { vagrant } = require('./vagrant_command');

const prompt = inquirer.createPromptModule();

const SSH = 'SSH';
const UP = 'UP';
const DOWN = 'Down';

const actions = {
  [UP]: () => vagrant('up'),
  [SSH]: () => vagrant('ssh'),
  [DOWN]: () => vagrant('down'),
};

const questions = [
  {
    type: 'list',
    name: 'what_i_do',
    message: 'What do you want to do?',
    choices: [UP, SSH, DOWN],
  },
];

const initHandlerCli = async () => {
  const { what_i_do } = await prompt(questions);
  const action = actions[what_i_do];

  try {
    await action();
  } catch (error) {
    console.error(error);
  }
};

module.exports = { initHandlerCli };
