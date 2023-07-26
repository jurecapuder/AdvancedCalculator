let output = document.getElementById('output');
let expression = '';

function insertChar(char) {
    expression += char;
    updateOutput();
}

function insertFunction(func) {
    expression += func + '(';
    updateOutput();
}

function clearOutput() {
    expression = '';
    updateOutput();
}

function deleteChar() {
    expression = expression.slice(0, -1);
    updateOutput();
}

function updateOutput() {
    output.textContent = expression;
}

function calculate() {
    try {
        const result = eval(expression);
        expression = result.toString();
    } catch (error) {
        expression = 'Error';
    }
    updateOutput();
}

function handleKeyPress(event) {
    const keyPressed = event.key;
    if (
        /[0-9+\-*/().]/.test(keyPressed) || // Allow digits, basic operators, and parentheses
        (keyPressed === 'Enter' || keyPressed === '=') // Allow Enter or Equals for calculation
    ) {
        if (keyPressed === 'Enter' || keyPressed === '=') {
            calculate();
        } else {
            insertChar(keyPressed);
        }
    } else if (keyPressed === 'Backspace') {
        deleteChar();
    } else if (keyPressed === 'Escape') {
        clearOutput();
    }
}

// Listen for keypress events on the document
document.addEventListener('keydown', handleKeyPress);

// Update the expression when the user clicks a button
document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('click', () => {
        const char = button.textContent.trim();
        if (char === '=') {
            calculate();
        } else if (char === 'C') {
            clearOutput();
        } else if (char === 'DEL') {
            deleteChar();
        } else {
            insertChar(char);
        }
    });
});
