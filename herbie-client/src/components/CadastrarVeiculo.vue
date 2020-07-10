<template>
<div class="container">
  <h2>Cadastro de Veículo</h2>
  <p>Cadastre seu veículo e aguarde para receber novas ofertas</p>
  <form form class="" method="post" @submit="formSubmit">

    <div class="form-group">
        <label for="nome">nome:</label>
        <input type="text" class="form-control" id="nome" placeholder="nome" name="nome" v-model="nome" required>
    </div>
    <div class="form-group">
        <label for="email">email:</label>
        <input type="text" class="form-control" id="email" placeholder="email" name="email" v-model="email" required>
    </div>
    <div class="form-group">
        <label for="valor">valor:</label>
        <input type="text" class="form-control" id="valor" placeholder="valor" name="valor" v-model="valor" required>
    </div>
    <div class="form-group">
        <label for="item_troca">Preço:</label>
        <input type="text" class="form-control" id="item_troca" placeholder="item_troca" name="item_troca" v-model="item_troca" required>
    </div>
    <div class="form-group">
        <label for="valor_item">valor_item:</label>
        <input type="text" class="form-control" id="valor_item" placeholder="valor_item" name="valor_item" v-model="valor_item" required>
    </div>
    <div class="form-group">
        <label for="detalhes">detalhes:</label>
        <input type="text" class="form-control" id="detalhes" placeholder="detalhes" name="detalhes" v-model="detalhes" required>
    </div>
    {{proposta}}
    {{this.nome}}
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
            

            nome: "",
            email: "",
            valor: "",
            item_troca: "",
            valor_item: "",
            carro_id: 2,
            detalhes: "",
        
        }
    }, methods: {
        listarMarcas() {
            axios.get(this.$urlAPI+'/marcas')
            .then(response => (this.marcas = response.data))
        },
        
        cadastraVeiculo() {
            axios.post(this.$urlAPI+'/propostas', {
                proposta: this.proposta
            })
        },
        formSubmit(e) {
            e.preventDefault();
            axios.post('http://127.0.0.1:5000/propostas', {
                nome: this.nome,
                email: this.email,
                valor: this.valor,
                item_troca: this.item_troca,
                valor_item: this.valor_item,
                carro_id: 2,
                detalhes: this.detalhes,
            })
            alert('Proposta Cadastrada com Sucesso')
            
        }
    },

    mounted() {
        this.listarMarcas()
    }
}
</script>

<style scoped>

</style>