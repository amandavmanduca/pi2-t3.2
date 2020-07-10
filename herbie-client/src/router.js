import Vue from 'vue'
import VueRouter from 'vue-router'


import Home from './components/Home.vue'
import Detalhes from './components/Detalhes.vue'
import Veiculo from './components/CadastrarVeiculo.vue'


Vue.use(VueRouter)

export default new VueRouter({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/details', component: Detalhes },
        { path: '/teste', component: Veiculo },

    ]
})