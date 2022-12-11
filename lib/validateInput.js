import { commands } from '../commands/commands.js';

export const getCommand = (command, commandArgs) => {
  const result = commands.find(
    (item) =>
      item.command.name === command && item.argsCount === commandArgs.length
  );

  if (!result) {
    throw new Error('Invalid input');
  }

  return result.command.bind(null, commandArgs);
};
