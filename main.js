const displayInput = document.getElementById("calculator__display");
const acButton = document.querySelector('button[data-function="AC"]');
const ceButton = document.querySelector('button[data-function="CE"]');
const operationButtons = document.querySelectorAll(
  'button[data-function="OPERATION"]'
);
const pointButton = document.querySelector('button[data-function="POINT"]');
const equalButton = document.querySelector('button[data-function="EQUAL"]');
const digitsButtons = document.querySelectorAll(
  'button[data-function="DIGIT"]'
);

let previousValue = 0,
  operation;

function handleClickAc() {
  previousValue = 0;
  displayInput.value = "";
}

function handleClickCe() {
  if (displayInput.value === "") {
    return;
  }
  displayInput.value = displayInput.value.slice(0, -1);
  if (displayInput.value === "0") {
    displayInput.value = "";
  }
}

function handleClickOperation() {
  previousValue = displayInput.value === "" ? 0 : Number(displayInput.value);
  operation = this.textContent;
  displayInput.value = "";
}

function handleClickEqual() {
  const currentValue =
    displayInput.value === "" ? 0 : Number(displayInput.value);
  switch (operation) {
    case "÷":
      displayInput.value = previousValue / currentValue;
      break;
    case "*":
      displayInput.value = previousValue * currentValue;
      break;
    case "-":
      displayInput.value = previousValue - currentValue;
      break;
    case "+":
      displayInput.value = previousValue + currentValue;
      break;
    default:
      break;
  }
}

function handleClickDigit() {
  if (displayInput.value === "" && this.textContent === "0") {
    return;
  }
  displayInput.value = displayInput.value + this.textContent;
}

function handleClickPoint() {
  if (displayInput.value === "") {
    displayInput.value = "0" + this.textContent;
    return;
  }
  displayInput.value = displayInput.value + this.textContent;
}

acButton.addEventListener("click", handleClickAc);
ceButton.addEventListener("click", handleClickCe);
pointButton.addEventListener("click", handleClickPoint);
equalButton.addEventListener("click", handleClickEqual);

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", handleClickOperation);
}

for (const digitButton of digitsButtons) {
  digitButton.addEventListener("click", handleClickDigit);
}
