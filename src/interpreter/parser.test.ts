import { parseInstruction } from "./parser";
import { Instruction } from "./types";

test("all instructions can be parsed", function () {
    expect(parseInstruction("dec b")).toEqual({
        command: "dec",
        registerName: "b",
    });

    expect(() => parseInstruction("dec 4")).toThrowError();
    expect(() => parseInstruction("dec :")).toThrowError();

    expect(parseInstruction("inc a")).toEqual({
        command: "inc",
        registerName: "a",
    });

    expect(parseInstruction("jnz a -2")).toEqual({
        command: "jnz",
        registerName: "a",
        offset: -2,
    });

    expect(parseInstruction("jnz c 33")).toEqual({
        command: "jnz",
        registerName: "c",
        offset: 33,
    });

    //bad 3rd arg
    expect(() => parseInstruction("jnz c potato")).toThrowError();

    expect(parseInstruction("mov a -10")).toEqual({
        command: "mov",
        toRegister: "a",
        sourceRegOrValue: -10,
    });

    expect(parseInstruction("mov a 22")).toEqual({
        command: "mov",
        toRegister: "a",
        sourceRegOrValue: 22,
    });

    //but not the other way around...
    expect(() => parseInstruction("mov 22 a")).toThrowError();

    expect(parseInstruction("mov a b")).toEqual({
        command: "mov",
        toRegister: "a",
        sourceRegOrValue: "b",
    });

    //unknown commands
    expect(() => parseInstruction("zing a")).toThrowError();
});

test("Pointless extra test. Just for illustration", () => {
    const inputLines = [
        "mov a 5",
        "inc a",
        "dec a",
        "dec a",
        "jnz a -1",
        "inc a",
    ];
    const expectedInstructions: Instruction[] = [
        {
            command: "mov",
            toRegister: "a",
            sourceRegOrValue: 5,
        },
        {
            command: "inc",
            registerName: "a",
        },
        {
            command: "dec",
            registerName: "a",
        },
        {
            command: "dec",
            registerName: "a",
        },
        {
            command: "jnz",
            registerName: "a",
            offset: -1,
        },
        {
            command: "inc",
            registerName: "a",
        },
    ];
    expect(inputLines.map(parseInstruction)).toEqual(expectedInstructions);
});
