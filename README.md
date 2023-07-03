# TypeScript Interpreter

This is a fully programming language made from from scratch with TypeScript. It supports OOP, classes, inheritance, user define functions, built in functions, variable assignments and loops.

## Demo

- live website: https://ts-interpreter.vercel.app/
- youtube viedo: https://youtu.be/aQSlwkD4e4o

## Images

### Home Page
![ts-interpreter vercel app_ (1)](https://github.com/AugustinSorel/ts-interpreter/assets/48162609/d40cb581-d6b4-4c44-bcb4-bf50aac79a36)

### Playground
![ts-interpreter vercel app_playground (1)](https://github.com/AugustinSorel/ts-interpreter/assets/48162609/e89fdebe-db6a-455b-9489-677150dbab63)

### Documentation

## Features

### OOP

```js
class Doughnut {
  cook() {
    print "Fry until golden brown.";
  }
}

class BostonCream < Doughnut{}

BostonCream().cook();
```

### Functions

```js
fun fib(n) {
  if (n <= 1) {
    return n;
  }
  return fib(n - 2) + fib(n - 1);
}

for (var i = 0; i < 20; i = i + 1) {
  print fib(i);
}
```

### Loops

```js
for(var i = 0; i < 20; i = i +1){
  print i;
}

var i = 0;
while(i < 20){
  print i;
  i = i + 1;
}
```

### Boolean

```js
var x = 12 > 10+1 ? true : false;
print x;

if(true and false){
  print "true and false is true";
}else{
  print "true and false is false";
}
```

### Math

```js
var x = 12;
var y = 13;
var z = 14;

print (x + y) * z;
print x + y * z;
print (x - 10) ** (y - 11 ) - z;
print x + y ** -1;
print x / y / z;
print y + 0.0;
print x % 20 + x % 10;
```

### String

```js
var x = "hello";
var y = "world";

print x + " " + y;
print x + 3;
```

### Built In Functions

```js
print "Hello";
print clock();
```

### Comment

```js
/*
the clock method is a built in function
*/
print clock(); // this will print the time
```

## Grammar

```txt
program        → declaration* EOF ;

declaration    → varDecl | statement | funDecl | classDecl ;

varDecl        → "var" IDENTIFIER ( "=" expression )? ";" ;

statement      → exprStmt | printStmt | block | ifStmt | whileStmt | forStmt | returnStmt ;

funDecl        → "fun" function ;

classDecl      → "class" IDENTIFIER ( "<" IDENTIFIER )? "{" function* "}" ;

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
                 | "super" "." IDENTIFIER ;
```
