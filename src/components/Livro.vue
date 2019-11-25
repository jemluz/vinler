<template lang="pug">
  div.livro_grid

      div.livro_img
        router-link(to='')    
          img(:src=`objeto.fotoUrl`)
          p(class='flag-disponivel' v-show='objeto.disponivel === 1') #[font-awesome-icon(icon="check")] Disponível
          p(class='flag-indisponivel' v-show='objeto.disponivel === 0') #[font-awesome-icon(icon="times")] Indisponível


      div.livro_info
        h2.mt-3 {{ objeto.titulo }}
        p {{ objeto.descricao }}
        h6 #[img.ml-2.mr-2(src='../assets/book.svg' width='20px') ] {{ objeto.nPaginas }} Páginas
        h6 #[img.mr-2(src='../assets/shelf.svg' width='30px') ] {{ objeto.tempoVida }}  

        div.row.mt-5.ml-3  
          div.mr-3.livro_actions
            div(class="bt-categoria" v-for='categoria in categorias' v-if='categoria.id === objeto.categoriaId ')
              a(href="/" v-if='categoria.id === objeto.categoriaId ')  #[p {{ categoria.nome }}]

            a( @click='' class='bt-like ml-3' v-if=' objeto.proprietarioId === user.id ') {{ objeto.nCurtidas ? `${objeto.nCurtidas} Curtidas` : `0 Curtidas`}} 
            a( @click='curtir(objeto.id)' class='bt-like' v-else) #[font-awesome-icon(icon="heart")] Curtir

        hr.mt-5

        div.ml-3(v-for='dono in donos' v-if='dono.id === objeto.proprietarioId ')
            h5 Livro Postado por 
            
            div.dono
              img.mr-3(:src='dono.fotoUrl' width='50px' style='border-radius: 50%;')
              router-link.btn_ver_livros(v-if='objeto.proprietarioId === user.id' to='/minha-conta')  #[strong  {{ dono.nome }} ]
              router-link.btn_ver_livros(v-else :to='{ name: "dono", params: { id: objeto.proprietarioId } }')  #[strong  {{ dono.nome }} ]
          
            p.mt-3(style='font-size: 16px; ') #[font-awesome-icon(icon="map-marker-alt" style='color: #FFB600;')]  {{ dono.local }}
</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from "@/global";
import axios from "axios";

export default {
  name: "Livro",
  props: ["id"],
  computed: mapState(["user"]),
  data: () => {
    return {
      objeto: {},
      categorias: [],
      donos: [], 
    };
  },
  methods: {
    loadObjeto() {
      const url = `${baseApiUrl}/livros/${this.id}`;
      axios
        .get(url)
        .then(resposta => {
          this.objeto = resposta.data;
        })
        .catch(showError);
    },
    loadCategorias() {
      axios.get(`${baseApiUrl}/categorias`).then(resposta => {
        this.categorias = resposta.data;
      });
    },
    loadDonos() {
      axios.get(`${baseApiUrl}/usuarios`).then(resposta => {
        this.donos = resposta.data
      })
    },
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
  },
  mounted() {
    this.loadCategorias();
    this.loadObjeto();
    this.loadDonos();
  }
};
</script>

<style scoped lang='scss'>
.livro_grid {
  display: grid;
  background-color: #f9f9f9;

  .livro_info {
    display: inline-block;
    text-align: left;
    color: #00000090;
    cursor: default;

    h6 { color:#00ABC8; }
  }

  .bt-categoria, .bt-like, .btn_ver_livros { 
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

  .btn_ver_livros {
    background-color: #FFB600; 
    color: #fff; 
    margin: 10px 0px 5px 0;
    &:visited { color: #fff; }
    &:hover { color: #fff;
      box-shadow: 0px 0px 10px 2px #FFB60070; 
    }
  }

  .flag-disponivel {
    background-color: #32bf3040 ; 
    color: #207b55; 
    padding: 10px;
    width: 50%;
    text-align: center;
    border-radius: 0px 00px 10px 10px;
    margin: 10px auto 10px auto;
  }

  .flag-indisponivel {
    background-color: #bf5e3040 ; 
    color: #7b2020; 
    padding: 10px;
    width: 50%;
    text-align: center;
    border-radius: 0px 00px 10px 10px;
    margin: 10px auto 10px auto;
  }

  .dono {
    display: flex;
  }

  @media only screen and (max-width: 900px) {
    padding: 50px 40px;

    .livro_info {
      margin-top: 20px;
    }

    .livro_actions {
      width: 80vw;
      justify-content: flex-start;
      

      .bt-categoria, .bt-like { 
        width: 80%;
        min-height: 50px;  
        font-size: 22px;
        text-align: center;

        border-radius: 10px;
        padding: 5px 15px;
        display: inline-block;
        cursor: pointer;
        p { margin: 0px !important; } 
      }

      .bt-like {
        margin-top: 20px;
      }
    }
  }

  // DESKTOP
  @media only screen and (min-width: 901px) {
    grid-template-columns: 20vw 20vw 2vw 30vw 28vw;
    padding: 100px 0;

    .livro_img {
      grid-column: 2/ 3;
      justify-self: flex-end;
    }

    .livro_info {
      grid-column: 4/ 5;

      .livro_actions {
        display: flex;
        align-items: center;


        .bt-like {
          margin-left: 20px;
        }
      }
    }
  }
}

// MOBILE
</style>