import { stdin, stdout, argv } from 'process';
import os from 'os';
import * as readline from 'readline/promises';
import { validateCommand } from './lib/validateInput.js';

const userArg = argv.find((arg) => arg.startsWith('--username='));
const username = userArg ? userArg.slice(11) : 'Noname';

let currentPath = os.homedir();

stdout.write(`Welcome to the File Manager, ${username}!${os.EOL}`);
stdout.write(`${os.EOL}You are currently in ${currentPath}${os.EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', (input) => {
  const inputArgs = input.match(/"(.*?)"(?: |$)|[^ ]+/g);
  const [command, ...commandArgs] = inputArgs;

  try {
    validateCommand(command, commandArgs);
  } catch (err) {
    stdout.write(err.message);
  }

  if (input === '.exit') {
    rl.close();
  }

  stdout.write(`${os.EOL}You are currently in ${currentPath}${os.EOL}`);
});

rl.on('close', () => {
  stdout.write(
    `Thank you for using File Manager, ${username}, goodbye!${os.EOL}`
  );
});
