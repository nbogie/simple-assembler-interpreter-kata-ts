export type RegisterName = string;

export type Registers = { [key: RegisterName]: number };

export type ProgramCounter = number;

export type Instruction =
    | { command: "dec"; registerName: RegisterName }
    | { command: "inc"; registerName: RegisterName }
    | { command: "jnz"; registerName: RegisterName; offset: number }
    | {
          command: "mov";
          toRegister: RegisterName;
          sourceRegOrValue: number | RegisterName;
          //We can do better. have two types of mov command, movReg, movNum?
      };
