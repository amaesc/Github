// Import all dependencies
import { CalculatorApplicationFactory } from '../../../config/CalculatorApplicationFactory.js';
import { CalculationRequestDTO } from '../../../application/dto/CalculationRequestDTO.js';

class CalculatorUI {
    constructor() {
        this.calculator = CalculatorApplicationFactory.create();
        this.initializeElements();
        this.attachEventListeners();
        this.loadHistory();
    }

    initializeElements() {
        this.firstOperandInput = document.getElementById('firstOperand');
        this.operationSelect = document.getElementById('operation');
        this.secondOperandInput = document.getElementById('secondOperand');
        this.calculateBtn = document.getElementById('calculateBtn');
        this.resultDiv = document.getElementById('result');
        this.errorDiv = document.getElementById('error');
        this.historyDiv = document.getElementById('history');
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.runDemoBtn = document.getElementById('runDemoBtn');
        this.demoOutput = document.getElementById('demoOutput');
    }

    attachEventListeners() {
        this.calculateBtn.addEventListener('click', () => this.handleCalculate());
        this.clearHistoryBtn.addEventListener('click', () => this.handleClearHistory());
        this.runDemoBtn.addEventListener('click', () => this.runDemo());
        
        // Allow Enter key to trigger calculation
        [this.firstOperandInput, this.secondOperandInput].forEach(input => {
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') this.handleCalculate();
            });
        });
    }

    async handleCalculate() {
        try {
            const firstOperand = parseFloat(this.firstOperandInput.value);
            const operation = this.operationSelect.value;
            const secondOperand = parseFloat(this.secondOperandInput.value);

            if (isNaN(firstOperand) || isNaN(secondOperand)) {
                this.showError('Please enter valid numbers');
                return;
            }

            const request = new CalculationRequestDTO(firstOperand, operation, secondOperand);
            const response = await this.calculator.calculate(request);

            if (response.error) {
                this.showError(response.error);
            } else {
                this.showResult(response);
                this.loadHistory();
            }
        } catch (error) {
            this.showError(`Calculation failed: ${error.message}`);
        }
    }

    async handleClearHistory() {
        await this.calculator.clearHistory();
        this.loadHistory();
    }

    showResult(response) {
        this.resultDiv.textContent = `${response.operands.join(` ${response.operation} `)} = ${response.result}`;
        this.resultDiv.classList.remove('hidden');
        this.errorDiv.classList.add('hidden');
    }

    showError(errorMessage) {
        this.errorDiv.textContent = errorMessage;
        this.errorDiv.classList.remove('hidden');
        this.resultDiv.classList.add('hidden');
    }

    async loadHistory() {
        try {
            const history = await this.calculator.getHistory(10);
            this.displayHistory(history);
        } catch (error) {
            console.error('Failed to load history:', error);
        }
    }

    displayHistory(history) {
        if (history.length === 0) {
            this.historyDiv.innerHTML = '<div class="history-item">No calculations yet</div>';
            return;
        }

        const historyHTML = history.map(calc => 
            `<div class="history-item">${calc.operands.join(` ${calc.operation} `)} = ${calc.result}</div>`
        ).join('');
        
        this.historyDiv.innerHTML = historyHTML;
    }

    async runDemo() {
        this.demoOutput.textContent = '';
        this.logToDemo('=== Clean Architecture Calculator Demo ===\n');

        // Perform some calculations
        const calculations = [
            new CalculationRequestDTO(10, '+', 5),
            new CalculationRequestDTO(20, '-', 8),
            new CalculationRequestDTO(6, '*', 7),
            new CalculationRequestDTO(15, '/', 3),
            new CalculationRequestDTO(10, '%', 3),
            new CalculationRequestDTO(2, '^', 8)
        ];

        this.logToDemo('Performing calculations:');
        for (const calc of calculations) {
            const result = await this.calculator.calculate(calc);
            if (result.error) {
                this.logToDemo(`❌ Error: ${result.error}`);
            } else {
                this.logToDemo(`✅ ${calc.firstOperand} ${calc.operation} ${calc.secondOperand} = ${result.result}`);
            }
        }

        // Test error handling
        this.logToDemo('\nTesting error handling:');
        const errorTest = await this.calculator.calculate(new CalculationRequestDTO(10, '/', 0));
        this.logToDemo(`❌ Division by zero result: ${errorTest.error}`);

        // Show history
        this.logToDemo('\n📚 Calculation History:');
        const history = await this.calculator.getHistory(5);
        history.forEach((calc, index) => {
            this.logToDemo(`${index + 1}. ${calc.operands.join(` ${calc.operation} `)} = ${calc.result}`);
        });

        // Update UI history
        this.loadHistory();

        this.logToDemo('\n✨ Demo completed!');
    }

    logToDemo(message) {
        this.demoOutput.textContent += message + '\n';
        this.demoOutput.scrollTop = this.demoOutput.scrollHeight;
    }
}

// Initialize the calculator UI when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new CalculatorUI();
});