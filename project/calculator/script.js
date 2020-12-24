class Calculator{
  constructor(prevOperandTextElement,currOperandTextElement) {
  this.prevOperandTextElement = prevOperandTextElement;
  this.currOperandTextElement = currOperandTextElement;
  this.clear();
  }

  clear() {
    this.prevOperand = '';
    this.currOperand = '';
    this.operator = undefined;
  }

  delete() {
    this.currOperand = this.currOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number ==='.' && this.currOperand.includes('.')) return
    this.currOperand += number;    
  }

  selectOperator(operator) {
    /* requirement: 
      operation is able to take place when:
      1, previous operand, operator, and current operand is available
        - previous operand is available and current operand is not -> return 
        - previous operand is not available but the current is -> return
    */

   if (this.currOperand === '') return

   if (this.prevOperand !== '') {
    this.compute();
   }

    /*
    after the computation takes place, the operator is being initiated again.
    previous Opearnd will receive value from current operand and current operand will be emptied.
    both prevOperand and operator will be shown up

    Following is the case where previous operand is not available yet. If it is not stated it will append
    number instead of doing operation given the operation has already been clicked
    */
   this.operator = operator;
   this.prevOperand = this.currOperand;
   this.currOperand = '';
  }

  compute() {
    let result;
    const floatPrevOperand = parseFloat(this.prevOperand);
    const floatCurrOperand = parseFloat(this.currOperand);

    // there is still an error when user input only '.' at one of his operands
    if (isNaN(floatPrevOperand) || isNaN(floatCurrOperand)) return
    switch (this.operator) {
      case '+':
        result = floatPrevOperand + floatCurrOperand;
        break;
      case '-':
        result = floatPrevOperand - floatCurrOperand;
        break;
      case 'x':
        result = floatPrevOperand * floatCurrOperand;
        break;
      case '÷':
        result = floatPrevOperand / floatCurrOperand;
        break;
      default:
        return
    }

    /*
    'undefined' will be assigned immediately in operator after computation takes place.
    This will be displayed if user clicks 'equal button' directly.
    */
    this.operator = undefined;
    this.currOperand = result;
    this.prevOperand = this.currOperand;
  }

  // function to alter number in thousenads format to be using commas
  alterDisplayNum(number) {
    let numberString = number.toString()
    let integerDigit = parseFloat(numberString.split('.')[0]); 
    let decimalDigit = numberString.split('.')[1];
    let integerDisplayed;

    /*
    There are 3 cases:
    1. integer is empty
    2. integer is available, but decimal is empty
    3. integer and decimal is available
    */

    if (isNaN(integerDigit)) {
      integerDisplayed = '';
    } else {
      integerDisplayed = integerDigit.toLocaleString('en', {
        maximumFractionDigits: 0
      })
    }

    /*
    if (variable) {...} means:

    It means if variable is truthy, then execute the block. In JavaScript, the following are falsey:
      false
      0
      NaN
      undefined
      null
      "" (Empty String)

    */

    // this section explains how to store display due to decimalDigit availability
    if (decimalDigit != null) {
      return `${integerDisplayed}.${decimalDigit}`
    }
    else {
      return integerDisplayed;
    }

    /*
     why does it always show 'undefined'? -> no return value
     */
  }

  updateDisplay() {
    this.currOperandTextElement.innerText = this.alterDisplayNum(this.currOperand);
    // console.log(currOperandTextElement.innerText);
    this.prevOperandTextElement.innerText = this.alterDisplayNum(this.prevOperand);
    // console.log(this.currOperand, this.prevOperand);
    if (this.operator != null) {
      // $: template literal
      this.prevOperandTextElement.innerText = `${this.alterDisplayNum(this.prevOperand)} ${this.operator}`;
    }

    // 
  }

}

const numberButtons = document.querySelectorAll('.number');
const prevOperandTextElement = document.querySelector('.previous-operand');
const currOperandTextElement = document.querySelector('.current-operand');
const operationButtons = document.querySelectorAll('.operation');
const delButton = document.querySelector('.delete');
const allClearButton = document.querySelector('.all-clear');
const equalButton = document.querySelector('.equal');

calculator = new Calculator(prevOperandTextElement,currOperandTextElement);

// forEach. what's for?
numberButtons.forEach(button => { 
  //(). what is it called?
  button.addEventListener('click', () => { 
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  })
})

operationButtons.forEach(button => {
  button.addEventListener('click', () => {
    calculator.selectOperator(button.innerText);
    calculator.updateDisplay();
  })
})

allClearButton.addEventListener('click', button => {
  calculator.clear();
  calculator.updateDisplay();
})

delButton.addEventListener('click', button => {
  calculator.delete();
  calculator.updateDisplay();
})

equalButton.addEventListener('click', button => {
  calculator.compute();
  calculator.updateDisplay();
})

