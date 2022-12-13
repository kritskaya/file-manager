import { stdout } from 'process';
import os from 'os';
import { stat, unlink } from 'fs/promises';
import { getAbsolutePath } from '../../lib/fs-helper.js';

export const rm = async (args) => {
  let filePath;
  let isDirectory;
  try {
    filePath = getAbsolutePath(args[0]);

    isDirectory = await stat(filePath);
    if (isDirectory) throw new Error();

    await unlink(filePath);
    stdout.write(`File has removed${os.EOL}`);
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);

    if (err.code === 'ENOENT') {
      stdout.write(`No such file ${filePath}${os.EOL}`);
    }

    if (isDirectory) {
      stdout.write(`Path ${filePath} is a directory not a file${os.EOL}`);
    }
  }
};
