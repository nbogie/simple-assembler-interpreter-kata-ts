### Original brief from codewars

[Simple assembler interpreter](https://www.codewars.com/kata/58e24788e24ddee28e000053) by [ShinuToki](https://www.codewars.com/users/ShinuToki).

This is the first part of this kata series.

We want to create a simple interpreter of assembler which will
support the following instructions:

-   mov x y - copies y (either a constant value or the content of a register) into register x
-   inc x - increases the content of the register x by one
-   dec x - decreases the content of the register x by one
-   jnz x y - jumps to an instruction y steps away (positive means forward, negative means backward, y can be a register or a constant), but only if x (a constant or a register) is not zero

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

```
["mov a 5"; "inc a"; "dec a"; "dec a"; "jnz a -1"; "inc a"]
```

visualized:

```
mov a 5
inc a
dec a
dec a
jnz a -1
inc a
```
