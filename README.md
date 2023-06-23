# ts-interpreter

## Grammar

```txt
expression → conditional ;

conditional → equality ("?" expression ":" conditional)? ;

equality → comparison ( ( "!=" | "==" ) comparison )* ;

comparison → term ( ( ">" | ">=" | "<" | "<=" ) term )* ;

term → factor ( ( "-" | "+" ) factor )* ;

factor → unary ( ( "/" | "*" ) unary )* ;

unary → ( "!" | "-" ) unary | primary ;

primary → NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")" ;
```
