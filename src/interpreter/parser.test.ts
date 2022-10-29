import { parseInstruction } from "./parser";

test("all instructions can be parsed", function () {
    expect(parseInstruction("dec b")).toEqual({
        command: "dec",
        registerName: "b",
    });

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

    expect(parseInstruction("mov a b")).toEqual({
        command: "mov",
        toRegister: "a",
        sourceRegOrValue: "b",
    });
});
