// Domain Entity - Core business object
export class CalculationResult {
  constructor(value, operation, operands) {
    this.value = value;
    this.operation = operation;
    this.operands = operands;
    this.timestamp = new Date();
  }

  isValid() {
    return this.value !== null && !isNaN(this.value) && isFinite(this.value);
  }

  toString() {
    return `${this.operands.join(` ${this.operation} `)} = ${this.value}`;
  }
}