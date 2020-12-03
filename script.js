let display = document.querySelector('[nome="display"]')
let updisplay = document.querySelector('[nome="up-display"]')
let keyBoard = document.querySelectorAll('.key')
let first = ''
let second = ''
let operator = ''
ctrl = false
let history1 = []
let history2 = []
result = 0



checkEvent = a => {
    let numberRead
    const checktype = typeof a
    checktype == 'object' ? numberRead = a.getAttribute('value') : numberRead = a
    return numberRead
}

eventNumber = event => {
    let number = checkEvent(event)
    if (operator == '') {
        first += number
        display.value = first

    } else {
        second += number
        display.value = second

    }
}

eventOperation = event => {
    let operation = checkEvent(event)
    if (ctrl == false && first != '') {
        operator = operation
        history1 = [first, operator]
        display.value = 0
        updisplay.value = history1.join(' ')
        ctrl = true

    } else if (ctrl == true) {
        result = math(first, second, operator)
        display.value = result
        history1.push(second)
        operator = operation
        history1.push(operator)
        updisplay.value = history1.join(' ')
        second = ''
        first = result
    }
}

eventResult = () => {
    if (second != '') {
        result = math(first, second, operator)
        history1.push(second)
        updisplay.value = history1.join(' ')
        display.value = result        
        history2 = updisplay.value.concat(' = ', result)
        document.querySelector('#content').innerHTML += `<p>${history2}</p>`
        first = result
        result = updisplay.value = second = operator = ''
        ctrl = false
        
    }
}

const math = (f, s, o) => {
    let result = 0
    f = parseFloat(f)
    s = parseFloat(s)

    switch (o) {
        case '+':
            console.log('soma')
            result = s + f
            return result
            break
        case '-':
            console.log('Subtração')
            result = f - s
            return result
            break
        case 'x':
        case '*':
            result = f * s
            console.log('Multiplicação', f, s, o, result)
            return result
            break
        case '/':
            console.log('Divisão')
            result = f / s
            return result
            break
        default: console.log('error switch case')
            break;
    }
}


document.addEventListener('keydown', function (e) {
    const keyNumber = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
    const keyOperation = ['+', '-', '*', '/', 'x']
    const code = e.keyCode
    const keyText = e.key
    function operationNumber() {
        if (keyNumber.indexOf(keyText) != -1) {
            console.log('caracter de numero', keyText)
            eventNumber(keyText)
        }
        if (keyOperation.indexOf(keyText) != -1) {
            console.log('caracter de operação', keyText)
            eventOperation(keyText)
        }
    }
    code == 13 ? eventResult(keyText) : operationNumber()
})

const reset = () => {
    result = updisplay.value = first = second = operator = ''
    display.value = 0
    history1 = []
    ctrl = false
}

document.querySelectorAll('[number]').forEach(e => {
    e.onclick = click => {
        eventNumber(e)
    }
})


document.querySelectorAll('[operator]').forEach(e => {
    e.onclick = click => {
        eventOperation(e)
    }
})

document.querySelectorAll('[result]').forEach(e => {
    e.onclick = click => {
        eventResult()
    }
})





