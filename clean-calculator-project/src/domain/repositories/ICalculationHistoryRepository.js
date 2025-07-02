// Repository Interface (Port) - Domain Layer
export class ICalculationHistoryRepository {
  async save(calculationResult) {
    throw new Error('Method must be implemented');
  }

  async getHistory(limit = 10) {
    throw new Error('Method must be implemented');
  }

  async clear() {
    throw new Error('Method must be implemented');
  }
}