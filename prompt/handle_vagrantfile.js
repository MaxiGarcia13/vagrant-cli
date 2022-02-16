#! /usr/bin/env node
const inquirer = require('inquirer');

const { vagrant } = require('./vagrant_command');

const prompt = inquirer.createPromptModule();

const UP = 'Up';
const DOWN = 'Down';
const RELOAD = 'Reload';
const SSH = 'SSH';
const SHOW_VAGRANTFILE_CONFIG = 'Show ssh config';

const actions = {
  [UP]: () => vagrant('up'),
  [SSH]: () => vagrant('ssh'),
  [DOWN]: () => vagrant('down'),
  [RELOAD]: () => vagrant('reload'),
  [SHOW_VAGRANTFILE_CONFIG]: () => vagrant('ssh-config'),
};

const questions = [
  {
    type: 'list',
    name: 'what_i_do',
    message: 'What do you want to do?',
    choices: [UP, SSH, DOWN, RELOAD, SHOW_VAGRANTFILE_CONFIG],
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
