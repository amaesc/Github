import { ICalculationHistoryRepository } from '../../domain/repositories/ICalculationHistoryRepository.js';

// Repository Implementation (Adapter) - Infrastructure Layer
export class InMemoryCalculationHistoryRepository extends ICalculationHistoryRepository {
  constructor() {
    super();
    this.calculations = [];
  }

  async save(calculationResult) {
    this.calculations.unshift(calculationResult);
    return calculationResult;
  }

  async getHistory(limit = 10) {
    return this.calculations.slice(0, limit);
  }

  async clear() {
    this.calculations = [];
    return true;
  }
}