const calculate = (n1, operator, n2) => {
    let result = ''

    if (operator === 'add') {
        result = parseFloat(n1) + parseFloat(n2)
    } else if (operator === 'subtract') {
        result = parseFloat(n1) - parseFloat(n2)
    } else if (operator === 'multiply') {
        result = parseFloat(n1) * parseFloat(n2)
    } else if (operator === 'divide') {
        result = parseFloat(n1) / parseFloat(n2)
    }

    return result
}

const calculator = document.querySelector('.container');
const display = document.querySelector('#VO');
const controls = document.querySelector('.controls');

controls.addEventListener('click', e => {
    if (e.target.matches('button')) {
        
        const control = e.target
        const action = control.dataset.action
        const controlContent = control.textContent
        const displayedNum = display.textContent
        const previousKeyType = calculator.dataset.previousKeyType
        
        Array.from(control.parentNode.children)
            .forEach(k => k.classList.remove('is-depressed'))

        if (!action) {
            if (displayedNum === '0' || 
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
            ) {
                display.textContent = controlContent
            } else {
                display.textContent = displayedNum + controlContent
            }
            calculator.dataset.previousKeyType = 'number'
        }
        
        if(action === 'decimal'){
            if(!displayedNum.includes('.')) {
                display.textContent = displayedNum + '.'
            } else if (
                previousKeyType === 'operator' ||
                previousKeyType === 'calculate'
                
            ) {
                display.textContent = '0.'
            }

            calculator.dataset.previousKey = 'decimal'
        }

        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide'

          ) {
            const firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            const secondValue = displayedNum

            if(
                firstValue &&
                operator &&
                previousKeyType !== 'operator' &&
                previousKeyType !== 'calculate'
            ) {
                const calcValue = calculate(firstValue, operator, secondValue)
                display.textContent = calcValue
                calculator.dataset.firstValue = calcValue
            } else {
                calculator.dataset.firstValue = displayedNum
            }

            control.classList.add('is-depressed')
            calculator.dataset.previousKeyType = 'operator'
            calculator.dataset.operator = action
        }

        if (action === 'clear') {
            if(control.textContent === 'AC'){
                calculator.dataset.firstValue = ''
                calculator.dataset.modValue = ''
                calculator.dataset.operator = ''
                calculator.dataset.previousKeyType = ''
            }else{
                control.textContent = 'AC'
            }
            display.textContent = 0
            calculator.dataset.previousKey = 'clear'
        } 

        if(action !== 'clear') {
            const clearButton = calculator.querySelector('[data-action=clear]')
            clearButton.textContent = 'CE'
        }

        if (action === 'calculate') {
            let firstValue = calculator.dataset.firstValue
            const operator = calculator.dataset.operator
            let secondValue = displayedNum
            
            if(firstValue) {
                if(previousKeyType === 'calculate') {
                    firstValue = displayedNum
                    secondValue = calculator.dataset.modValue
                }
                
                display.textContent = calculate(firstValue, operator, secondValue)
            }
        }






        if (action === 'percentage') {
            console.log("add percentage button")
        }  
        if (action === 'plusminus') {
            console.log('add toggle button')
        }          
    }
})


