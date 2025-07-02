// Data Transfer Object for calculation requests
export class CalculationRequestDTO {
  constructor(firstOperand, operation, secondOperand) {
    this.firstOperand = firstOperand;
    this.operation = operation;
    this.secondOperand = secondOperand;
  }
}