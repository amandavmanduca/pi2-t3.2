<template>
<div class="container">
  <h2>Cadastro de Propostas</h2>
  <p>Envie sua Proposta</p>
  <form form class="" method="post" @submit="cadastraProposta">

    <div class="form-group">
        <label for="nome">Nome:</label>
        <input type="text" class="form-control" id="nome" placeholder="Nome Completo" name="nome" required>
    </div>
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" class="form-control" id="email" placeholder="Inserir Email" name="email" required>
    </div>
    <div class="form-group">
        <label for="valor">Valor:</label>
        <input type="number" class="form-control" id="valor" placeholder="Inserir valor em Reais" name="valor" required>
    </div>
    <div class="form-group">
        <label for="item_troca">Item para Troca:</label>
        <input type="text" class="form-control" id="item_troca" placeholder="Inserir Tipo de Veículo / Modelo / Marca" name="item_troca">
    </div>
    <div class="form-group">
        <label for="valor_item">Valor do Item de Troca:</label>
        <input type="text" class="form-control" id="valor_item" placeholder="Inserir valor equivalente em reais ao Ítem de Troca" name="valor_item">
    </div>
    <div class="form-group">
        <label for="detalhes">Detalhes:</label>
        <input type="text" class="form-control" id="detalhes" placeholder="Detalhes" name="detalhes">
    </div>

    <button type="submit" class="btn btn-primary">Cadastrar</button>
  </form>
</div>

</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            marcas: [],
            propostas: [],
            id: localStorage.getItem('carro_id'),
            proposta: {
                nome: "",
                email: "",
                valor: "",
                item_troca: "",
                valor_item: "",
                carro_id: localStorage.getItem('carro_id'),
                detalhes: "",
            },
        }
    }, methods: {
        listar() {
            axios.get(this.$urlAPI+`/carros/${this.id}`)
            .then(response => (this.carros = response.data))
            this.filtro = "";
        },
        cadastraProposta() {
            axios.post(this.$urlAPI+'/propostas', {
                proposta: this.proposta
            })
            alert('Proposta cadastrada com sucesso.')
        }
    },
    mounted() {
        this.listar()
    }
}
</script>

<style scoped>

</style>