const inquirer = require('inquirer');
const { writeFile, isExist } = require('../scripts/file_system');

const { STORAGE_PATH } = require('../constants/core');

const prompt = inquirer.createPromptModule();

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'Name:',
    validate: (input) => input.length > 0,
  },
  {
    type: 'input',
    name: 'path',
    message: `Vagrantfile path (does not work with "~" 🥺):`,
    validate: (input) => {
      const rgx = new RegExp('^.*/');
      return input[0] !== '~' && rgx.test(input);
    },
  },
];

const addNewVagrantFile = async () => {
  try {
    const { name, path } = await prompt(questions);

    if (!isExist(STORAGE_PATH)) await writeFile(STORAGE_PATH, '{}');

    const storageData = require(STORAGE_PATH);
    storageData[name] = { path, ts: Date.now() };

    await writeFile(STORAGE_PATH, JSON.stringify(storageData));

    console.info(`☑️  ${name} was added`);
  } catch (error) {
    throw error;
  }
};

module.exports = { addNewVagrantFile };
