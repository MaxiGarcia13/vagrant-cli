const { exec, spawn } = require('child_process');

module.exports = {
  exec: (command) =>
    new Promise((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) reject(error);

        if (stdout) console.info(`➡ ${stdout}`);
        if (stderr) console.error(`❌ ${stdout}`);

        resolve(stdout);
      });
    }),
  spawn: (command, path) => {
    const commands = command.split(' ');
    const firstCommand = commands[0];
    const arguments = commands.filter((_, index) => index !== 0);

    const child = spawn(firstCommand, arguments, { stdio: 'inherit', cwd: path });

    child.on('message', function (message) {
      console.info(`➡ ${message}`);
    });

    child.on('error', function (error) {
      console.error(`❌ ${error}`);
    });

    child.on('close', function () {
      console.log('☑️  Connection was Closed');
    });
  },
};
