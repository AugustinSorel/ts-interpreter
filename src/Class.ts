import { Callable, LoxFunction } from "./Function";
import { Interpreter } from "./Interpreter";
import { Token, TokenLiteral } from "./Token";

export class LoxClass extends Callable {
  public name: string;
  private methods: Map<string, LoxFunction> = new Map();

  constructor({
    name,
    methods,
  }: {
    name: string;
    methods: Map<string, LoxFunction>;
  }) {
    super();
    this.name = name;
    this.methods = methods;
  }

  public toString = () => {
    return `<class ${this.name}>`;
  };

  public call = (props: { interpreter: Interpreter; args: TokenLiteral[] }) => {
    const instance = new LoxInstance({ klass: this });

    const initializer = this.findMethods({ name: "init" });

    if (initializer !== null) {
      initializer.bind({ instance }).call(props);
    }

    return instance;
  };

  public findMethods = ({ name }: { name: string }) => {
    if (this.methods.has(name)) {
      return this.methods.get(name) ?? null;
    }

    return null;
  };

  public arity = () => {
    const initializer = this.findMethods({ name: "init" });

    if (initializer === null) {
      return 0;
    }

    return initializer.arity();
  };
}

export class LoxInstance {
  private klass: LoxClass;
  private fields: Map<string, TokenLiteral> = new Map();

  constructor({ klass }: { klass: LoxClass }) {
    this.klass = klass;
  }

  public get = ({ name }: { name: Token }) => {
    if (this.fields.has(name.lexeme)) {
      return this.fields.get(name.lexeme);
    }

    const method = this.klass.findMethods({ name: name.lexeme });

    if (method !== null) {
      return method.bind({ instance: this });
    }

    if (method !== null) {
      return method;
    }

    throw new Error(`Undefined property '${name}'`);
  };

  public toString = () => {
    return `<instance ${this.klass.name}>`;
  };

  public set = ({ name, value }: { name: Token; value: TokenLiteral }) => {
    this.fields.set(name.lexeme, value);
  };
}
