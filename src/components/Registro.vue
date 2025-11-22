<template>
  <div class="card">
    <h2>Registrar Movimentação</h2>
    <form @submit.prevent="registrar">
      <div class="form-group">
        <label for="descricao">Descrição</label>
        <input type="text" v-model="descricao" id="descricao" placeholder="Ex: Salário, Aluguel">
      </div>
      <div class="form-group">
        <label for="valor">Valor</label>
        <input type="number" v-model.number="valor" id="valor" step="0.01" min="0.01">
      </div>
      <div class="form-group">
        <label for="tipo">Tipo</label>
        <select v-model="tipo" id="tipo">
          <option value="ganho">Ganho</option>
          <option value="gasto">Gasto</option>
        </select>
      </div>
      <div class="form-group">
        <label for="categoria">Categoria</label>
        <select v-model="categoria" id="categoria">
          <option value="fixo">Fixo</option>
          <option value="eventual">Eventual</option>
        </select>
      </div>
      <button type="submit" class="btn-submit">Adicionar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const emit = defineEmits(['transacaoAdicionada']);

const descricao = ref('');
const valor = ref(null);
const tipo = ref('ganho');
const categoria = ref('fixo');

function registrar() {
  if (!descricao.value || !valor.value || valor.value <= 0) {
    alert('Por favor, preencha a descrição e um valor válido.');
    return;
  }
  
  const novaTransacao = {
    id: Date.now(),
    descricao: descricao.value,
    valor: valor.value,
    tipo: tipo.value,
    categoria: categoria.value
  };

  emit('transacaoAdicionada', novaTransacao);

  descricao.value = '';
  valor.value = null;
}
</script>