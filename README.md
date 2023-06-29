# ts-interpreter

## Grammar

```txt
program        → declaration* EOF ;

declaration    → varDecl | statement | funDecl ;

varDecl        → "var" IDENTIFIER ( "=" expression )? ";" ;

statement      → exprStmt | printStmt | block | ifStmt | whileStmt | forStmt | returnStmt ;

funDecl        → "fun" function ;

function       → IDENTIFIER "(" parameters? ")" block ;

parameters     → IDENTIFIER ( "," IDENTIFIER )* ;

exprStmt       → expression ";" ;

printStmt      → "print" expression ";" ;

block          → "{" declaration* "}" ;

ifStmt         → "if" "(" expression ")" statement ( "else" statement )? ;

whileStmt      → "while" "(" expression ")" statement ;

forStmt        → "for" "(" ( varDecl | exprStmt | ";" ) expression? ";" expression? ")" statement ;

returnStmt     → "return" expression? ";" ;

expression     → conditional ;

conditional    → assignment ("?" expression ":" conditional)? ;

assignment     → IDENTIFIER "=" assignment | logical_or ;

logic_or       → logic_and ( "or" logic_and )* ;

logic_and      → equality ( "and" equality )* ;

equality       → comparison ( ( "!=" | "==" ) comparison )* ;

comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;

term           → factor ( ( "-" | "+" ) factor )* ;

factor         → power ( ( "/" | "*" | "%" ) power )* ;

power          → unary ("^" power)* ;

unary          → ( "!" | "-" ) unary | call ;

call           → primary ( "(" arguments? ")" )* ;

arguments      → expression ("," expression)* ;

primary        → NUMBER | STRING | "true" | "false" | "nil"
                 | "(" expression ")"
                 // Error productions...
                 | ( "!=" | "==" ) equality
                 | ( ">" | ">=" | "<" | "<=" ) comparison
                 | ( "+" ) term
                 | ( "/" | "*" ) factor
                 | IDENTIFIER
```
