import { commands } from '../commands/commands.js';

export const validateCommand = (command, commandArgs) => {
  const commandCheck = commands.find(
    (item) =>
      item.command.name === command && item.argsCount === commandArgs.length
  );

  if (!commandCheck) {
    throw new Error('Invalid input');
  }
};
