<template>
  <div class="card">
    <h2>Saldo Atual</h2>
    <h1 :class="saldo >= 0 ? 'ganho' : 'gasto'">
      {{ formatarMoeda(saldo) }}
    </h1>
  </div>
  <div class="card">
    <h2>Últimas Movimentações</h2>
    <div class="transacao">
      <ul v-if="transacoes.length" class="lista-transacoes">
        <li v-for="(t, index) in transacoesRecentes" :key="t.id">
          <div class="transacao-info">
            <span>{{ t.descricao }} ({{ t.categoria }})</span>
            <span :class="t.tipo === 'ganho' ? 'ganho' : 'gasto'">
              {{ t.tipo === 'ganho' ? '+' : '-' }} {{ formatarMoeda(t.valor) }}
            </span>
          </div>
          <button @click="$emit('excluir-transacao', t.id)" class="btn-excluir">
            X
          </button>
        </li>
      </ul>
      <p v-else>Nenhuma transação registrada ainda.</p>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  saldo: {
    type: Number,
    required: true,
  },
  transacoes: {
    type: Array,
    required: true,
  }
});

const transacoesRecentes = computed(() => {
  return props.transacoes.slice().reverse().slice(0, 10);
});

function formatarMoeda(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}


</script>

<style scoped>
.lista-transacoes {
  list-style: none;
  padding: 0;
}

.lista-transacoes li {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.lista-transacoes li:last-child {
  border-bottom: none;
}

.ganho {
  color: #27ae60;
  font-weight: bold;
}

.gasto {
  color: #c0392b;
  font-weight: bold;
}

.transacao-info {
  flex: 1;
  display: flex;
  justify-content: space-between;
  margin-right: 10px;
}

.btn-excluir {
  color: rgb(255, 0, 0);
  border: none;
  border-radius: 4px;
  padding: 4px 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-left: 12px;
}

.btn-excluir:hover {
  background-color: #cc0000;
  color: white;
}

.lista-transacoes li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}
</style>