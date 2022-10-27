import { interpret } from "./interpreter";
test("original codewars tests pass", function () {
    expect(
        interpret(["mov a -10", "mov b a", "inc a", "dec b", "jnz a -2"])
    ).toEqual({ a: 0, b: -20 });

    expect(
        interpret(["mov a 5", "inc a", "dec a", "dec a", "jnz a -1", "inc a"])
    ).toEqual({ a: 1 });
});
