// Domain Service - Business logic that doesn't belong to entities
export class CalculationValidator {
  static validateNumber(value) {
    if (value === null || value === undefined) {
      throw new Error('Value cannot be null or undefined');
    }
    
    const numValue = Number(value);
    if (isNaN(numValue)) {
      throw new Error(`Invalid number: ${value}`);
    }
    
    return numValue;
  }

  static validateOperation(operation) {
    const validOperations = ['+', '-', '*', '/', '%', '^'];
    if (!validOperations.includes(operation)) {
      throw new Error(`Invalid operation: ${operation}`);
    }
    return operation;
  }

  static validateDivision(dividend, divisor) {
    if (divisor === 0) {
      throw new Error('Division by zero is not allowed');
    }
  }
}