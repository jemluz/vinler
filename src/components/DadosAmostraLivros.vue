<template lang='pug'>
  div.intro-section#create-section
    div(class="row align-items-center m-5")
      div.col-12
        h3.mt-5.mb-3 Livros
        div(class="row" data-aos="fade-up" data-aos-delay="500")               
          table(class='data-table col-lg-9 form-box' data-aos="fade-down" data-aos-delay="0")
            tr.top
              th.pd-top Id / Título
              th.pd-top Descrição
              th.pd-top FotoUrl
              th.pd-top Proprietário Id / Categoria Id
              th.pd-top Ações
            tr(v-for="objeto in objetos", class='data-tr')
              th.pd-left {{ objeto.id }} / {{ objeto.titulo }}
              th.pd-left {{ objeto.descricao.slice(0,10)+'...' }}
              th.pd-left {{ objeto.fotoUrl }}
              th.pd-left.pd-right {{ objeto.proprietarioId }} / {{ objeto.categoriaId }}
              th.pd-top.pd-right.row 
                button(@click='loadObjeto(objeto, "save", true)' class='bt-edit') #[font-awesome-icon(icon="edit")]
                button(@click="loadObjeto(objeto, 'remove', false)" class='bt-remove') #[font-awesome-icon(icon="trash-alt")] 

          form(class="form-box col-lg-3  justify-content-center")
            div.col
              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="Título da obra"
                  v-model='objeto.titulo'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="breve descrição do livro"
                  v-model='objeto.descricao'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="link da foto"
                  v-model='objeto.fotoUrl'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="id do dono do livro"
                  v-model='objeto.proprietarioId'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="id da categoria"
                  v-model='objeto.categoriaId'
                  :readonly='mode === "remove"'
                  required
                )


              div.form-group.justify-content-end  
                input(
                  type='button'
                  class="btn btn-primary btn-pill" 
                  v-if="mode === 'save'"
                  @click="save"
                  value="Salvar"
                )
                input(
                  type='button'
                  class="btn btn-danger btn-pill" 
                  v-if="mode === 'remove'"
                  @click="remove"
                  value="Excluir"
                )              
                input(
                  type='button'
                  class="btn btn-dark danger ml-3 btn-pill" 
                  @click="reset"
                  value="limpar"        
                  data-aos="fade-left" 
                )
            

</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'
// o axios é responsável por enviar requisições da view

export default {
  name: "DadosAmostra",
  data: function() {
    return {
      mode: 'save', 
      objeto: {},
      objetos: [],
      edit: false
    }
  },
  methods: {
    /*
      loadObjetos() - utiliza uma url pra fazer uma requisição com o axios e carregar um array de objetos
      loadObjeto() - recebe um objeto como parâmetro e carrega ele no formulário
      reset() - reseta o modo do formulário para 'save' e o objeto atual, carregando os demais objetos em seguida
      remove() - é uma função mais simples que o save(), que faz uma requisição axios do tipo delete passando a url com o id
      save() - 
        Usa a variável method para fazer a distinção entre os metodos POST e PUT a partir do id do objeto (se tem id é PUT, se não tem é POST).
        Se houver um ID, será utilizado para atribuir a variavel id ao restante da url PUT.
        A variável method usada dentro de [ ] - cahamada de um metodo a partir de uma string - determina tbm qual será o tipo de função axios que será utilizada para fazer a requisição, passando como parametro a url eo o objeto em questao.
        Se a requisição for bem sucedida, irá aparecer um toasted de sucesso na tela, e em seguida o metodo reset é chamado, renderizando a nova lista de usuários, se não retorna um toasted com a mensagem de erro tratada.
        const method = 'post'
        if (this.edit) { this.method = 'put' } else { this.method = 'post' }
    */
    loadObjeto(objeto, mode = 'save', edit = 'true') {
      this.mode = mode
      this.edit = edit
      this.objeto = { ...objeto }
    },
    loadObjetos() {
      const url = `${baseApiUrl}/livros`
      axios.get(url).then(resposta => { this.objetos = resposta.data }).catch(showError)
    },
    reset() {
      this.mode = 'save'
      this.objeto = {}
      this.edit = false
      this.loadObjetos()
    },
    save() {
      const method = this.edit ? 'put' : 'post'
      const id = this.edit ? `/${ this.objeto.id }` : ''
      axios[method](`${baseApiUrl}/livros${id}`, this.objeto)
        .then(() => { 
          this.$toasted.global.defaultSucess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.objeto.id
      axios.delete(`${baseApiUrl}/livros/${id}`)
        .then(() => {
          this.$toasted.global.defaultSucess()
          this.reset()
        })
        .catch(showError)
    }
  },
  mounted() {
    // executado após o carregamento do componente
    this.loadObjetos()
  }
};
</script>

<style lang='scss'>
.slide-1 {
  // background-image: url('../../../public/images/hero_1.jpg'); 
  background-repeat: no-repeat; 
  background-attachment: fixed;
}
.data-table{
  width: 100%;
  margin-bottom: 20vh;
  background-color: white;
}
.top {
  box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.1);
  color: grey;
  border-radius: 10px;
}
.pd-top { padding: 10px 40px; }
.pd-left { padding-left:  40px; }
.pd-right { padding-right:  40px; }
.data-tr { 
  color: black; 
  font-size: 18px;
  opacity: .6;
}
.bt-edit,
.bt-remove {
  background: none;
  border: none;
  color:  #4992ff;
}
.bt-remove {
  color:  #eb1c0f;
}
</style>