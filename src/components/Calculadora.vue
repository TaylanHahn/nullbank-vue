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
import { ref } from 'vue';

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
</script>

<style scoped>
.calculator {
  max-width: 320px;
  margin: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
}
.display {
  background-color: #2c3e50;
  color: white;
  font-size: 2.5em;
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
  padding: 20px;
  font-size: 1.5em;
  cursor: pointer;
  transition: background-color 0.2s ease;
}
.btn:hover {
  background-color: #f0f0f0;
}
.btn.operador {
  background-color: #5334db;
  color: white;
}
.btn.operador:hover {
  background-color: #36228b;
}
.btn.equals {
  background-color: #644ccf;
  color: white;
}
.btn.equals:hover {
  background-color: #2c2191;
}
</style>