// Variables pour stocker les valeurs de la calculatrice
let displayValue = '0'; // Valeur affichée à l'écran
let operator = ''; // Opérateur sélectionné (+, -, *, /)
let firstOperand = ''; // Premier opérande pour le calcul
let waitingForSecondOperand = false; // Indique si l'on attend le deuxième opérande
let calculation = ''; // Chaîne de calcul affichée à l'utilisateur

// Fonction pour réinitialiser la calculatrice
function clearDisplay() {
  displayValue = '0';
  operator = '';
  firstOperand = '';
  waitingForSecondOperand = false;
  calculation = '';
  updateDisplay();
}

// Fonction pour ajouter un chiffre à la valeur affichée
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

// Fonction pour ajouter un opérateur à la chaîne de calcul
function appendOperator(op) {
  if (operator === '') {
    operator = op;
    firstOperand = displayValue;
    waitingForSecondOperand = true;
  } else {
    operator = op;
    calculation = calculation.slice(0, -1) + op; // Remplace le dernier opérateur par le nouvel opérateur
  }
  updateDisplay();
}

// Fonction pour effectuer le calcul
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

// Fonction pour supprimer le dernier chiffre
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

// Fonction pour mettre à jour l'affichage de la calculatrice
function updateDisplay() {
  const display = document.getElementById('display');
  display.textContent = displayValue;

  const calculationDisplay = document.getElementById('calculation');
  calculationDisplay.textContent = calculation;
}

// Initialisation de l'affichage
updateDisplay();