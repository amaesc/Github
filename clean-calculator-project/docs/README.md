Clean Architecture Calculator

A JavaScript implementation of a calculator following Clean Architecture principles by Uncle Bob (Robert C. Martin).
🏗️ Architecture Overview

This project demonstrates Clean Architecture with clear separation of concerns across four main layers:
Domain Layer (src/domain/)

    Entities: Core business objects (CalculationResult, MathOperation)
    Services: Business logic that doesn't belong to entities (CalculationValidator)
    Repositories: Interfaces for data access (ICalculationHistoryRepository)

Application Layer (src/application/)

    Use Cases: Application-specific business rules
        PerformCalculationUseCase
        GetCalculationHistoryUseCase
        ClearCalculationHistoryUseCase
    DTOs: Data Transfer Objects for clean data transport

Infrastructure Layer (src/infrastructure/)

    Repository Implementations: Concrete implementations of domain interfaces
    External Dependencies: Database, file system, web services (when applicable)

Presentation Layer (src/presentation/)

    Controllers: Handle requests and coordinate use cases
    Web UI: HTML, CSS, and JavaScript for user interaction

🚀 Getting Started
Prerequisites

    Modern web browser with ES6 module support
    Local web server (for proper module loading)

Running the Application

    Using a local web server (recommended):

    bash

    # Using Python 3
    python -m http.server 8000

    # Using Node.js (if you have http-server installed)
    npx http-server

    # Using PHP
    php -S localhost:8000

    Open in browser:
        Visit http://localhost:8000 for the demo page
        Or go directly to http://localhost:8000/src/presentation/web/index.html for the calculator app

Project Structure

clean-calculator-project/
├── src/
│   ├── domain/
│   │   ├── entities/
│   │   │   ├── CalculationResult.js
│   │   │   └── MathOperation.js
│   │   ├── services/
│   │   │   └── CalculationValidator.js
│   │   └── repositories/
│   │       └── ICalculationHistoryRepository.js
│   ├── application/
│   │   ├── usecases/
│   │   │   ├── PerformCalculationUseCase.js
│   │   │   ├── GetCalculationHistoryUseCase.js
│   │   │   └── ClearCalculationHistoryUseCase.js
│   │   └── dto/
│   │       ├── CalculationRequestDTO.js
│   │       └── CalculationResponseDTO.js
│   ├── infrastructure/
│   │   └── repositories/
│   │       └── InMemoryCalculationHistoryRepository.js
│   ├── presentation/
│   │   ├── controllers/
│   │   │   └── CalculatorController.js
│   │   └── web/
│   │       ├── index.html
│   │       ├── css/
│   │       │   └── styles.css
│   │       └── js/
│   │           └── calculator-ui.js
│   └── config/
│       └── CalculatorApplicationFactory.js
├── docs/
│   └── README.md
└── index.html

🎯 Features

    Basic arithmetic operations: Addition, subtraction, multiplication, division
    Advanced operations: Modulo, exponentiation
    Calculation history: View and clear previous calculations
    Error handling: Proper validation and error messages
    Interactive demo: Automated demonstration of features

🧪 Architecture Benefits
Testability

Each layer can be tested independently:

    Domain entities and services are pure JavaScript
    Use cases can be tested with mock repositories
    Controllers can be tested with mock use cases

Maintainability

    Clear separation of concerns
    Dependencies point inward (Dependency Inversion Principle)
    Easy to modify or replace implementations

Extensibility

    Add new operations by extending the domain layer
    Swap storage implementations (in-memory → database)
    Add new presentation layers (CLI, mobile app)

🔧 Usage Examples
Programmatic Usage

javascript

import { CalculatorApplicationFactory } from './src/config/CalculatorApplicationFactory.js';
import { CalculationRequestDTO } from './src/application/dto/CalculationRequestDTO.js';

// Create calculator instance
const calculator = CalculatorApplicationFactory.create();

// Perform calculation
const request = new CalculationRequestDTO(10, '+', 5);
const result = await calculator.calculate(request);

console.log(result.result); // 15

Web Interface

Open src/presentation/web/index.html in your browser for a complete calculator interface with:

    Input fields for operands and operation selection
    Real-time calculation results
    Calculation history display
    Error handling and validation

🏛️ Clean Architecture Principles

This implementation follows these key principles:

    Dependency Inversion: Dependencies point inward toward the domain
    Single Responsibility: Each class has one reason to change
    Open/Closed: Open for extension, closed for modification
    Interface Segregation: Small, focused interfaces
    Liskov Substitution: Implementations are interchangeable

🤝 Contributing

This is a demonstration project, but contributions are welcome! Please ensure any changes maintain the Clean Architecture principles and include appropriate tests.
📝 License

This project is open source and available under the MIT License.
