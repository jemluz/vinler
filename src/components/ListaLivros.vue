<template lang='pug'>
  div.container
    section.categorias.row.mt-5.mb-5
      //- section.categorias.row.mt-5(v-for='categoria in categorias')}
      //- div.bt-prev 
      //-   img(src='../assets/seta.svg' @click='show(-1)')
      //- div.bt-next 
      //-   img(src='../assets/seta.svg' @click='show(+1)')

      div.livros
        //- h4.mb-3 {{ categoria.nome }}
        h3.mb-3 Publicados Recentemente

        div.livro_grid

          <!-- Livros -->
          div(
            class="livro row"
            v-for='(objeto, index) in objetos'
            v-if='objeto.proprietarioId !== user.id'
            )
            div.livro_img
              router-link(:to='{ name: "livro", params: { id: objeto.id } }')    
                img(:src=`objeto.fotoUrl`)

            div.livro_info
              h5.mt-3 {{ objeto.titulo }}
              p {{ objeto.descricao.slice(0,30)+'...' }}
              h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ objeto.nPaginas }} Páginas
              h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ objeto.tempoVida }}  
              
              div(v-for='dono in donos' v-if='dono.id === objeto.proprietarioId ')
                p.mt-3 De #[strong(style='color: #FFB600;') {{ dono.nome }}] 
                p.dono_local.mt-3 #[font-awesome-icon(icon="map-marker-alt")]  {{ dono.local }}

            div.livro_actions
              div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === objeto.categoriaId ')
                a.mb-3(href="/" v-if='categoria.id === objeto.categoriaId ')  #[p {{ categoria.nome }}]

              a(@click='descurtir(index)' class='bt-deslike' v-if='userLivrosCurtidos.includes(objeto.id)') #[font-awesome-icon(icon="heart-broken")] Descurtir
              a(@click='curtir(index)' class='bt-like' v-else) #[font-awesome-icon(icon="heart")] Curtir

</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
import { mapState } from 'vuex';

export default {
  name: 'ListaLivros',
  computed: mapState(["user", "buscar"]),
  data: function() {
    return { 
      objetos: [],
      categorias: [], 
      curtidas: [], 
      donos: [], 
      curtida: { },
      descurtida: { },
      userLivrosCurtidos: [],
      livroDescurtidoId: []
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
    loadDonos() {
      axios.get(`${baseApiUrl}/usuarios`).then(resposta => {
            this.donos = resposta.data
        })
    },
    loadCurtidas() {
      axios.get(`${baseApiUrl}/curtidas`).then(resposta => {
        this.curtidas = resposta.data

        for(let i = 0; i < this.curtidas.length; i++ ) {
          if ( this.curtidas[i].usuarioInteressadoId === this.user.id ) {
            this.userLivrosCurtidos.push(
              this.curtidas[i].livroCurtidoId
            )
          }
        }
      })
    },
    // buscar() { 
    //   return this.objetos.filter(
    //     objeto => { 
    //       objeto.titulo.toLowerCase().includes(this.$store.state.buscar)
    //     }
    //   )
    // },
    curtir(index) {
      this.curtida.usuarioInteressadoId = this.$store.state.user.id
      this.curtida.livroCurtidoId = this.objetos[index].id
      this.curtida.proprietarioId = this.objetos[index].proprietarioId
      this.curtida.nCurtidas = this.objetos[index].nCurtidas

      axios.post(`${baseApiUrl}/curtidas`, this.curtida)
      .then(this.$toasted.global.defaultSucess())
      .catch(showError)

      this.curtida = { }
    },
    descurtir(index) {
      for(let i = 0; i < this.curtidas.length; i++ ) {
        if ( this.curtidas[i].usuarioInteressadoId === this.user.id && this.curtidas[i].livroCurtidoId === this.objetos[index].id) {
          this.descurtida.id = this.curtidas[i].id
          this.descurtida.livroDescurtidoId = this.curtidas[i].livroCurtidoId
        }
      }
      this.descurtida.nCurtidas = this.objetos[index].nCurtidas

      axios.delete(`${baseApiUrl}/descurtir`, { data: this.descurtida })
      .then(this.$toasted.global.defaultSucess())
      .catch(showError)
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
  watch: {
    buscar: () => {
      this.objetos.filter((objeto) => { return objeto.titulo.match(this.buscar) })
    }
  },
  mounted() {
    // executado após o carregamento do componente
    // console.log(this.userLivrosCurtidos)
    this.loadCategorias()
    this.loadObjetos()
    this.loadDonos()
    this.loadCurtidas()
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

        height: initial; 
        flex-direction: row; 
        flex-wrap: wrap;   
        justify-content: space-between; 
      }

      .livro { 
        text-align: center;
      }  

      .livro_info {
        display: inline-block;
        text-align: left;
        color: #00000090;
        cursor: default;

        h6 { color:#00ABC8; }
      }


      .bt-categoria, .bt-like, .bt-deslike { 
        border-radius: 10px;
        padding: 5px 15px;
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

      .bt-deslike { 
        background-color: #ff000020; 
        color: #ff0000; 
        &:visited { color: #ff0000; }
        &:hover { color: #ff0000;
          box-shadow: 0px 0px 15px 2px #ff000070; 
        }
      }
    }
  }

  // MOBILE
  @media only screen and (max-width: 900px) {
    grid-template-columns: 100vw; 
    grid-template-rows: repeat(auto-fit, minmax(auto, 1fr));

    .col {
      grid-column: 2 / 3;
      padding: 0px;
    }

    .livro_grid {
      margin-top: 50px;      
    }

    .livro {
      margin-bottom:  10vh;

      .livro_img {
        img { max-width: 80vw; }
      }

      .livro_info {
        width: 80vw;

        p .dono_local { 
          font-size: 14px; 
        }
      }

      .livro_actions {
        width: 80vw;
        justify-content: flex-start;
        

        .bt-categoria, .bt-like, .bt-deslike { 
          width: 80%;
          min-height: 50px;  
          font-size: 22px;


          border-radius: 10px;
          padding: 5px 10px;
          display: inline-block;
          cursor: pointer;
          p { margin: 0px !important; } 
        }

        .bt-like, .bt-deslike {
          margin-top: 20px;
        }
      }
    }

    
      
  }

  // DESKTOP
  @media only screen and (min-width: 901px) {
    .livro_grid { 
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));

      .livro {
        max-height: 500px;
        max-width: 250px;
        text-align: left;
        display: flex;
        margin: 40px 20px;

        .livro_img img{
          width: 200px;
          height: 200px;
        }

        .livro_info {
          max-width: 80%;

          .dono_local { 
            font-size: 11px; 
          }
        }

        .livro_actions { 
          font-size: 14px;   
          align-self: flex-end;

          .bt-categoria, .bt-like, .bt-deslike {
            display: inline-block;
          }

          .bt-like, .bt-deslike { margin-left: 10px;}

          svg { 
            opacity: 0.7;
            &:hover { opacity: 1; }
          }
        }
      }
    }

  }

}
</style>