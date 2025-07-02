// Usage Examples for Clean Architecture Calculator
// This file demonstrates various ways to use the calculator programmatically

import { CalculatorApplicationFactory } from '../src/config/CalculatorApplicationFactory.js';
import { CalculationRequestDTO } from '../src/application/dto/CalculationRequestDTO.js';

// ========================================
// Basic Usage Examples
// ========================================

async function basicUsageExamples() {
    console.log('=== Basic Usage Examples ===');
    
    // Create calculator instance
    const calculator = CalculatorApplicationFactory.create();
    
    // Example 1: Simple Addition
    console.log('\n1. Simple Addition:');
    const addResult = await calculator.calculate(new CalculationRequestDTO(10, '+', 5));
    console.log(`10 + 5 = ${addResult.result}`);
    
    // Example 2: Multiplication
    console.log('\n2. Multiplication:');
    const multiplyResult = await calculator.calculate(new CalculationRequestDTO(7, '*', 8));
    console.log(`7 * 8 = ${multiplyResult.result}`);
    
    // Example 3: Division
    console.log('\n3. Division:');
    const divideResult = await calculator.calculate(new CalculationRequestDTO(20, '/', 4));
    console.log(`20 / 4 = ${divideResult.result}`);
    
    // Example 4: Exponentiation
    console.log('\n4. Exponentiation:');
    const powerResult = await calculator.calculate(new CalculationRequestDTO(2, '^', 10));
    console.log(`2 ^ 10 = ${powerResult.result}`);
    
    return calculator;
}

// ========================================
// Error Handling Examples
// ========================================

async function errorHandlingExamples(calculator) {
    console.log('\n\n=== Error Handling Examples ===');
    
    // Example 1: Division by Zero
    console.log('\n1. Division by Zero:');
    const divisionByZeroResult = await calculator.calculate(new CalculationRequestDTO(10, '/', 0));
    if (divisionByZeroResult.error) {
        console.log(`Error: ${divisionByZeroResult.error}`);
    }
    
    // Example 2: Invalid Operation
    console.log('\n2. Invalid Operation:');
    try {
        const invalidOpResult = await calculator.calculate(new CalculationRequestDTO(5, '&', 3));
        console.log('This should not execute');
    } catch (error) {
        console.log(`Error caught: ${error.message}`);
    }
    
    // Example 3: Invalid Numbers
    console.log('\n3. Invalid Numbers:');
    const invalidNumberResult = await calculator.calculate(new CalculationRequestDTO('abc', '+', 5));
    if (invalidNumberResult.error) {
        console.log(`Error: ${invalidNumberResult.error}`);
    }
}

// ========================================
// History Management Examples
// ========================================

async function historyManagementExamples(calculator) {
    console.log('\n\n=== History Management Examples ===');
    
    // Perform several calculations
    const calculations = [
        new CalculationRequestDTO(100, '+', 50),
        new CalculationRequestDTO(75, '-', 25),
        new CalculationRequestDTO(12, '*', 12),
        new CalculationRequestDTO(200, '/', 8)
    ];
    
    console.log('\nPerforming calculations for history:');
    for (const calc of calculations) {
        const result = await calculator.calculate(calc);
        console.log(`${calc.firstOperand} ${calc.operation} ${calc.secondOperand} = ${result.result}`);
    }
    
    // Get history
    console.log('\nRetrieving calculation history:');
    const history = await calculator.getHistory(10);
    history.forEach((calc, index) => {
        console.log(`${index + 1}. ${calc.operands.join(` ${calc.operation} `)} = ${calc.result} (${calc.timestamp.toLocaleTimeString()})`);
    });
    
    // Get limited history
    console.log('\nRetrieving last 2 calculations:');
    const limitedHistory = await calculator.getHistory(2);
    limitedHistory.forEach((calc, index) => {
        console.log(`${index + 1}. ${calc.operands.join(` ${calc.operation} `)} = ${calc.result}`);
    });
    
    // Clear history
    console.log('\nClearing history...');
    await calculator.clearHistory();
    const clearedHistory = await calculator.getHistory();
    console.log(`History after clearing: ${clearedHistory.length} items`);
}

// ========================================
// Advanced Usage Patterns
// ========================================

async function advancedUsagePatterns() {
    console.log('\n\n=== Advanced Usage Patterns ===');
    
    // Example 1: Batch Processing
    console.log('\n1. Batch Processing:');
    const calculator = CalculatorApplicationFactory.create();
    
    const batchCalculations = [
        { operands: [1, 2], operation: '+' },
        { operands: [3, 4], operation: '*' },
        { operands: [10, 2], operation: '/' },
        { operands: [15, 4], operation: '%' }
    ];
    
    const batchResults = await Promise.all(
        batchCalculations.map(calc => 
            calculator.calculate(new CalculationRequestDTO(calc.operands[0], calc.operation, calc.operands[1]))
        )
    );
    
    batchResults.forEach((result, index) => {
        const calc = batchCalculations[index];
        console.log(`${calc.operands[0]} ${calc.operation} ${calc.operands[1]} = ${result.result}`);
    });
    
    // Example 2: Chain Calculations
    console.log('\n2. Chain Calculations:');
    let chainResult = await calculator.calculate(new CalculationRequestDTO(10, '+', 5));
    console.log(`Step 1: 10 + 5 = ${chainResult.result}`);
    
    chainResult = await calculator.calculate(new CalculationRequestDTO(chainResult.result, '*', 2));
    console.log(`Step 2: ${chainResult.operands[0]} * 2 = ${chainResult.result}`);
    
    chainResult = await calculator.calculate(new CalculationRequestDTO(chainResult.result, '/', 5));
    console.log(`Step 3: ${chainResult.operands[0]} / 5 = ${chainResult.result}`);
}

// ========================================
// Performance Testing Example
// ========================================

async function performanceTestExample() {
    console.log('\n\n=== Performance Testing Example ===');
    
    const calculator = CalculatorApplicationFactory.create();
    const iterations = 1000;
    
    console.log(`Performing ${iterations} calculations...`);
    const startTime = performance.now();
    
    const promises = [];
    for (let i = 0; i < iterations; i++) {
        const a = Math.floor(Math.random() * 100);
        const b = Math.floor(Math.random() * 100) + 1; // Avoid division by zero
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        promises.push(calculator.calculate(new CalculationRequestDTO(a, operation, b)));
    }
    
    await Promise.all(promises);
    
    const endTime = performance.now();
    const duration = endTime - startTime;
    
    console.log(`Completed ${iterations} calculations in ${duration.toFixed(2)}ms`);
    console.log(`Average time per calculation: ${(duration / iterations).toFixed(4)}ms`);
    
    // Check history count
    const history = await calculator.getHistory(1000);
    console.log(`History contains ${history.length} calculations`);
}

// ========================================
// Run All Examples
// ========================================

export async function runAllExamples() {
    try {
        const calculator = await basicUsageExamples();
        await errorHandlingExamples(calculator);
        await historyManagementExamples(calculator);
        await advancedUsagePatterns();
        await performanceTestExample();
        
        console.log('\n\n✨ All examples completed successfully!');
    } catch (error) {
        console.error('Error running examples:', error);
    }
}

// ========================================
// Export Individual Examples
// ========================================

export {
    basicUsageExamples,
    errorHandlingExamples,
    historyManagementExamples,
    advancedUsagePatterns,
    performanceTestExample
};

// Auto-run if this file is loaded directly
if (typeof window !== 'undefined') {
    window.runCalculatorExamples = runAllExamples;
    console.log('Calculator examples loaded! Run with: runCalculatorExamples()');
}