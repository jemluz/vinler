<template lang="pug">
  div.meus_livros
        
        div.content.row

          <!-- Lista de Livros -->
          div(
            class="livro mr-5 "
            v-for='(vinculado, index) in vinculados'
            )
 
            div.livro_foto
              router-link(to='/livro-detalhe')    
                img(:src='vinculado.fotoUrl' width='150px' height='150px' @click='func(index)')

            div.livro_titulo
              div.product_title 
                a(href="/") {{ vinculado.titulo }}

            div(class="categoria" v-for='categoria in categorias')
              a(href="/" v-if='categoria.id === vinculado.categoriaId ')  {{ categoria.nome }}
</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'MeusLivros',
  computed: mapState(["user"]),
  data: () => {
    return {
      vinculados: [],
      categorias: []
    }
  },
  methods: {
    loadVinculados() {
      const url = `${baseApiUrl}/usuarios/vinculados/${this.user.id}`
      axios.get(url).then(resposta => { this.vinculados = resposta.data }).catch(showError)
    },
    loadCategorias() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
          this.categorias = resposta.data
      })
    }
  },
  mounted() {
    this.loadVinculados()
    this.loadCategorias()
  }
}
</script>

<style>

</style>