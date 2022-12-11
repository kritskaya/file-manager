import { stdin, stdout, argv } from 'process';
import os from 'os';
import * as readline from 'readline/promises';

const userArg = argv.find((arg) => arg.startsWith('--username='));
const username = userArg ? userArg.slice(11) : 'Noname';

stdout.write(`Welcome to the File Manager, ${username}!${os.EOL}`);

const rl = readline.createInterface({ input: stdin, output: stdout });

rl.on('line', (input) => {
  if (input === '.exit') {
    rl.close();
  }
})

rl.on('close', () => {
  stdout.write(
    `Thank you for using File Manager, ${username}, goodbye!${os.EOL}`
  );
});


