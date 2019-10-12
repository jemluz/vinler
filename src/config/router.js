import Vue from 'vue'
import Router from 'vue-router'

import LoginCadastro from "@/components/LoginCadastro";
import Vitrine from "@/components/Vitrine";

// import ListaUsuarios from "@/components/sections/ListaUsuarios";
// import FuncionarioData from "@/components/sections/FuncionarioData";
// import CategoriaData from "@/components/sections/CategoriaData";
// import ProdutoData from "@/components/sections/ProdutoData";
// import ProdutoDetalhes from "@/components/sections/ProdutoDetalhes";
// import Carrinho from "@/components/sections/Carrinho";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/vitrine',
      name: 'Vitrine',
      component: Vitrine
    },
    {
      path: '/auth',
      name: 'LoginCadastro',
      component: LoginCadastro
    },

  ]
})