<template>
  <div id="app-container">
    <header>
      <h1><span>NULL</span>BANK</h1>
      <nav>
        <button @click="viewAtual = 'visaoGeral'">Visão Geral</button>
        <button @click="viewAtual = 'registrar'">Registrar Movimentação</button>
        <button @click="viewAtual = 'calculadora'">Calculadora</button>
      </nav>
    </header>

    <main>
      <Geral v-if="viewAtual === 'visaoGeral'" :saldo="saldo" :transacoes="transacoes" @excluir-transacao="excluirTransacao" />
      <Registro v-if="viewAtual === 'registrar'" @transacao-adicionada="adicionarTransacao" />
      <Calculadora v-if="viewAtual === 'calculadora'" />
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import Geral from './components/Geral.vue';
import Registro from './components/Registro.vue';
import Calculadora from './components/Calculadora.vue';

const viewAtual = ref('visaoGeral');
const transacoes = ref([]);

const saldo = computed(() => {
  return transacoes.value.reduce((acc, t) => {
    return t.tipo === 'ganho' ? acc + t.valor : acc - t.valor;
  }, 0);
});

function adicionarTransacao(novaTransacao) {
  transacoes.value.push(novaTransacao);
  salvarDados();
  viewAtual.value = 'visaoGeral';
}

function salvarDados() {
  localStorage.setItem('meuCashTransacoes', JSON.stringify(transacoes.value));
}

function carregarDados() {
  const dadosSalvos = localStorage.getItem('meuCashTransacoes');
  if (dadosSalvos) {
    transacoes.value = JSON.parse(dadosSalvos);
  }
}

function excluirTransacao(id) {
  const index = transacoes.value.findIndex(t => t.id === id);
  if (index !== -1) {
    transacoes.value.splice(index, 1);
  }
  salvarDados();
}

onMounted(carregarDados);
</script>

<style>
#app-container{
  width: 100%;
  max-width: 800px;
  margin: 20px auto;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.9);
  overflow: hidden;
}

header {
    background-color: #9e00dd;
    color: white;
    padding: 20px;
    text-align: center;
}

header h1 {
    margin-bottom: 15px;
}

header h1 span {
    color: #000000;
}

header nav button {
    background-color: #ffffff;
    color: black;
    border: none;
    padding: 10px 20px;
    margin: 0 10px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;
}

header nav button:hover {
    background-color: #440072;
    color:#ffffff;;
}

@media (max-width: 600px) {
  header nav {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  header nav button {
    width: 100%;
    margin: 0;
  }
}
</style>