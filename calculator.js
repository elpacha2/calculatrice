let displayValue = '0';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;
let calculation = '';

function clearDisplay() {
  displayValue = '0';
  operator = '';
  firstOperand = '';
  waitingForSecondOperand = false;
  calculation = '';
  updateDisplay();
}

function appendNumber(number) {
  if (waitingForSecondOperand) {
    displayValue = String(number);
    waitingForSecondOperand = false;
  } else {
    displayValue = displayValue === '0' ? String(number) : displayValue + number;
  }
  calculation += number;
  updateDisplay();
}

function appendOperator(op) {
  if (operator === '') {
    operator = op;
    firstOperand = displayValue;
    waitingForSecondOperand = true;
  } else {
    operator = op;
    calculation = calculation.slice(0, -1) + op;
  }
  updateDisplay();
}

function calculate() {
  let result;
  const secondOperand = displayValue;

  switch (operator) {
    case '+':
      result = parseFloat(firstOperand) + parseFloat(secondOperand);
      break;
    case '-':
      result = parseFloat(firstOperand) - parseFloat(secondOperand);
      break;
    case '*':
      result = parseFloat(firstOperand) * parseFloat(secondOperand);
      break;
    case '/':
      result = parseFloat(firstOperand) / parseFloat(secondOperand);
      break;
    default:
      return;
  }

  displayValue = String(result);
  operator = '';
  firstOperand = '';
  waitingForSecondOperand = false;
  calculation += '=' + displayValue;
  updateDisplay();
}

function deleteDigit() {
  if (displayValue !== '0') {
    displayValue = displayValue.slice(0, -1);
    calculation = calculation.slice(0, -1);
    if (displayValue === '') {
      displayValue = '0';
    }
    updateDisplay();
  }
}

function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;

  const calculationDisplay = document.getElementById('calculation');
  calculationDisplay.textContent = calculation;
}

updateDisplay();
