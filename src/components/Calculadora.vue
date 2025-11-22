<template>
  <div class="card">
    <h2>Calculadora</h2>
    <div class="calculator">
      <div class="display">{{ inputAtual }}</div>
      <div class="buttons">
        <button @click="limpar" class="btn operador">C</button>
        <button @click="setOperador('/')" class="btn operador">÷</button>
        <button @click="setOperador('*')" class="btn operador">×</button>
        <button @click="setOperador('-')" class="btn operador">−</button>
        
        <button @click="setNumero('7')" class="btn">7</button>
        <button @click="setNumero('8')" class="btn">8</button>
        <button @click="setNumero('9')" class="btn">9</button>
        <button @click="setOperador('+')" class="btn operador" style="grid-row: span 2;">+</button>

        <button @click="setNumero('4')" class="btn">4</button>
        <button @click="setNumero('5')" class="btn">5</button>
        <button @click="setNumero('6')" class="btn">6</button>

        <button @click="setNumero('1')" class="btn">1</button>
        <button @click="setNumero('2')" class="btn">2</button>
        <button @click="setNumero('3')" class="btn">3</button>
        <button @click="calcular" class="btn equals" style="grid-row: span 2;">=</button>
        
        <button @click="setNumero('0')" class="btn" style="grid-column: span 2;">0</button>
        <button @click="setDecimal" class="btn">.</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const inputAtual = ref('0');
const valorAnterior = ref(null);
const operador = ref(null);
const operadorClicado = ref(false);

const limpar = () => {
  inputAtual.value = '0';
  valorAnterior.value = null;
  operador.value = null;
  operadorClicado.value = false;
};

const setNumero = (number) => {
  if (operadorClicado.value) {
    inputAtual.value = '';
    operadorClicado.value = false;
  }
  if (inputAtual.value === '0') {
    inputAtual.value = number;
  } else {
    inputAtual.value += number;
  }
};

const setDecimal = () => {
  if (!inputAtual.value.includes('.')) {
    inputAtual.value += '.';
  }
};

const setOperador = (op) => {
  if (valorAnterior.value !== null) {
    calcular();
  }
  valorAnterior.value = parseFloat(inputAtual.value);
  operador.value = op;
  operadorClicado.value = true;
};

const calcular = () => {
  if (operador.value === null || valorAnterior.value === null) return;
  
  const valorFloatAtual = parseFloat(inputAtual.value);
  let result;

  switch (operador.value) {
    case '+': result = valorAnterior.value + valorFloatAtual; break;
    case '-': result = valorAnterior.value - valorFloatAtual; break;
    case '*': result = valorAnterior.value * valorFloatAtual; break;
    case '/': result = valorAnterior.value / valorFloatAtual; break;
  }

  inputAtual.value = String(result);
  valorAnterior.value = null;
  operador.value = null;
};

// Integração com teclado (pesquisa com IA)
const handleKeyboard = (event) => {
  const key = event.key;

  // Verifica se é número de 0-9
  if (/^[0-9]$/.test(key)) {
    setNumero(key);
  } 
  // verifica operadores
  else if (['+', '-', '*', '/'].includes(key)) {
    setOperador(key);
  } 
  // verifica enter ou = para calcular
  else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    calcular();
  } 
  // verifica ponto ou virgula para decimais
  else if (key === '.' || key === ',') {
    setDecimal();
  } 
  // verifica Esc para limpar tudo
  else if (key === 'Escape') {
    limpar();
  }
};

// Adiciona o evento ao carregar o componente
onMounted(() => {
  window.addEventListener('keydown', handleKeyboard);
});

// Remove o evento ao sair do componente (Isso é muito importante!)
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyboard);
});

</script>

<style scoped>
.calculator {
  max-width: 100%;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.display {
  background-color: #2c3e50;
  color: white;
  font-size: 3em;
  padding: 20px;
  text-align: right;
  font-family: 'Courier New', Courier, monospace;
}
.buttons {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.btn {
  background-color: #fdfdfd;
  border: 1px solid #eee;
  padding: 16px;
  font-size: 2em;
  font-family: monospace, sans-serif;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn:hover {
  background-color: #f0f0f0;
}
.btn.operador {
  background-color: #9e00dd;
  color: white;
  font-size: 2em;
  font-family: monospace, sans-serif;
}
.btn.operador:hover {
  background-color: #7a00aaff;
}
.btn.equals {
  background-color: #644ccf;
  color: white;
}
.btn.equals:hover {
  background-color: #2c3e50;
}
</style>