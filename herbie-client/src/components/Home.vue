<template>
    <span>

        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <a class="navbar-brand" v-bind:style="{ color: '#FF7518' }">Revenda Herbie</a>
                <img class="circular--square" src="../assets/logo.jpg" alt="Logo" v-bind:style="{ width: 55 + 'px' }">
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarCollapse">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item active">
                            <button class="btn btn-outline-warning ml-sm-4 mr-sm-2" @click.prevent="listar">Destaques</button>
                        </li>
                        <li class="nav-item">
                            <button class="btn btn-outline-warning mr-sm-2" @click.prevent="listarTodos">Todos os Veículos</button>
                        </li>
                    </ul>
                    <form class="form-inline mt-2 mt-md-0">
                        <input class="form-control mr-sm-2" type="text" placeholder="Buscar Modelo" aria-label="Buscar Modelo" v-model="filtro" @keyup="pesquisar">
                        <button class="btn btn-outline-warning my-2 my-sm-0" type="submit" @click.prevent="listar">Limpar</button>
                    </form>
                </div>
            </nav>
        </header>


        <main role="main">

            <div id="myCarousel" class="carousel slide" data-ride="carousel">
                <ol class="carousel-indicators">
                    <li data-target="#myCarousel" data-slide-to="0" class=""></li>
                    <li data-target="#myCarousel" data-slide-to="1" class=""></li>
                    <li data-target="#myCarousel" data-slide-to="2" class="active"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item">
                        <img src="../assets/carro1.jpg" alt="Mais Famosos">
                        <svg class="bd-placeholder-img" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect width="100%" height="100%" fill="#777"></rect>
                            
                        </svg>
                        <div class="container">
                        <div class="carousel-caption text-left">
                            <h1>Revenda Herbie</h1>
                            <p>Aqui você Encontra os Melhores Carros Antigos</p>
                            
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item">
                        <img src="../assets/carro2.jpg" alt="Mais Famosos">
                        <svg class="bd-placeholder-img" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect width="100%" height="100%" fill="#777"></rect>
                        </svg>
                        <div class="container">
                        <div class="carousel-caption">
                            
                            <h1>Veículos de todo o Rio Grande do Sul</h1>
                            <h2>Envie Já a sua Proposta</h2>
                            
                        </div>
                        </div>
                    </div>
                    <div class="carousel-item active">
                        <img src="../assets/carro3.jpg" alt="Mais Famosos">
                        <svg class="bd-placeholder-img" width="100%" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" focusable="false" role="img">
                            <rect width="100%" height="100%" fill="#777"></rect>
                        </svg>
                        <div class="container">
                            <div class="carousel-caption text-right">
                                <h1>Aceitamos Troca de Veículos</h1>
                                <p>A melhor revenda do Estado</p>
                                <p>38 Anos de Experiência</p>
                                
                            </div>
                        </div>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#myCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
                <a class="carousel-control-next" href="#myCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only"></span>
                </a>
            </div>


            <!-- Marketing messaging and featurettes
            ================================================== -->
            <!-- Wrap the rest of the page in another container to center all the content. -->

            <div class="container marketing">
                <!-- Three columns of text below the carousel -->
                <div class="row" v-if="carros.length > 0">
                    <div class="col-lg-4" v-for="carro in carros" v-bind:key="carro.id" >
                        <img v-bind:src="carro.foto" class="bd-placeholder-img rounded-circle" width="350" height="250">
                        
                        <h1>{{carro.modelo}}</h1>
                        <h3>{{carro.marca}}</h3>
                        <h4>R$ {{carro.preco | estiloMoeda}}</h4>
                        <p>Ano {{carro.ano}}</p>
                        <p>
                            <button class="btn btn-secondary" v-on:click="detailsID(carro.id)">Realizar Proposta »
                            </button>
                        </p>

                        
                    </div><!-- /.col-lg-4 -->
                </div><!-- /.row -->
                <div class="row" v-if="carros.length === 0">
                    <p>Não há veículos...</p>
                </div>

            </div><!-- /.container -->


            <!-- FOOTER -->
            <footer class="container">
                <p class="float-right"><a href="#">Voltar para o Topo</a></p>
                <p>© 1982 Revenda Herbie - Carros Antigos, Inc.</p>
            </footer>
        </main>
       
    </span>
    
</template>

<script>
    import axios from "axios";

export default {
    data() {
        return {
            carros: [],
            filtro: "",
            toggle: false,
            carro_id: ''
        }
    }, methods: {
        listar() {
            axios.get(this.$urlAPI+'/carros/destaque')
            .then(response => (this.carros = response.data))
            this.filtro = "";
        },
        pesquisar() {
            if (this.filtro.length == 0) {
                this.listar();
            } else {
                axios.get(this.$urlAPI+`/carros/filtro/${this.filtro}`)
                .then(response => (this.carros = response.data))
            }
        },
        listarTodos() {
            axios.get(this.$urlAPI+'/carros')
            .then(response => (this.carros = response.data))
            this.filtro = "";
        },
        detailsID(id) {
            localStorage.setItem('carro_id', id)
            this.$router.push({ path: '/details', params: { id } })
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

.circular--square {
  border-radius: 50%;
}

/* GLOBAL STYLES
-------------------------------------------------- */
/* Padding below the footer and lighter body text */

body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

h1 {
    margin-top: 10px;
}

h1:hover {
    display: block;
    text-decoration: underline;
}

.bd-placeholder-img:hover {
    top:-2px;
    border-bottom:2px solid #999;
    padding-bottom:2px
}



/* CUSTOMIZE THE CAROUSEL
-------------------------------------------------- */

/* Carousel base class */
.carousel {
  margin-bottom: 4rem;
}
/* Since positioning the image, we need to help out the caption */
.carousel-caption {
  bottom: 3rem;
  z-index: 10;
}

/* Declare heights because of positioning of img element */
.carousel-item {
  height: 32rem;
}
.carousel-item > img {
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  height: 32rem;
}


/* MARKETING CONTENT
-------------------------------------------------- */

/* Center align the text within the three columns below the carousel */
.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}
.marketing h2 {
  font-weight: 400;
}
.marketing .col-lg-4 p {
  margin-right: .75rem;
  margin-left: .75rem;
}


/* Featurettes
------------------------- */

.featurette-divider {
  margin: 5rem 0; /* Space out the Bootstrap <hr> more */
}

/* Thin out the marketing headings */
.featurette-heading {
  font-weight: 300;
  line-height: 1;
  letter-spacing: -.05rem;
}


/* RESPONSIVE CSS
-------------------------------------------------- */

@media (min-width: 40em) {
  /* Bump up size of carousel content */
  .carousel-caption p {
    margin-bottom: 1.25rem;
    font-size: 1.25rem;
    line-height: 1.4;
  }

  .featurette-heading {
    font-size: 50px;
  }
}

@media (min-width: 62em) {
  .featurette-heading {
    margin-top: 7rem;
  }
}


</style>