import { createReadStream } from 'fs';
import { stdout } from 'process';
import os from 'os';
import { getAbsolutePath } from '../../lib/fs-helper.js';

export const cat = async (args) => {
  const filePath = getAbsolutePath(args[0]);

  try {
    const stream = createReadStream(filePath, { encoding: 'utf-8' });

    return new Promise((resolve, reject) => {
      let fileContent = '';
      stream.on('data', (chunk) => (fileContent += chunk));
      stream.on('end', () => {
        resolve(fileContent);
      });
      stream.on('error', (error) => reject());
    })
      .then((content) => {
        stdout.write(content);
        stdout.write(os.EOL);
      })
      .catch(() => stdout.write(`Operation failed${os.EOL}`));
  } catch (err) {
    stdout.write(`Operation failed${os.EOL}`);
  }
};
