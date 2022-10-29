import { UnreachableCodeError } from "./utils";
import { parseInstruction } from "./parser";
import { Instruction, ProgramCounter, Registers } from "./types";

export { Registers };

export { interpret as simple_assembler }; //codewars expected name

export function interpret(instructionStrings: string[]): Registers {
    //Validate and structure the instructions
    const instructions: Instruction[] =
        instructionStrings.map(parseInstruction);

    const registers: Registers = {};
    let programCounter: ProgramCounter = 0;

    while (programCounter < instructions.length) {
        const instruction = instructions[programCounter];
        let programCounterOffset = executeInstruction(instruction, registers);
        programCounter += programCounterOffset;
    }

    return registers;
}

// interpret(["mov a -10", "mov b a", "inc a", "dec b", "jnz a -2"]);
// should yield { a: 0, b: -20 }

export function executeInstruction(
    instruction: Instruction,
    registers: Registers
): number {
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
        default:
            //If we don't have exhaustive coverage of instruction.command possibles above,
            //then TS will complain here.
            throw new UnreachableCodeError(
                instruction,
                "Unhandled instruction command: " + JSON.stringify(instruction)
            );
    }
}
