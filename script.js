// Selecionar o display
var display = document.getElementById("display");

// Selecionar os botões
var buttons = document.querySelectorAll(".calcularButtons");

// Variáveis de controle
var pointCounter = 0; // Para limitar o uso de apenas um ponto decimal
var pointLimit = 1;

// Adicionando eventos de clique para todos os botões
buttons.forEach(button => {
    button.addEventListener("click", function() {
        var value = this.value;

        if (value === "C") {
            clearDisplay();
        } else if (value === "CE") {
            deleteLastDigit();
        } else if (value === "=") {
            calculateResult();
        } else {
            writeOnDisplay(value);
        }
    });
});

// Função para limpar o display
function clearDisplay() {
    display.value = "";
    pointCounter = 0; // Reseta o contador de pontos
}

// Função para apagar o último dígito
function deleteLastDigit() {
    if (display.value.length > 0) {
        if (display.value[display.value.length - 1] === ".") {
            pointCounter = 0; // Reseta o contador de pontos se o último dígito for um ponto
        }
        display.value = display.value.slice(0, -1); // Remove o último caractere
    }
}

// Função para escrever no display
function writeOnDisplay(value) {
    // Se for um operador e o último caractere também for um operador, remove o último
    if (verifyOperator(value)) {
        pointCounter = 0;
        if (verifyOperator(display.value.slice(-1))) {
            deleteLastDigit();
        }
    }

    // Verificar se o ponto já foi adicionado
    if (value === ".") {
        if (pointCounter >= pointLimit) {
            return; // Impede mais de um ponto decimal
        } else {
            pointCounter++;
        }
    }

    // Adiciona o valor ao display
    display.value += value;
}

// Função para verificar operadores
function verifyOperator(value) {
    return value === "+" || value === "-" || value === "*" || value === "/";
}

// Função para calcular o resultado
function calculateResult() {
    try {
        // Remove o último caractere se for um operador
        if (verifyOperator(display.value.slice(-1))) {
            deleteLastDigit();
        }

        // Avalia a expressão
        var result = eval(display.value);
        display.value = result;
        pointCounter = 0; // Reseta o contador de pontos após o cálculo
    } catch (e) {
        display.value = "Erro";
    }
}
