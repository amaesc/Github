// Domain Value Object
export class MathOperation {
  constructor(symbol, name, precedence) {
    this.symbol = symbol;
    this.name = name;
    this.precedence = precedence;
  }
}