<template>
    <span>
        <body class="bg-light">
            <div class="container">
        <div class="row">
            <div class="col-md-2 order-md-2 mb-4">
            <h4 class="d-flex justify-content-between align-items-center mb-3">
                <span class="text-muted">Dados do Veículo</span>
            </h4>
            
            <ul class="list-group mb-3" v-for="carro in carros" v-bind:key="carro.id" >

                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="mb-6 my-0">{{carro.modelo}}</h6>
                        <small class="text-muted">Modelo</small>
                    </div>
                    
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">{{carro.marca}}</h6>
                        <small class="text-muted">Marca</small>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">{{carro.ano}}</h6>
                        <small class="text-muted">Ano</small>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">{{carro.cor}}</h6>
                        <small class="text-muted">Cor</small>
                    </div>
                </li>
                <li class="list-group-item d-flex justify-content-between lh-condensed">
                    <div>
                        <h6 class="my-0">R$ {{carro.preco}}</h6>
                        <small class="text-muted">Valor</small>
                    </div>
                </li>
                <router-link v-bind:style="{ marginTop: 20 +'px'}" to="/" class="btn btn-warning btn-lg btn-block">Voltar</router-link>
            </ul>

            </div>

            <div class="col-md-2 order-md-2 mb-4" v-for="carro in carros" v-bind:key="carro.id" >
                <img class="figure" v-bind:style="{ marginTop: 70 +'px'}" v-bind:src="carro.foto" width="400" height="250">
                <figcaption v-bind:style="{ marginLeft: 5 +'px'}">Imagem do Veículo</figcaption>
            </div>


            <div class="col-md-5 order-md-1">
            <h4 class="mb-3">Preencher Dados da Proposta</h4>


            <form id="cadastraProposta" method="post" @submit="formSubmit">

                <div class="row">

                <div class="col-md-12 mb-3">
                    <label for="nome">Nome</label>
                    <input type="text" class="form-control" id="nome" placeholder="Nome Completo" name="nome" v-model="nome" required>

                    </div>
                </div>

                <div class="mb-3">
                    <label for="email">Email</label>
                    <input type="text" class="form-control" id="email" placeholder="Inserir Email" name="email" v-model="email" required>
                </div>

                <div class="mb-3">
                    <label for="valor">Valor em Dinheiro (R$)</label>
                    <input type="text" class="form-control" id="valor" placeholder="Inserir valor em Reais" name="valor" v-model="valor" required>
                </div>

                <div class="mb-3">
                    <label for="item_troca">Ítem para Troca <span class="text-muted">(Optional)</span></label>
                    <input type="text" class="form-control" id="item_troca" placeholder="Inserir Tipo de Veículo / Modelo / Marca" name="item_troca" v-model="item_troca">
                </div>

                <div class="mb-3">
                    <label for="valor_item">Valor do Ítem de Troca (R$) <span class="text-muted">(Optional)</span></label>
                    <input type="text" class="form-control" id="valor_item"
                        placeholder="Inserir valor equivalente em reais ao Ítem de Troca" name="valor_item" v-model="valor_item">
                </div>

                <div class="mb-3">
                    <label for="detalhes">Detalhes <span class="text-muted">(Optional)</span></label>
                    <textarea type="text" v-bind:style="{ height: 70 +'px'}" class="form-control" id="detalhes" placeholder="Detalhes" name="detalhes" v-model="detalhes"></textarea>
                </div>


                <button class="btn btn-warning btn-lg btn-block" type="submit">Realizar Proposta</button>
            </form>
            {{proposta}}
            </div>
        </div>

        <footer class="my-5 pt-5 text-muted text-center text-small">
            <p class="float-right"><a href="#">Voltar para o Topo</a></p>
            <p>© 1982 Revenda Herbie - Carros Antigos, Inc.</p>
        </footer>
        </div>

        </body>
    </span>
</template>

<script>
import axios from "axios";
export default {
    data() {
        return {
            carros: [],
            id: localStorage.getItem('carro_id'),

            nome: "",
            email: "",
            valor: "",
            item_troca: "",
            valor_item: "",
            carro_id: localStorage.getItem('carro_id'),
            detalhes: "",
            
        }
        
    }, methods: {
        listar() {
            axios.get(this.$urlAPI+`/carros/${this.id}`)
            .then(response => (this.carros = response.data))
            this.filtro = "";
        },
        formSubmit(e) {
            e.preventDefault();
            axios.post('http://127.0.0.1:5000/propostas', {
                nome: this.nome,
                email: this.email,
                valor: this.valor,
                item_troca: this.item_troca,
                valor_item: this.valor_item,
                carro_id: this.carro_id,
                detalhes: this.detalhes,
            })
            alert('Proposta Cadastrada com Sucesso')
            this.nome = ""
            this.email = ""
            this.valor = ""
            this.item_troca = ""
            this.valor_item = ""
            this.detalhes = ""
        }

    },
    mounted() {
        this.listar()
    },
    filters: {
        estiloMoeda(value) {
            return value.toLocaleString('pt-br', {minimumFractionDigits: 2})
        }
    }
}
</script>

<style scoped>

.figure {
  text-align: center;
  font-style: italic;
  font-size: smaller;
  text-indent: 0;
  border: thin silver solid;
  margin: 0.5em;
  padding: 0.5em;
}


</style>