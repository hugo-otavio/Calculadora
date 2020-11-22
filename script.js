let display = document.querySelector('[nome="display"]')
let updisplay = document.querySelector('[nome="up-display"]')
let first = ''
let second = ''
let operator = ''
ctrl = false
let history1 = []
let history2 = []
result = 0


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

const reset = () => {
    result = updisplay.value = first = second = operator = ''
    history1 = []
    ctrl = false
}

document.querySelectorAll('[number]').forEach(e => {

    e.onclick = click => {
        if (operator == '') {
            first += e.getAttribute('value')
            display.value = first

        } else {
            second += e.getAttribute('value')
            display.value = second

        }
    }
})


document.querySelectorAll('[operator]').forEach(e => {
    e.onclick = click => {
        if (ctrl == false && first != '') {
            operator = e.getAttribute('value')
            history1 = [first, operator]
            display.value = 0
            updisplay.value = history1.join(' ')
            ctrl = true

        } else if (ctrl == true) {
            result = math(first, second, operator)
            display.value = result
            history1.push(second)
            operator = e.getAttribute('value')
            history1.push(operator)
            updisplay.value = history1.join(' ')            
            second = ''
            first = result
        }

    }
})

document.querySelectorAll('[result]').forEach(e => {
    e.onclick = click => {
        if(second != ''){
        result = math(first, second, operator)
        history1.push(second)
        updisplay.value = history1.join(' ')
        display.value = result
        second = result
        history2 = updisplay.value.concat(' = ', result)
        document.querySelector('.ul-history').innerHTML += `<li>${history2}</li>`
        reset()
    }
    }
})

