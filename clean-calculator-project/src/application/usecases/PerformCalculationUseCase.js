import { CalculationResult } from '../../domain/entities/CalculationResult.js';
import { CalculationValidator } from '../../domain/services/CalculationValidator.js';

// Use Case - Application business rules
export class PerformCalculationUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute(firstOperand, operation, secondOperand) {
    try {
      // Validate inputs
      const validFirstOperand = CalculationValidator.validateNumber(firstOperand);
      const validOperation = CalculationValidator.validateOperation(operation);
      const validSecondOperand = CalculationValidator.validateNumber(secondOperand);

      // Perform calculation
      const result = this._calculate(validFirstOperand, validOperation, validSecondOperand);
      
      // Create result object
      const calculationResult = new CalculationResult(
        result,
        validOperation,
        [validFirstOperand, validSecondOperand]
      );

      // Save to history
      await this.historyRepository.save(calculationResult);

      return calculationResult;
    } catch (error) {
      throw new Error(`Calculation failed: ${error.message}`);
    }
  }

  _calculate(firstOperand, operation, secondOperand) {
    switch (operation) {
      case '+':
        return this._add(firstOperand, secondOperand);
      case '-':
        return this._subtract(firstOperand, secondOperand);
      case '*':
        return this._multiply(firstOperand, secondOperand);
      case '/':
        return this._divide(firstOperand, secondOperand);
      case '%':
        return this._modulo(firstOperand, secondOperand);
      case '^':
        return this._power(firstOperand, secondOperand);
      default:
        throw new Error(`Unsupported operation: ${operation}`);
    }
  }

  _add(a, b) {
    return a + b;
  }

  _subtract(a, b) {
    return a - b;
  }

  _multiply(a, b) {
    return a * b;
  }

  _divide(a, b) {
    CalculationValidator.validateDivision(a, b);
    return a / b;
  }

  _modulo(a, b) {
    CalculationValidator.validateDivision(a, b);
    return a % b;
  }

  _power(a, b) {
    return Math.pow(a, b);
  }
}