const displayEl = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');

let firstOperand = null;
let operator = null;
let waitingForSecond = false;

function updateDisplay(value){
  displayEl.textContent = value;
}

function inputDigit(d){
  if(waitingForSecond){
    updateDisplay(d);
    waitingForSecond = false;
    return;
  }
  if(displayEl.textContent === '0' && d !== '.'){
    updateDisplay(d);
  } else {
    if(d === '.' && displayEl.textContent.includes('.')) return;
    updateDisplay(displayEl.textContent + d);
  }
}

function handleOperator(nextOperator){
  const inputValue = parseFloat(displayEl.textContent);
  if(operator && waitingForSecond){
    operator = nextOperator;
    return;
  }
  if(firstOperand === null){
    firstOperand = inputValue;
  } else if(operator){
    const result = calculate(firstOperand, inputValue, operator);
    updateDisplay(String(result));
    firstOperand = result;
  }
  waitingForSecond = true;
  operator = nextOperator;
}

function calculate(a,b,op){
  if(op === '+') return a + b;
  if(op === '-') return a - b;
  if(op === '*') return a * b;
  if(op === '/') return b === 0 ? 'Error' : a / b;
  return b;
}

function clearAll(){
  updateDisplay('0');
  firstOperand = null;
  operator = null;
  waitingForSecond = false;
}

function negate(){
  updateDisplay(String(parseFloat(displayEl.textContent) * -1));
}

function percent(){
  updateDisplay(String(parseFloat(displayEl.textContent) / 100));
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const value = btn.dataset.value;
    const op = btn.dataset.operator;
    const action = btn.dataset.action;

    if(value !== undefined){
      inputDigit(value);
    } else if(op !== undefined){
      handleOperator(op);
    } else if(action){
      if(action === 'clear') clearAll();
      if(action === 'negate') negate();
      if(action === 'percent') percent();
      if(action === 'equals'){
        if(operator === null || firstOperand === null) return;
        const second = parseFloat(displayEl.textContent);
        const result = calculate(firstOperand, second, operator);
        updateDisplay(String(result));
        firstOperand = null;
        operator = null;
        waitingForSecond = false;
      }
    }
  });
});
