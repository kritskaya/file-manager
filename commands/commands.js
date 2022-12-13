import { add } from './fs/add.js';
import { cat } from './fs/cat.js';
import { rm } from './fs/rm.js';
import { rn } from './fs/rn.js';
import { cd } from './pwd/cd.js';
import { ls } from './pwd/ls.js';
import { up } from './pwd/up.js';

export const commands = [
  {
    command: up,
    argsCount: 0,
  },
  {
    command: cd,
    argsCount: 1,
  },
  {
    command: ls,
    argsCount: 0,
  },
  {
    command: cat,
    argsCount: 1,
  },
  {
    command: add,
    argsCount: 1,
  },
  {
    command: rm,
    argsCount: 1,
  },
  {
    command: rn,
    argsCount: 2,
  },
];
