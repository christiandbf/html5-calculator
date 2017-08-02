class Display {
    constructor() {
        this.contentDisplay = document.getElementById("content-display");
        this.clearDisplay();
    }

    clearDisplay() {
        this.contentDisplay.innerText = "0";
    }

    showAlert(alert, str) {        
        this.showInDisplay(alert);            
        setTimeout(() => {
            this.showInDisplay(str);            
        }, 400);
    }

    showInDisplay(str) {
        this.contentDisplay.innerText = str;
    }
}


class Value {
    constructor() {
        this.currentValue = 0;
        this.previousValue = null;
        this.point = null;
    }

    addPoint() {
        if (this.point == null) this.point = true;
    }

    addDigitToCurrentValue(digit) {
        if (this.point) {
            digit = "." + digit;
            this.point = false;
        }
        this.currentValue == 0 ?
                this.currentValue = parseFloat(digit) : 
                this.currentValue = parseFloat(this.currentValue.toString() + digit);
    }
    
    getCurrentValue() {
        return this.currentValue;
    }

    getPreviousValue() {
        return this.previousValue;
    }

    setCurrentValue(value) {
        this.currentValue = value;
    }

    setCurrentToPrevious() {
        this.previousValue = this.currentValue;
        this.currentValue = 0;
        this.point = null;
    }

    isTherePoint() {
        return this.point === false;
    }

    resetCurrentValue() {
        this.currentValue = 0;
        this.point = null;
    }
}


class State {
    constructor(maxdigits) {
        this.values = new Value();
        this.showingResult = false;
        this.maxdigits = maxdigits;        
    }

    isShowingResult() {
        return this.showingResult;
    }

    getValues() {
        return this.values;
    }

    isFullCurrentValue() {
        return this.values.getCurrentValue().toString().length >= this.maxdigits;
    }

    setShowingResult(bool) {
        this.showingResult = bool;
    }
}


class Operation {
    constructor() {
        this.operation = null;
    }

    isThereOperation() {
        return this.operation != null;
    }

    setOperation(operation) {
        this.operation = operation;
    }

    doOperation(firstValue, secondValue) {
        var result;
        switch(this.operation){
            case "add":
                result = firstValue + secondValue;                
                break;
            case "subtract":
                result = firstValue - secondValue;                
                break;
            case "divide":
                result = firstValue / secondValue;                
                break;
            case "multiply":
                result = firstValue * secondValue;                
                break;       
        }
        this.operation = null;
        return result;
    }            
}


class Calculator {
    constructor() {
        this.MAXDIGITS = 12; 
        this.state = new State(this.MAXDIGITS);
        this.operation = new Operation();
        this.display = new Display();
    }

    ceButton() {
        this.state.getValues().resetCurrentValue();
        this.display.clearDisplay();
    }

    numberButton(digit) {
        if (this.state.isShowingResult()) {
            this.display.showAlert("THIS IS A RESULT", this.state.getValues().getCurrentValue());
        } else if (this.state.isFullCurrentValue()) {
            this.display.showAlert("NO MORE DIGITS", this.state.getValues().getCurrentValue());
        } else {
            this.state.getValues().addDigitToCurrentValue(digit);
            this.display.showInDisplay(this.state.getValues().getCurrentValue());            
        }
    }

    pointButton() {
        if (this.state.getValues().isTherePoint()) {
            this.display.showAlert("THERE IS A POINT", this.state.getValues().getCurrentValue());
        } else {
            this.state.getValues().addPoint();
            this.display.showInDisplay(this.state.getValues().getCurrentValue() + ".");            
        }
    }

    operationButton(operation) {
        this.state.setShowingResult(false);
        if (this.operation.isThereOperation()) {
            this.resultButton();
            setTimeout(() => {
                this.state.getValues().setCurrentToPrevious();
                this.operation.setOperation(operation);
                this.display.showInDisplay(this.state.getValues().getCurrentValue());
            }, 400);
        } else {
            this.state.getValues().setCurrentToPrevious();
            this.operation.setOperation(operation);
            this.display.showInDisplay(this.state.getValues().getCurrentValue());
        }
    }

    resultButton() {
        if (this.operation.isThereOperation()) {
            var firstNumber = this.state.getValues().getPreviousValue();
            var secondNumber = this.state.getValues().getCurrentValue();
            var result = this.operation.doOperation(firstNumber, secondNumber);
            this.state.getValues().setCurrentValue(result);
            this.display.showInDisplay(this.state.getValues().getCurrentValue());
            this.state.setShowingResult(true);
        }
    }
}

var calculator = null;

document.getElementById("ac-button").addEventListener("click", () => {
    calculator = new Calculator();
});

document.getElementById("ce-button").addEventListener("click", () => {
    if (calculator != null) calculator.ceButton();
});

var numberButtons = document.getElementsByClassName("btn-number");
for (let i = 0; i < numberButtons.length; i++) {
    let numberButton = numberButtons[i];
    numberButton.addEventListener("click", () => {
        var digit = numberButton.innerText;
        if (calculator != null) calculator.numberButton(digit);
    });
}

document.getElementById("point-button").addEventListener("click", () => {
    if (calculator != null) calculator.pointButton();
});

var operationButtons = document.getElementsByClassName("btn-operation");
for (let i = 0; i < operationButtons.length; i++) {
    let operationButton = operationButtons[i];
    operationButton.addEventListener("click", () => {
        var operation = operationButton.getAttribute("name");
        if (calculator != null) calculator.operationButton(operation);       
    });
}

document.getElementById("result-button").addEventListener("click", () => {
    if (calculator != null) calculator.resultButton();
});