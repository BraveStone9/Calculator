const decimalbtn = document.querySelector('#decimalbtn')
const numKeypad = document.querySelectorAll('.numKeypad')
const operatorKeypad = document.querySelectorAll('.operatorKeypad')
const displayMain = document.querySelector('#displayMain')
const displayMemory = document.querySelector('#displayMemory')
const allClear = document.querySelector('#allClear')
const deleteBtn = document.querySelector('#deleteBtn')
const equalBtn = document.querySelector('#equalBtn')
// const divcontenitore = document.querySelector('.containerNumeri')
// const megacontenitore = document.querySelector('#megacontenitore')



let displayvalue = '0'
let displayPrevious = ''
let currentOperator = ''
let result = undefined
let decimabutton = true;

decimalbtn.addEventListener('click', pressedDecimal)
numKeypad.forEach((btn) => {
    btn.addEventListener('click',pressedButton)
})
operatorKeypad.forEach((btn) => {
    btn.addEventListener('click',pressedOperator)
})
allClear.addEventListener('click',clearDisplay)
deleteBtn.addEventListener('click', deleteDisplay)
equalBtn.addEventListener('click',operate)

window.addEventListener('keydown',keyboardpressing)

function keyboardpressing () {
    if (event.key.match(/[0-9]/)) {
        switch(event.key){
            case '0':
                pressedButton.call(document.getElementById('0'))
            break;

            case '1':
                pressedButton.call(document.getElementById('1'))
            break;

            case '2':
                pressedButton.call(document.getElementById('2'))
            break;

            case '3':
                pressedButton.call(document.getElementById('3'))
            break;

            case '4':
                pressedButton.call(document.getElementById('4'))
            break;

            case '5':
                pressedButton.call(document.getElementById('5'))
            break;

            case '6':
                pressedButton.call(document.getElementById('6'))
            break;

            case '7':
                pressedButton.call(document.getElementById('7'))
            break;

            case '8':
                pressedButton.call(document.getElementById('8'))
            break;

            case '9':
                pressedButton.call(document.getElementById('9'))
            break;
        }

    } else if(event.key.match(/\,|\./) ) {
        pressedDecimal.call(decimalbtn)
    } else if(event.key.match('Backspace')){
        deleteDisplay()
    } else if(event.key.match(/[+-\/*:x]/)) {
        switch (event.key) {
            case '+':
                pressedOperator.call(document.getElementById('+'))
            break;
            
            case '*':
            case 'x':
            case 'X':
                pressedOperator.call(document.getElementById('x'))
            break;
            
            case '/':
            case '÷':
                pressedOperator.call(document.getElementById('/'))
            break;

            case '-':
                pressedOperator.call(document.getElementById('-'))
            break;
        }
            
    } else if(event.key.match('Enter')) {
        operate()
    } else if (event.key.match('Delete')) {
        clearDisplay()
    }
    
   
}


function pressedButton() { 
    if (displayvalue === '0') {
        displayvalue = ''
    }
    if (displayvalue === result) {
        displayvalue = ''
    }
    displayvalue +=  this.innerText
       
    updateDisplay()    
}

function pressedOperator () { 
    
    if (displayvalue === '0') {
        displayvalue = ''
    }   
    if (/[+-x÷] $/.test(displayvalue)) {
        return;
    } else {
        decimabutton = true;
        operator = this.innerText
        displayvalue += ' ' + operator + ' '  
        updateDisplay()
    }  
    
}

function pressedDecimal() { 
    if (decimabutton) {
        pressedButton.call(this)
        decimabutton = false;
    } else {
        return;
    }         
    
}

function clearDisplay() {
    displayPrevious = ''
    displayvalue = '0'
    operator = ''
    result = undefined
    decimabutton = true;
    updateDisplay()   
}

function deleteDisplay() {
    let displayLength = displayvalue.length
    if( displayvalue.match(/ $/) ) {
        displayLength = displayLength -2     
    }
    if(displayvalue.charAt(displayLength-1).match('.')){
        decimabutton = true;
    }    
    displayvalue = displayvalue.slice(0,displayLength-1)
    updateDisplay()
}

function updateDisplay() {
    
    if((/ \./).test(displayvalue)) {
        displayvalue = displayvalue.replace(/ \./, ' 0.')
    } else if ((/^\./).test(displayvalue)) {
        displayvalue = displayvalue.replace(/^\./ , '0.')
    }    
    displayMain.innerText = displayvalue
    if (result) {
        displayMemory.innerText = displayPrevious + ' = ' + result
    } else {
        displayMemory.innerText = displayPrevious
    }
       
}
function operate() {
    if (displayvalue === result) {
        return
    }
    if (displayvalue.match('÷ 0')){
        alert('SNARKY ERROR MESSAGE')
        return
    }
    
    displayvalue = displayvalue.replace(/÷/g,'/')
    displayvalue = displayvalue.replace(/x/g,'*')
    
   
    if ((/[+-÷*] $/.test(displayvalue))) {
        return;
    } else {
        displayPrevious = displayvalue 
        displayPrevious = displayPrevious.replace(/\//g,'÷')
        displayPrevious = displayPrevious.replace(/\*/g,'x')

    }
       
    result = getMathematicalValue(displayvalue)
    result =  Math.floor(result * 100) / 100
    displayvalue = result    
    updateDisplay()   
}

function getMathematicalValue(str) {
    return new Function('return ' + str)();    
}