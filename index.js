import { stdin, stdout, argv, cwd, chdir } from 'process';
import os from 'os';
// import * as readline from 'readline/promises';
import * as readline from 'readline';
import { getCommand } from './lib/validateInput.js';
import { commands } from './commands/commands.js';

const userArg = argv.find((arg) => arg.startsWith('--username='));
const username = userArg ? userArg.slice(11) : 'Noname';

stdout.write(`Welcome to the File Manager, ${username}!${os.EOL}`);

let currentPath = os.homedir();
chdir(currentPath);
stdout.write(`${os.EOL}You are currently in ${currentPath}${os.EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', async (input) => {
  const inputArgs = input.match(/"(.*?)"(?: |$)|[^ ]+/g);
  const [command, ...commandArgs] = inputArgs;

  try {
    const exec = getCommand(command, commandArgs);
    await exec(commandArgs);
  } catch (err) {
    stdout.write(`${err.message}${os.EOL}`);
  }

  if (input === '.exit') {
    rl.close();
  }

  stdout.write(`${os.EOL}You are currently in ${cwd()}${os.EOL}`);
});

rl.on('close', () => {
  stdout.write(
    `${os.EOL}Thank you for using File Manager, ${username}, goodbye!${os.EOL}`
  );
});
