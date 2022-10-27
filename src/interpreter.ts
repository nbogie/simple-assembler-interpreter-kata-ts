/* 

This is the first part of this kata series. Second part is here.

We want to create a simple interpreter of assembler which will 
support the following instructions:

mov x y - copies y (either a constant value or the content of a register) into register x
inc x - increases the content of the register x by one
dec x - decreases the content of the register x by one
jnz x y - jumps to an instruction y steps away (positive means forward, negative means backward, y can be a register or a constant), but only if x (a constant or a register) is not zero

Register names are alphabetical (letters only).
Constants are always integers (positive or negative).

Note: the jnz instruction moves relative to itself. 
For example, an offset of -1 would continue at the previous instruction,
while an offset of 2 would skip over the next instruction.

The function will take an input list with the sequence of the program
 instructions and will execute them. 
 The program ends when there are no more instructions to execute, 
 then it returns a dictionary (a table in COBOL) with the contents 
 of the registers.

Also, every inc/dec/jnz on a register will always be preceeded by a 
mov on the register first, so you don't need to worry about 
uninitialized registers.

Example
["mov a 5"; "inc a"; "dec a"; "dec a"; "jnz a -1"; "inc a"]

visualized:

mov a 5
inc a
dec a
dec a
jnz a -1
inc a
*/
type Registers = { [key: string]: number };
type RegisterName =
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

type Instruction =
    | {
          command: "mov";
          toRegister: RegisterName;
          sourceRegOrValue: number | RegisterName; //we can do better
      }
    | { command: "inc"; registerName: RegisterName }
    | { command: "dec"; registerName: RegisterName }
    | { command: "jnz"; registerName: RegisterName; offset: number };

function parseInstruction(instructionString: string): Instruction {
    const [command, registerName, other] = instructionString.split(" ");
    if (!isValidRegisterName(registerName)) {
        throw new Error(
            "invalid register name" +
                registerName +
                " in instruction " +
                instructionString
        );
    }

    switch (command) {
        case "mov":
            const sourceRegOrValue: number | RegisterName = isNaN(
                parseInt(other)
            )
                ? parseRegisterNameOrFail(other)
                : parseInt(other);

            return {
                command,
                toRegister: registerName,
                sourceRegOrValue,
            };
        case "inc":
            if (!isValidRegisterName(registerName)) {
                throw new Error("invalid registerName: " + registerName);
            }
            return { command, registerName: registerName };

        case "dec":
            return { command, registerName };
        case "jnz":
            return {
                command,
                registerName: registerName,
                offset: parseInt(other),
            };
        default:
            throw new Error(
                "failed to parse instruction: " + instructionString
            );
    }
}

function execute(instruction: Instruction, registers: Registers): number {
    switch (instruction.command) {
        case "mov":
            const v =
                typeof instruction.sourceRegOrValue === "number"
                    ? instruction.sourceRegOrValue
                    : registers[instruction.sourceRegOrValue];
            registers[instruction.toRegister] = v;
            return 1;
        case "inc":
            registers[instruction.registerName] += 1;
            return 1;
        case "dec":
            registers[instruction.registerName] -= 1;
            return 1;
        case "jnz":
            if (registers[instruction.registerName] === 0) {
                return 1;
            } else {
                return instruction.offset;
            }
    }
}

function interpret(programInstructions: string[]): Registers {
    const instructions = programInstructions.map(parseInstruction);
    console.log({ instructions });

    const registers: Registers = {};
    let instructionPointer: number = 0;
    let counter = 0;
    while (instructionPointer < instructions.length && counter++ < 100) {
        const instruction: Instruction = instructions[instructionPointer];
        let instructionPointerOffset = execute(instruction, registers);
        instructionPointer += instructionPointerOffset;
        console.log("executed ", {
            instruction,
            registers,
            instructionPointerOffset,
            instructionPointer,
        });
    }
    return registers;
}

function isValidRegisterName(candidate: string): candidate is RegisterName {
    if (candidate.length !== 1) {
        return false;
    }
    const firstChar: string = candidate.charAt(0);
    if (firstChar < "a" || firstChar > "z") {
        return false;
    }
    return true;
}

function parseRegisterNameOrFail(candidate: string): RegisterName {
    if (isValidRegisterName(candidate)) {
        return candidate;
    }
    throw new Error("invalid register name: " + candidate);
}
// interpret(["mov a -10", "mov b a", "inc a", "dec b", "jnz a -2"]);
// should yield { a: 0, b: -20 }

export { interpret, execute, Registers };
