# ts-interpreter

## Grammar

```txt
program        → declaration* EOF ;

declaration    → varDecl | statement ;

varDecl        → "var" IDENTIFIER ( "=" expression )? ";" ;

statement      → exprStmt | printStmt | block ;

exprStmt       → expression ";" ;

printStmt      → "print" expression ";" ;

block          → "{" declaration* "}" ;

expression     → conditional ;

conditional    → assignment ("?" expression ":" conditional)? ;

assignment     → IDENTIFIER "=" assignment | equality

equality       → comparison ( ( "!=" | "==" ) comparison )* ;

comparison     → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;

term           → factor ( ( "-" | "+" ) factor )* ;

factor         → power ( ( "/" | "*" | "%" ) power )* ;

power         → unary ("^" power)* ;

unary          → ( "!" | "-" ) unary | primary ;

primary        → NUMBER | STRING | "true" | "false" | "nil"
                 | "(" expression ")"
                 // Error productions...
                 | ( "!=" | "==" ) equality
                 | ( ">" | ">=" | "<" | "<=" ) comparison
                 | ( "+" ) term
                 | ( "/" | "*" ) factor
                 | IDENTIFIER
```
