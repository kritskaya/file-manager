import { stdin, stdout, argv, cwd, chdir } from 'process';
import os from 'os';
import * as readline from 'readline/promises';
import { getCommand, showStartMessage } from './lib/input-helper.js';

const userArg = argv.find((arg) => arg.startsWith('--username='));
const username = userArg ? userArg.slice(11) : 'Noname';

stdout.write(`Welcome to the File Manager, ${username}!${os.EOL}`);

let currentPath = os.homedir();
chdir(currentPath);
showStartMessage(currentPath);

const rl = readline.createInterface({ input: stdin, output: stdout });
rl.prompt();

rl.on('line', async (input) => {
  const inputArgs = input.match(/"(.*?)"(?: |$)|[^ ]+/g);
  const [command, ...commandArgs] = inputArgs;

  if (input === '.exit') {
    rl.close();
    return;
  }

  try {
    const exec = getCommand(command, commandArgs);
    await exec(commandArgs);
  } catch (err) {
    stdout.write(`${err.message}${os.EOL}`);
  }

  showStartMessage(cwd());
  rl.prompt();
});

rl.on('close', () => {
  stdout.write(
    `${os.EOL}Thank you for using File Manager, ${username}, goodbye!${os.EOL}`
  );
});
