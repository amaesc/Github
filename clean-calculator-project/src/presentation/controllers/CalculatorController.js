import { CalculationResponseDTO } from '../../application/dto/CalculationResponseDTO.js';

// Controller - Handles HTTP-like requests and coordinates use cases
export class CalculatorController {
  constructor(performCalculationUseCase, getHistoryUseCase, clearHistoryUseCase) {
    this.performCalculationUseCase = performCalculationUseCase;
    this.getHistoryUseCase = getHistoryUseCase;
    this.clearHistoryUseCase = clearHistoryUseCase;
  }

  async calculate(requestDTO) {
    try {
      const result = await this.performCalculationUseCase.execute(
        requestDTO.firstOperand,
        requestDTO.operation,
        requestDTO.secondOperand
      );
      
      return CalculationResponseDTO.fromCalculationResult(result);
    } catch (error) {
      return CalculationResponseDTO.fromError(error);
    }
  }

  async getHistory(limit = 10) {
    try {
      const history = await this.getHistoryUseCase.execute(limit);
      return history.map(calc => CalculationResponseDTO.fromCalculationResult(calc));
    } catch (error) {
      return [];
    }
  }

  async clearHistory() {
    try {
      await this.clearHistoryUseCase.execute();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}