import { sep as separator } from 'path';
import { chdir, stdout } from 'process';
import os from 'os';

export const cd = (args) => {
  const currentPath = args[0];
  try {
    chdir(currentPath);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);
  }
};
