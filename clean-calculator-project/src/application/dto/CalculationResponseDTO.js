// Data Transfer Object for calculation responses
export class CalculationResponseDTO {
  constructor(result, operation, operands, timestamp, error = null) {
    this.result = result;
    this.operation = operation;
    this.operands = operands;
    this.timestamp = timestamp;
    this.error = error;
  }

  static fromCalculationResult(calculationResult) {
    return new CalculationResponseDTO(
      calculationResult.value,
      calculationResult.operation,
      calculationResult.operands,
      calculationResult.timestamp
    );
  }

  static fromError(error) {
    return new CalculationResponseDTO(null, null, null, new Date(), error.message);
  }
}