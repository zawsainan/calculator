class Calculator{
    constructor(previousOperandTextElement,currentOperandTextElement){
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }
    appendNumber(number){
        if(number === "." && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }
    chooseOperation(operation){
        if(this.currentOperand === "") return;
        if(this.operation !== null) this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }
    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }
    delete(){
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }
    compute(){
        let computation;
        let prev = parseFloat(this.previousOperand);
        let cur = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(cur)) return;
        switch(this.operation){
            case "+":{
                computation = prev + cur;
                break;
            }
            case "-":{
                computation = prev - cur;
                break;
            }
            case "*":{
                computation = prev * cur;
                break;
            }
            case "/":{
                computation = prev / cur;
                break;
            }
            default: return;
        }
        this.currentOperand = computation;
        this.previousOperand = "";
        this.operation = undefined;
    }
    getNumberDisplay(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) integerDisplay = '';
        else integerDisplay = integerDigits.toLocaleString();
        if(decimalDigits != null) return `${integerDisplay}.${decimalDigits}`;
        else return integerDisplay;
    }
    updateDisplay(){
    this.currentOperandTextElement.innerText = this.getNumberDisplay(this.currentOperand);
        if(this.operation !== undefined) this.previousOperandTextElement.innerText = `${this.getNumberDisplay(this.previousOperand)} ${this.operation}`;
        else this.previousOperandTextElement.innerText = this.getNumberDisplay(this.previousOperand);
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')

let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

allClearButton.addEventListener('click',() =>{
    calculator.clear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click',() =>{
    calculator.delete();
    calculator.updateDisplay();
})

equalsButton.addEventListener('click',() =>{
    calculator.compute();
    calculator.updateDisplay();
})

numberButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button =>{
    button.addEventListener('click',() =>{
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})