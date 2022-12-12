import { join } from 'path';
import { readdir } from 'fs/promises';
import { cwd } from 'process';

export const ls = async () => {
  let currentPath = cwd();

  const content = await readdir(currentPath, { withFileTypes: true });

  const n = content.sort((item1, item2) => {
    console.log('enter');
    try {
      if (
        (item1.isDirectory() && item2.isDirectory()) ||
        (item1.isFile() && item2.isFile()) ||
        (item1.isSymbolicLink() && item2.isSymbolicLink())
      ) {
        return item1.name.localeCompare(item2.name);
      }

      if (item1.isDirectory()) return -1;
      if (item2.isDirectory()) return 1;
      if (item1.isFile()) return -1;
      if (item2.isFile()) return 1;
    } catch (err) {
      console.log(err.message);
    }
  });

  for (const item of content) {
    console.log(
      item.name,
      item.isDirectory(),
      item.isFile(),
      item.isSymbolicLink()
    );
  }
};
