import { Instruction, RegisterName } from "./types";
import { assert } from "./utils";

/** Parse one instruction from a string such as 'mov a -10'
 * into a structured Instruction representation such as
 * { command: "mov", toRegister: "a", sourceRegOrValue: -10 }
 * or throw an error if the instruction is invalid.
 *
 * @param instructionString The string to parse
 * @returns an Instruction object representing the parsed instruction
 */
export function parseInstruction(instructionString: string): Instruction {
    //Instruction string format = cmd registerName [registerName | number]
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
                offset: parseIntOrFail(arg3),
            };
        case "mov":
            const sourceRegOrValue = parseRegisterNameOrIntOrFail(arg3);
            return {
                command,
                toRegister: registerName,
                sourceRegOrValue,
            };
        default:
            throw new Error(
                "Unknown command when parsing instruction: " + instructionString
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

function parseRegisterNameOrIntOrFail(str: string): number | RegisterName {
    return isNaN(parseInt(str))
        ? parseRegisterNameOrFail(str)
        : parseIntOrFail(str);
}

function parseIntOrFail(str: string): number {
    const n = parseInt(str);
    if (isNaN(n)) {
        throw new Error("Expected number, got: " + str);
    }
    return n;
}
