<template lang='pug'>
  div.container
    div.row
      div.col
        div.product_grid

          <!-- Livros -->
          div(
            class="product"
            v-for='(objeto, index) in objetos'
            )
            div.product_image
              router-link(to='/produto-detalhe')    
                img(:src=`objeto.fotoUrl` width='100px' height='100px' @click='func(index)')

            div(class="product_extra product_sale" v-for='categoria in categorias')
              a(href="categories.html" v-if='categoria.id === objeto.categoriaId ')  {{ categoria.nome }}
              a(v-else) não tem nada aqui

            div.product_content
              div.product_title 
                a(href="product.html") {{ objeto.titulo }}

</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
    name: 'ListaLivros',
    data: function() {
        return { 
            objetos: [],
            categorias: []
        }
    },
    methods: {
        loadObjetos() {
          const url = `${baseApiUrl}/livros`
          axios.get(url).then(resposta => { this.objetos = resposta.data }).catch(showError)
        },
        loadCategorias() {
            // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
            axios.get(`${baseApiUrl}/categorias`).then(resposta => {
                this.categorias = resposta.data
            })
        },
        func(index) {
            this.$store.commit('setLivroId', this.produtos[index].id)
        }
    },
    mounted() {
        // executado após o carregamento do componente
        this.loadCategorias()
        this.loadObjetos()
    }
}
</script>

<style lang='scss'>
.product_grid { display: flex; margin-top: 100px; height: initial; flex-direction: row; justify-content: space-between; flex-wrap: wrap;  }
.product { margin-bottom: 20px; }  
</style>