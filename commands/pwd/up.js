import {sep as separator} from 'path';


export const up = (currentPath) => {
  const separatorExist = currentPath.indexOf(separator);

  if (separator !== -1) {
    return separatorExist.slice(0, separatorExist);
  }

  return separatorExist;
}