  <template lang="pug">
  div.meus_livros

    div.livros

      div.livro_grid

        <!-- Livros -->
        div(
          class="livro row"
          v-for='(vinculado, index) in vinculados'
          )
          div.livro_img
            router-link(:to='{ name: "livro", params: { id: vinculado.id } }')    
              img(:src=`vinculado.fotoUrl`)

          div.livro_info
            h5.mt-3 {{ vinculado.titulo }}
            p {{ vinculado.descricao.slice(0,50)+'...' }}
            h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ vinculado.nPaginas }} Páginas
            h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ vinculado.tempoVida }}  
            p.mt-3 {{ vinculado.disponivel ? "Disponível" : "Indisponível"}}

          div.livro_actions
            div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === vinculado.categoriaId ')
              a(href="/" v-if='categoria.id === vinculado.categoriaId ')  #[p {{ categoria.nome }}]

            a( @click='' class='bt-like ml-3') {{ vinculado.nCurtidas ? `${vinculado.nCurtidas} Curtidas` : `0 Curtidas`}} 
          
</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'MeusLivros',
  computed: mapState(["user"]),
  data: function()  {
    return {
      vinculados: [],
      categorias: [],
    }
  },
  methods: {
    loadVinculados() {
      const url = `${baseApiUrl}/usuarios/vinculados/${this.user.id}`

      axios.get(url).then(resposta => { 
        this.vinculados = resposta.data 
      })
      .catch(showError)

    },
    loadCategorias() {
      // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
          this.categorias = resposta.data

      })
    },
    curtir(index) {
      this.curtida.usuarioInteressadoId = this.$store.state.user.id
      this.curtida.livroCurtidoId = this.objetos[index].id
      this.curtida.proprietarioId = this.objetos[index].proprietarioId

      axios.post(`${baseApiUrl}/curtidas`, this.curtida)
      .then(this.$toasted.global.defaultSucess())
      .catch(showError)

      this.curtida = { }
    },
  },
  mounted() {
    this.loadVinculados()
    this.loadCategorias()
  }
}
</script>

<style lang='scss'>

div.meus_livros {
  display: grid;
  padding: 0px;

    .livros { 
      grid-column: 2/ 3; 
      grid-row: 1/ 2; 
      
      padding: 50px 50px;

      .livro_grid { 
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

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
        // max-width: 200px;
        text-align: left;
        display: flex;
        margin: 10px 20px;

        .livro_img img{
          width: 200px;
          height: 200px;
          border-radius: 10px;
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