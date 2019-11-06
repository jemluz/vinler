<template lang='pug'>
  div.container
      div.col
        h3 Livros
        div.livro_grid

          <!-- Livros -->
          div(
            class="livro"
            v-for='(objeto, index) in objetos'
            )
            div.product_image
              router-link(to='/')    
                img(:src=`objeto.fotoUrl` width='120px' height='120px' @click='func(index)')

            div.product_content
              div.product_title 
                a(href="/") #[h5 {{ objeto.titulo }}]

            div.product_content
              div.product_title 
                a(href="/") #[p {{ objeto.descricao }}]

            div(class="categoria_livro" v-for='categoria in categorias')
              a(href="/" v-if='categoria.id === objeto.categoriaId ')  #[p {{ categoria.nome }}]
            

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

div.container {
  display: grid;
  padding: 0px;

  .livro_grid { 
    display: flex;
    height: initial; 
    flex-direction: row; 
    justify-content: space-between; 
    flex-wrap: wrap;  
  }

  .livro { margin-bottom: 20px; }  

  .livro {
    a { color: gray; }
  }

  .categoria_livro { 
    background-color: #f1f1f1; 
    border-radius: 20px;
    padding: 5px 15px;
    width: auto;
    display: inline-block;
    p { margin: 0px !important; } 

    &:hover { box-shadow: 0px 0px 10px 2px #00000030; }
  }

  // MOBILE
  @media only screen and (max-width: 900px) {

    grid-template-columns: .5fr 3fr .5fr; 

    .col {
      grid-column: 2 / 3;
      padding: 0px;
    }

    .livro_grid {
      margin-top: 50px;      
    }

    .livro {
      max-width: 120px;
    }
      
  }

  // DESKTOP
  @media only screen and (min-width: 901px) {}

}
</style>