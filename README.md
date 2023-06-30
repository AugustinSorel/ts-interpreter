# ts-interpreter

## Grammar

```txt
program        → declaration* EOF ;

declaration    → varDecl | statement | funDecl | classDecl ;

varDecl        → "var" IDENTIFIER ( "=" expression )? ";" ;

statement      → exprStmt | printStmt | block | ifStmt | whileStmt | forStmt | returnStmt ;

funDecl        → "fun" function ;

classDecl      → "class" IDENTIFIER "{" function* "}" ;

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

assignment     → ( call "." )? IDENTIFIER "=" assignment | logic_or ;

logic_or       → logic_and ( "or" logic_and )* ;

logic_and      → equality ( "and" equality )* ;

equality       → comparison ( ( "!=" | "==" ) comparison )* ;

comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;

term           → factor ( ( "-" | "+" ) factor )* ;

factor         → power ( ( "/" | "*" | "%" ) power )* ;

power          → unary ("^" power)* ;

unary          → ( "!" | "-" ) unary | call ;

call           → primary ( "(" arguments? ")" | "." IDENTIFIER )* ;

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
