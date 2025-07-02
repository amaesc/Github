// Dependency Injection & Composition Root
import { InMemoryCalculationHistoryRepository } from '../infrastructure/repositories/InMemoryCalculationHistoryRepository.js';
import { PerformCalculationUseCase } from '../application/usecases/PerformCalculationUseCase.js';
import { GetCalculationHistoryUseCase } from '../application/usecases/GetCalculationHistoryUseCase.js';
import { ClearCalculationHistoryUseCase } from '../application/usecases/ClearCalculationHistoryUseCase.js';
import { CalculatorController } from '../presentation/controllers/CalculatorController.js';

export class CalculatorApplicationFactory {
  static create() {
    // Infrastructure dependencies
    const historyRepository = new InMemoryCalculationHistoryRepository();

    // Application services (Use Cases)
    const performCalculationUseCase = new PerformCalculationUseCase(historyRepository);
    const getHistoryUseCase = new GetCalculationHistoryUseCase(historyRepository);
    const clearHistoryUseCase = new ClearCalculationHistoryUseCase(historyRepository);

    // Presentation layer
    const controller = new CalculatorController(
      performCalculationUseCase,
      getHistoryUseCase,
      clearHistoryUseCase
    );

    return controller;
  }
}