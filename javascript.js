let hasJustCalculated = false;
let pressedOperator = false;
let prevValue = 0;
let currValue = 0;
let currOperator = "";

const button = document.querySelector(".main-buttons-container");
const display = document.getElementById("display");

button.addEventListener("click", getButton);

function getButton(e) {
    if (e.target.classList.contains("button")) {
        const value = e.target.innerText;

        if (e.target.classList.contains("symbol")) {
            switch (value) {
                case "AC":
                    allClear();
                    break;
                case "+/-":
                    inverseSign();
                    break;
                case "%":
                    percent();
                    break;
                case "DEL":
                    del();
                    break;
                default:
                    console.log("Unhandled button:", value);
            }
        } else {
            editDisplay(e);
        }
    }
}

function editDisplay(e) {
    const value = e.target.innerText;
    // pressed operator should only be flipped once the user presses another number
    if (e.target.classList.contains("operator")) {
        if (currOperator && pressedOperator) {
            // here should operate after a operator is pressed

        } else {
            
            currOperator = value;
            console.log(currOperator);
        }
    } else {
        display.innerText += value;
    }

}

function subtract(a, b) {
    return a - b;
}

function add(a, b) {
    return a + b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function percent(a) {
    return a / 100;
}

function equal() {

}

function allClear() {
    display.innerText = "";
}

function del() {
    const displayText = display.innerText;
    display.innerText = displayText.slice(0, -1);
}

function inverseSign(a) {
    return a * -1;
}
