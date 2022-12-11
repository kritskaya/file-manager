import { cd } from "./pwd/cd.js";
import { up } from "./pwd/up.js";

export const commands = [
  {
    command: up,
    argsCount: 0,
  },
  {
    command: cd,
    argsCount: 1,
  }
];