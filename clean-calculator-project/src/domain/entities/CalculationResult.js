// src/domain/entities/CalculationResult.js

/**
 * Domain Entity representing the result of a mathematical calculation.
 * Contains core business logic and rules related to calculation results.
 */
export class CalculationResult {
  constructor(value, operation, operands) {
    this.value = value;
    this.operation = operation;
    this.operands = operands;
    this.timestamp = new Date();
  }

  /**
   * Validates if the calculation result is mathematically valid
   * @returns {boolean} True if the result is valid
   */
  isValid() {
    return this.value !== null && !isNaN(this.value) && isFinite(this.value);
  }

  /**
   * Returns a human-readable string representation of the calculation
   * @returns {string} Formatted calculation string
   */
  toString() {
    return `${this.operands.join(` ${this.operation} `)} = ${this.value}`;
  }

  /**
   * Formats the result to a specific number of decimal places
   * @param {number} decimals - Number of decimal places
   * @returns {number} Formatted result
   */
  toFixedResult(decimals = 2) {
    return parseFloat(this.value.toFixed(decimals));
  }
}