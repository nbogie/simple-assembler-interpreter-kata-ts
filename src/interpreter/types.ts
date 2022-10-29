export type Registers = { [key: string]: number };

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

export type RegisterName =
    | "a"
    | "b"
    | "c"
    | "d"
    | "e"
    | "f"
    | "g"
    | "h"
    | "i"
    | "j"
    | "k"
    | "l"
    | "m"
    | "n"
    | "o"
    | "p"
    | "q"
    | "s"
    | "t"
    | "u"
    | "v"
    | "w"
    | "x"
    | "y"
    | "z";
