let hasJustCalculated = false;
let pressedOperator = false;
let prevValue = null;
let currValue = "";
let currOperatorText = "";
let currOperatorButton = null;

const button = document.querySelector(".main-buttons-container");
const display = document.getElementById("display");

button.addEventListener("click", getButton);

function getButton(e) {
    if (!e.target.classList.contains("button")) return;

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
        editDisplay(e.target);
    }
}

function editDisplay(target) {
    const value = target.innerText;

    if (target.classList.contains("operator")) {
        if (currOperatorText && prevValue !== null && currValue !== "") {
            compute();
        } else if (currValue !== "") {
            prevValue = parseFloat(currValue);
        }

        if (currOperatorButton) {
            currOperatorButton.classList.remove("button-click");
        }

        currOperatorText = value;
        currOperatorButton = target;
        currOperatorButton.classList.add("button-click");

        pressedOperator = true;
        hasJustCalculated = false;
    } else if (value === "=") {
        compute();
        if (currOperatorButton) currOperatorButton.classList.remove("button-click");
        currOperatorText = "";
        currOperatorButton = null;
        pressedOperator = false;
        hasJustCalculated = true;
    } else {
        if (pressedOperator || hasJustCalculated) {
            display.innerText = "";
            currValue = "";
            pressedOperator = false;
            hasJustCalculated = false;
        }

        currValue += value;
        display.innerText += value;
    }
}

// Math operation functions
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return b !== 0 ? a / b : "Error";
}

function compute() {
    if (prevValue === null || currValue === "") return;

    const a = prevValue;
    const b = parseFloat(currValue);
    let result;

    switch (currOperatorText) {
        case "+":
            result = add(a, b);
            break;
        case "-":
            result = subtract(a, b);
            break;
        case "*":
            result = multiply(a, b);
            break;
        case "/":
            result = divide(a, b);
            break;
        default:
            return;
    }

    display.innerText = result;
    prevValue = result;
    currValue = "";
}

function allClear() {
    display.innerText = "";
    prevValue = null;
    currValue = "";
    currOperatorText = "";
    pressedOperator = false;
    hasJustCalculated = false;

    if (currOperatorButton) {
        currOperatorButton.classList.remove("button-click");
        currOperatorButton = null;
    }
}

function del() {
    currValue = currValue.slice(0, -1);
    display.innerText = display.innerText.slice(0, -1);
}

function inverseSign() {
    if (currValue) {
        currValue = (parseFloat(currValue) * -1).toString();
        display.innerText = currValue;
    }
}

function percent() {
    if (currValue) {
        currValue = (parseFloat(currValue) / 100).toString();
        display.innerText = currValue;
    }
}
