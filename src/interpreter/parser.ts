import { Instruction, RegisterName } from "./types";
import { assert } from "./utils";

/** Parse one instruction from a string such as 'mov a -10'
 * into a more structured representation - an Instruction.
 *
 * @param instructionString The string to parse
 * @returns an Instruction object representing the parsed instruction
 */
export function parseInstruction(instructionString: string): Instruction {
    //We note the second part of instruction is always a register name
    //But the third part is variable
    const [command, registerName, arg3] = instructionString.split(" ");

    assert(
        isValidRegisterName(registerName),
        "invalid register name " + registerName + " in " + instructionString
    );

    switch (command) {
        case "dec":
            return { command, registerName };
        case "inc":
            return { command, registerName };
        case "jnz":
            return {
                command,
                registerName,
                offset: parseInt(arg3),
            };
        case "mov":
            const sourceRegOrValue = parseRegisterNameOrNumberOrFail(arg3);
            return {
                command,
                toRegister: registerName,
                sourceRegOrValue,
            };
        default:
            throw new Error(
                "failed to parse instruction: " + instructionString
            );
    }
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

function parseRegisterNameOrNumberOrFail(str: string): number | RegisterName {
    return isNaN(parseInt(str)) ? parseRegisterNameOrFail(str) : parseInt(str);
}
