let display = document.getElementById('display');
let firstOperand = '';
let secondOperand = '';
let currentOperation = null;
let shouldResetDisplay = false;

function appendNumber(number) {
    if (shouldResetDisplay) {
        resetDisplay();
        shouldResetDisplay = false;
    }
    display.value = display.value === '0' ? number : display.value + number;
}

function setOperation(operation) {
    if (currentOperation !== null) calculate();
    firstOperand = display.value;
    currentOperation = operation;
    shouldResetDisplay = true;
}

function resetDisplay() {
    display.value = '0';
}

function clearDisplay() {
    display.value = '0';
    firstOperand = '';
    secondOperand = '';
    currentOperation = null;
}

function calculate() {
    if (currentOperation === null) return;
    secondOperand = display.value;
    display.value = operate(currentOperation, parseFloat(firstOperand), parseFloat(secondOperand));
    currentOperation = null;
}

function operate(operation, a, b) {
    switch (operation) {
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            return b === 0 ? 'ОШИБКА!!!' : a / b;
        default:
            return null;
    }
}