let number = null;
let operator = null;
let nextNumber = null;
let displayDone = false;
let operatorChosen = false;
let lastDisplay = false
let dotDisplayable = true
let minusSignDisplayable = true;


function operate(operator, firstNumber, secondNumber ){
    switch (operator){
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtration(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divition(firstNumber, secondNumber);
        default:
            return 'Operand does not exist'
    }
}

function add(a, b){
    return a + b;
}

function subtration(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divition(a, b){
    return b == 0 ? 'Cannot divide by 0...' : a / b
}

const display = document.querySelector('.display');
const buttons = document.querySelector('.buttons')
const iterableButtons = Array.from(buttons.children)
const result = document.querySelector('.result')

for(let i = 0; i < iterableButtons.length; i++){
    iterableButtons[i].setAttribute('data-key', iterableButtons[i].textContent)
}


buttons.addEventListener('click', (event) => {
    if(!displayDone){
        if(event.target.className === 'number'){
            if(display.textContent.trim() === '0' || display.textContent.startsWith('-')){
                display.textContent = ''
            }
            display.textContent += event.target.textContent
            number = Number(display.textContent)
            return number
        }
    }

    if(!operatorChosen){
        if(event.target.className === 'operand'){
            operator = event.target.textContent
            displayDone = true
            operatorChosen = true
            dotDisplayable = true
            return operator
        }
    }

    if(operatorChosen){
        if(event.target.className === 'number'){
            if (!lastDisplay){
                display.textContent = ''
                lastDisplay = true
            }
            display.textContent += event.target.textContent
            nextNumber = Number(display.textContent)
            return nextNumber
        }
    }

    if(event.target.textContent === '='){
        if(nextNumber !== null){        
            display.textContent = ''
            display.textContent = operate(operator, number, nextNumber)
            number = operate(operator, number, nextNumber)
            operatorChosen = false
            lastDisplay = false
            nextNumber = null
            dotDisplayable = false
        }else{
            return
        }
    }

    if(event.target.textContent === 'AC'){
        display.textContent = '0'
        operatorChosen = false
        dotDisplayable = true
        displayDone = false
        lastDisplay = false
        number = null
        nextNumber = null
        minusSignDisplayable = true
    }

    if(event.target.textContent === '.'){
        if(dotDisplayable){
            if(!display.textContent.includes('.')){
                display.textContent += '.'
            }
        }
    }

    if(event.target.textContent === '+/-'){
        if(minusSignDisplayable){
            if(display.textContent !== '0'){
                display.textContent = display.textContent
                .padStart(display.textContent.length + 1, '-');
                number = Number(display.textContent)
                minusSignDisplayable = false;
            }
        }else{
            display.textContent = display.textContent.replace('-', '')
            minusSignDisplayable = true
        }
    }
    
})



document.addEventListener('keydown', (event) => {
    iterableButtons.forEach(button => {
        if(event.key == button.textContent){
            button.click()
        }

        if(button.textContent === '='){
            if(event.key == 'Enter'){
                button.click()
            }
        }

        if(button.textContent === 'AC'){
            if(event.key == 'Escape'){
                button.click()
            }
        }

        if(button.textContent === '.'){
            if(event.key == '.'){
                button.click()
            }
        }
    })
})