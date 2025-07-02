// Use Case - Get calculation history
export class GetCalculationHistoryUseCase {
  constructor(historyRepository) {
    this.historyRepository = historyRepository;
  }

  async execute(limit = 10) {
    return await this.historyRepository.getHistory(limit);
  }
}