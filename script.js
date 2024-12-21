let currentInput = '';
let previousInput = '';
let operation = '';
let history = [];
let themes = ['light', 'dark', 'pink'];
let currentThemeIndex = 0;

function appendNumber(number) {
    currentInput += number;
    updateDisplay();
}

function setOperation(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operation = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculateResult() {
    let result;
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = prev / current;
            break;
        default:
            return;
    }
    
    const historyEntry = `${previousInput} ${operation} ${currentInput} = ${result}`;
    addToHistory(historyEntry);
    
    currentInput = result.toString();
    operation = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    updateDisplay();
}

function clearHistory() {
    history = [];
    document.getElementById('history').innerHTML = '';
}

function updateDisplay() {
    const displayValue = previousInput + (operation ? ' ' + operation + ' ' : '') + currentInput;
    document.getElementById('display').value = displayValue || '0';
}

function addToHistory(entry) {
    history.push(entry);
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = history.map(item => `<div>${item}</div>`).join('');
    historyDiv.scrollTop = historyDiv.scrollHeight;
}

function toggleTheme() {
    const body = document.body;
    const calculator = document.querySelector('.calculator');

    // Remove current theme
    body.classList.remove(themes[currentThemeIndex]);
    calculator.classList.remove(themes[currentThemeIndex]);

    // Update theme index
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;

    // Add new theme
    body.classList.add(themes[currentThemeIndex]);
    calculator.classList.add(themes[currentThemeIndex]);
}