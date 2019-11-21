<template lang='pug'>
  div.container
    section.categorias.row.mt-5(v-for='categoria in categorias')
      div.bt-prev 
        img(src='../assets/seta.svg' @click='show(-1)')
      div.bt-next 
        img(src='../assets/seta.svg' @click='show(+1)')

      div.livros
        h4.mb-3 {{ categoria.nome }}
        div.livro_grid

          <!-- Livros -->
          div(
            class="livro row"
            v-for='(objeto, index) in objetos'
            )
            div.livro_img
              router-link(:to='{ name: "livro", params: { id: objeto.id } }')    
                img(:src=`objeto.fotoUrl`)

            div.livro_info
              h5.mt-3 {{ objeto.titulo }}
              p {{ objeto.descricao }}
              h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ objeto.nPaginas }} Páginas
              h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ objeto.tempoVida }}  
              div(v-for='dono in donos' v-if='dono.id === objeto.proprietarioId ')
                p.mt-3 {{ dono.nome }}
                p.mt-3 {{ dono.local }}

            div.livro_actions
              div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === objeto.categoriaId ')
                a(href="/" v-if='categoria.id === objeto.categoriaId ')  #[p {{ categoria.nome }}]

              a( @click='curtir(index)' class='bt-like ml-3') #[font-awesome-icon(icon="heart")] Curtir



</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'ListaLivros',
  data: function() {
    return { 
      objetos: [],
      categorias: [], 
      donos: [], 
      curtida: { }
    }
  },
  watch: { 
    // objetos: () => {
    //   return this.objetos.filter(
    //     objeto => { 
    //       objeto.titulo.toLowerCase().includes(this.$store.state.buscar)
    //       console.log('a')
    //     }
    //   )
    // }
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
    loadDonos() {
      axios.get(`${baseApiUrl}/usuarios`).then(resposta => {
            this.donos = resposta.data
        })
    },
    // toLivro(index) {
    //     url = `livros/${this.objetos[index].id}`
    //     this.$router.push({ path: 'livros/1' })
    // }
    buscar() { },
    curtir(index) {
      this.curtida.usuarioInteressadoId = this.$store.state.user.id
      this.curtida.livroCurtidoId = this.objetos[index].id
      this.curtida.proprietarioId = this.objetos[index].proprietarioId

      axios.post(`${baseApiUrl}/curtidas`, this.curtida)
      .then(this.$toasted.global.defaultSucess())
      .catch(showError)

      this.curtida = { }
    },
    show(n) {  
      let liEls = document.querySelectorAll('.livro_grid .livro')
      let index = 0
      
      window.show = function(increase) {
        index = index + increase
        index = Math.min(Math.max(index,0), liEls.length-1)
        liEls[index].scrollIntoView({behavior: 'smooth'})
      }

      // esse bixo não é daqui
      return n
    }
  },
  mounted() {
    // executado após o carregamento do componente
    this.loadCategorias()
    this.loadObjetos()
    this.loadDonos()
  }
}
</script>

<style lang='scss'>

div.container {
  display: grid;
  padding: 0px;

  section {
    display: grid;
    grid-template-columns: 5% 90% 5%;
    grid-template-rows: 1fr;
    align-items: center;

    .bt-prev, .bt-next {
      svg { max-width: 40px;}
      cursor: pointer;
    }

    .bt-next { 
      grid-column: 3/ 4; 
      grid-row: 1/ 2; 
      transform: rotate(180deg);
    }

    .livros { 
      grid-column: 2/ 3; 
      grid-row: 1/ 2; 
      
      padding: 0px 50px;

      .livro_grid { 
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));

        height: initial; 
        flex-direction: row; 
        flex-wrap: wrap;   
        justify-content: space-between; 
      }

      .livro { 
        margin-bottom: 20px; 
        text-align: center;
      }  

      .livro_info {
        display: inline-block;
        text-align: left;
        color: #00000090;
        cursor: default;

        h6 { color:#00ABC8; }
      }

      .bt-categoria, .bt-like { 
        border-radius: 10px;
        padding: 5px 15px;
        display: inline-block;
        cursor: pointer;
        p { margin: 0px !important; } 
      }

      .bt-categoria { 
        background-color: #00ABC820; 
        a { color: #00ABC8; } 
        &:hover { box-shadow: 0px 0px 15px 2px #00ABC870; }
      }

      .bt-like { 
        background-color: #FFB60020; 
        color: #FFB600; 
        &:visited { color: #FFB600; }
        &:hover { color: #FFB600;
          box-shadow: 0px 0px 15px 2px #FFB60070; 
        }
      }
    }
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
  @media only screen and (min-width: 901px) {
    .livro {
      max-height: 500px;
      text-align: left;
      display: flex;
      margin: 10px 20px;

      .livro_img img{
        width: 200px;
        height: 200px;
      }

      .livro_info {
        max-width: 80%;
      }

      .livro_actions { 
        font-size: 14px;   
        align-self: flex-end;

        svg { 
          opacity: 0.7;
          &:hover { opacity: 1; }
        }
      }

    }


  }

}
</style>