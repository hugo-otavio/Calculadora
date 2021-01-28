const display = document.querySelector('[nome="display"]')
const updisplay = document.querySelector('[nome="up-display"]')
let termA = termB = operation = ''
let keyBlocker = false




const printScreen = printValue => {  
    let historyMath = [termA, operation, termB]
    switch (printValue) {
        case 'termA':
            display.value = termA
            break
        case 'termB':
            display.value = termB
            break
        case 'operation':
            display.value = 0
            updisplay.value = historyMath.join(' ')
            break
        case 'result':
            display.value = result
            updisplay.value = historyMath.join(' ').concat(' = ', result)
            document.getElementById('content').innerHTML += `<p>${updisplay.value}<p>`
            termA = result
            result = termB = operation = ''
            keyBlocker = false
    }
}





const eventKeyNumber = key => {
    if (operation == '') {
        termA += key
        printScreen('termA')

    } else {
        termB += key
        printScreen('termB')
    }
}




const eventKeyOperation = key => {
    if (keyBlocker == false && termA != '') {
        operation = key
        printScreen('operation')
        keyBlocker = true
    }
}





const eventKeyResult = () => {
    if (termB != '') {
        result = math(termA, termB, operation)
        printScreen('result')

    }
}





const math = (a, b, o) => {    
    a = parseFloat(a)
    b = parseFloat(b)
    switch (o) {
        case '+':
            result = b + a
            return result
        case '-':
            result = a - b
            return result
        case 'x':
        case '*':
            result = a * b
            return result
        case '/':
            result = a / b
            return result
        default: console.log('error switch case')
    }
}





const reset = () => {
    termA = termB = operation = updisplay.value = ""    
    display.value = 0
    keyBlocker = false
}




const keyboardEvent = e => {
    const keyNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const keyOperation = ['+', '-', '*', '/', 'x']
    const keyText = e.key
    if (keyNumber.indexOf(keyText) != -1) {
        eventKeyNumber(keyText)
    }
    if (keyOperation.indexOf(keyText) != -1) {
        eventKeyOperation(keyText)
    }
}





document.addEventListener('keydown', e => {
    const code = e.keyCode
    code == 13 ? eventKeyResult(e.key) : keyboardEvent(e)
})


document.querySelectorAll('[number]').forEach(e => {
    e.onclick = click => {
        eventKeyNumber(e.innerText)
    }
})


document.querySelectorAll('[operator]').forEach(e => {
    e.onclick = click => {
        eventKeyOperation(e.innerText)
    }
})

document.querySelectorAll('[result]').forEach(e => {
    e.onclick = click => {
        eventKeyResult()
    }
})





