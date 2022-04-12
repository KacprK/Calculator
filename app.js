const currentNumber = document.querySelector(".currentNumber");
const previousNumber = document.querySelector(".previousNumber");
const operation = document.querySelector(".operation");
const clearButton = document.querySelector(".clear");
const equalsButton = document.querySelector(".equals");
const operationButtons = document.querySelectorAll(".operations");
const numberButtons = document.querySelectorAll(".numbers");

let result = 0;

operationButtons.forEach((x) => x.addEventListener("click", action));
numberButtons.forEach((x) => x.addEventListener("click", display));

clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", calculate);

function display() {
    // no more then one dot
    if (this.innerText === "." && currentNumber.innerText.includes(".")) return;
    // no more then one zero in row
    if (
        (this.innerText === "0" || this.innerText === "00") &&
        (currentNumber.innerText === "0" || currentNumber.innerText === "-0")
    )
        return;
    // disable "00" button when current number display is empty or contains "-"
    if (
        this.innerText === "00" &&
        (currentNumber.innerText === "" || currentNumber.innerText === "-")
    )
        return;
    // when "." button is pressed when current number display is empty, insert "0."
    if (
        this.innerText === "." &&
        (currentNumber.innerText === "" || currentNumber.innerText === "-")
    ) {
        currentNumber.innerText += "0.";
        return;
    }
    // if zero is at the beginning of the current number display and other button then "." or "0" is pressed, insert only content of this other button
    if (
        this.innerText !== "0" &&
        this.innerText !== "." &&
        currentNumber.innerText === "0"
    ) {
        currentNumber.innerText = this.innerText;
        return;
    }
    // if zero with minus is at the beginning of the current number display and other button then "." or "0" is pressed, insert only content of this other button
    if (
        this.innerText !== "0" &&
        this.innerText !== "." &&
        currentNumber.innerText === "-0"
    ) {
        currentNumber.innerText = `-${this.innerText}`;
        return;
    }

    currentNumber.innerText += this.innerText;
}

function action() {
    // when current number display is empty and "-" button is pressed, insert "-"
    if (this.innerText === "-" && currentNumber.innerText === "") {
        currentNumber.innerText = "-";
        return;
    }
    // disable operator buttons when current number display is empty or contains only "-"
    if (currentNumber.innerText === "" || currentNumber.innerText === "-")
        return;
    // show right away result of square power in current number display; square power works only with current number
    if (this.innerText === "2^") {
        currentNumber.innerText =
            Number(currentNumber.innerText) * Number(currentNumber.innerText);
        return;
    }
    // first insertion of a number into previous number label; needed to enable the calculate function
    if (previousNumber.innerText === "") {
        previousNumber.innerText = Number(currentNumber.innerText);
        operation.innerText = this.innerText;
        currentNumber.innerText = "";
        return;
    }

    calculate();
    operation.innerText = this.innerText;
}
// "C" button operations
function clear() {
    previousNumber.innerText = "";
    operation.innerText = "";
    currentNumber.innerText = "";
    result = 0;
}

function calculate() {
    // disable this function when current number and previous number are empty
    if (currentNumber.innerText === "" || previousNumber.innerText === "")
        return;

    const a = Number(previousNumber.innerText);
    const b = Number(currentNumber.innerText);

    switch (operation.innerText) {
        case ":":
            if (b === 0) {
                alert("ERROR: do not divide by 0");
                return;
            }
            result = a / b;
            break;
        case "x":
            result = b * a;
            break;
        case "-":
            result = a - b;
            break;
        case "+":
            result = a + b;
            break;
        default:
            break;
    }
    // if "=" button is pressed, clear contents of previous number label and operation label, and show result in current number label
    if (this.innerText === "=") {
        previousNumber.innerText = "";
        operation.innerText = "";
        currentNumber.innerText = result;
    } // else show result in previous number label, when one of operation buttons is pressed
    else {
        previousNumber.innerText = result;
        currentNumber.innerText = "";
    }
}
