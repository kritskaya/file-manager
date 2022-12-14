import { stat } from 'fs/promises';
import { basename, join } from 'path';
import { stdout } from 'process';
import { getAbsolutePath } from '../../lib/fs-helper.js';
import os from 'os';
import { createReadStream, createWriteStream } from 'fs';

export const cp = async (args) => {
  let filePath, newFilePath;
  let isDirectory;

  try {
    filePath = getAbsolutePath(args[0]);

    const filename = basename(filePath);
    newFilePath = join(getAbsolutePath(args[1]), filename);

    isDirectory = (await stat(filePath)).isDirectory();
    if (isDirectory) throw new Error();

    return new Promise((resolve, reject) => {
      const readableStream = createReadStream(filePath);
      const writableStream = createWriteStream(newFilePath, {
        flags: 'wx',
      });

      let content = '';
      readableStream.on('data', (chunk) => {
        if (chunk) {
          content += chunk;
        }
      });

      writableStream.on('error', (err) => {
        reject(err);
      });

      readableStream.on('error', (err) => {
        reject(err);
      });

      readableStream.on('end', () => {
        writableStream.write(content);
        resolve(`file is copied${os.EOL}`);
      });
    })
      .then((content) => {
        stdout.write(content);
      })
      .catch((err) => {
        stdout.write(err.message);
        stdout.write(`Operation failed${os.EOL}`);

        if (err.code === 'EPERM') {
          stdout.write(`Operation not permitted${os.EOL}`);
        }

        if (err.code === 'EEXIST') {
          stdout.write(`File ${newFilePath} already exists${os.EOL}`);
        }

        if (err.code === 'EPERM') {
          stdout.write(`Operation not permitted${os.EOL}`);
        }

        if (err.code === 'ENOENT') {
          stdout.write(`No such file or directory${os.EOL}`);
        }
      });
  } catch (err) {
    console.log(err.message);
    stdout.write(`Operation failed${os.EOL}`);
  }
};
