// Use Case - Clear calculation history
export class ClearCalculationHistoryUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute() {
    return await this.historyRepository.clear();
  }
}