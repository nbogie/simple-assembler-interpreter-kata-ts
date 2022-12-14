import { UnreachableCodeError } from "./utils";
import { parseInstruction } from "./parser";
import { Instruction, ProgramCounter, RegisterName, Registers } from "./types";

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
        const pcOffsetOrNull = executeInstruction(instruction, registers);
        programCounter += pcOffsetOrNull ?? 1;
    }

    return registers;
}

/**
 * Execute a single given Instruction, generally mutating the given registers object.
 * @returns either an offset to be made to the program counter, or null if program should advance as normal
 * */
export function executeInstruction(
    instruction: Instruction,
    registers: Registers
): number | null {
    switch (instruction.command) {
        case "dec":
            registers[instruction.registerName] -= 1;
            return null;

        case "inc":
            registers[instruction.registerName] += 1;
            return null;

        case "jnz":
            if (
                literalOrRegValue(instruction.testRegOrValue, registers) !== 0
            ) {
                return instruction.offset;
            } else {
                return null;
            }

        case "mov": {
            const v =
                typeof instruction.sourceRegOrValue === "number"
                    ? instruction.sourceRegOrValue
                    : registers[instruction.sourceRegOrValue];
            registers[instruction.toRegister] = v;
            return null;
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

function literalOrRegValue(
    sourceRegOrValue: number | RegisterName,
    registers: Registers
): number {
    return typeof sourceRegOrValue === "number"
        ? sourceRegOrValue
        : registers[sourceRegOrValue];
}
