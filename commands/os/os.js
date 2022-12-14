import { chdir, cwd, stdout } from 'process';
import * as OS from 'os';

export const os = (args) => {
  const argument = args[0];

  switch (argument) {
    case '--homedir':
      stdout.write(`home directory: ${cwd()}${OS.EOL}`);
      break;
    case '--username':
      stdout.write(`current system user name: ${OS.userInfo().username}`);
      break;
    case '--architecture':
      stdout.write(`CPU architecture: ${OS.arch()}`);
      break;
    case '--EOL':
      stdout.write(
        `default system End-Of-Line: ${
          OS.platform() === 'win32' ? '\\r\\n' : '\\n'
        }`
      );
      break;
    default:
      stdout.write(`invalid input${OS.EOL}`);
  }
};
