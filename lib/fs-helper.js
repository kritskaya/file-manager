import { join, isAbsolute } from 'path';
import { cwd } from 'process';

export const getAbsolutePath = (filePath) => {
  const isAbsolutePath = isAbsolute(filePath);
  const currentPath = cwd();

  return isAbsolutePath ? filePath : join(currentPath, filePath);
};
