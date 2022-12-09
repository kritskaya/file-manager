import { stdin, stdout, argv } from 'process';
import os from 'os';

const username =
  argv.find((arg) => arg.startsWith('--username=')).slice(11) || 'Noname';
  
stdout.write(`Welcome to the File Manager, ${username}!${os.EOL}`);
