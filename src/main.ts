import { interpret } from "./interpreter/interpreter";
import fs from "fs/promises";

loadAndInterpret();

async function loadAndInterpret() {
    const [, , inputFileName] = process.argv;

    if (!inputFileName) {
        throw new Error(
            "please supply ASM program filename as command-line argument"
        );
    }

    try {
        const data = await fs.readFile(inputFileName, {
            encoding: "utf8",
        });
        const instructionStrings = data
            .split("\n")
            .filter((line) => line.trim() !== "");

        const result = interpret(instructionStrings);

        console.log("Result", result);
    } catch (err) {
        console.log(err);
    }
}
