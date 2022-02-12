const inquirer = require('inquirer');
const { format } = require('../bin/date');
const { isExist, writeFile } = require('../bin/file_system');

const { STORAGE_PATH } = require('../constants/core');

const prompt = inquirer.createPromptModule();

const deleteVagrantFile = async () => {
  if (!isExist(STORAGE_PATH)) {
    throw new Error();
  }

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
    storageData[name] = undefined;
    delete storageData[name];

    writeFile(STORAGE_PATH, JSON.stringify(storageData));

    console.info(`🗑 ${name} was deleted`);
  } catch (error) {
    throw error;
  }
};

module.exports = { deleteVagrantFile };
