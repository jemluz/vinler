<template lang='pug'>
  div.intro-section#create-section
    div(class="row align-items-center m-5")
      div.col-12
        h3.mt-5.mb-3 Usuários
        div(class="row" data-aos="fade-up" data-aos-delay="500")               
          table(class='data-table col-lg-9 form-box' data-aos="fade-down" data-aos-delay="0")
            tr.top
              th.pd-top Id / Nome
              th.pd-top E-mail
              th.pd-top Login / Senha Criptografada
              th.pd-top FotoUrl
              th.pd-top Ações
            tr(v-for="objeto in objetos", class='data-tr')
              th.pd-left {{ objeto.id }} / {{ objeto.nome }}
              th.pd-left {{ objeto.email.slice(0,10)+'...' }}
              th.pd-left {{ objeto.login }} / {{ objeto.senha.slice(0,5)+'...' }}
              th.pd-left #[img(:src='objeto.fotoUrl' width='50px' height='50px')]
              th.pd-top.pd-right.row 
                button(@click='loadObjeto(objeto, "save", true)' class='bt-edit') #[font-awesome-icon(icon="edit")]
                button(@click="loadObjeto(objeto, 'remove', false)" class='bt-remove') #[font-awesome-icon(icon="trash-alt")]
          form(class="form-box col-lg-3  justify-content-center")
            div.col
              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="Seu nome aqui :)"
                  v-model='objeto.nome'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="seu melhor e-mail"
                  v-model='objeto.email'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="text" 
                  class="form-control" 
                  placeholder="...e o login!"
                  v-model='objeto.login'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type='file' 
                  ref='file' 
                  accept="file_extension|image/*"
                  @change='onSelect'
                )

              div.form-group.mr-3
                input(
                  type="password" 
                  class="form-control" 
                  placeholder="Ah! Tem a senha também."
                  v-model='objeto.senha'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.mr-3
                input(
                  type="password" 
                  class="form-control" 
                  placeholder="confirme a senha :D"
                  v-model='objeto.confirmarSenha'
                  :readonly='mode === "remove"'
                  required
                )

              div.form-group.justify-content-end  
                input(
                  type='button'
                  class="btn btn-primary btn-pill" 
                  v-if="mode === 'save'"
                  @click="save"
                  value="Salvar "
                )
                input(
                  type='button'
                  class="btn btn-danger btn-pill" 
                  v-if="mode === 'remove'"
                  @click="remove"
                  value="Excluir "
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
import { mapState } from 'vuex'
import axios from 'axios'
// o axios é responsável por enviar requisições da view

export default {
  name: "DadosAmostra",
  computed: mapState(["user"]),
  data: function() {
    return {
      mode: 'save', 
      objeto: {},
      objetos: [],
      edit: false,
      file: "",
      message: '',
      imageData: ""
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
      const url = `${baseApiUrl}/usuarios`
      axios.get(url).then(resposta => { this.objetos = resposta.data }).catch(showError)
    },
    reset() {
      this.mode = 'save'
      this.objeto = {}
      this.edit = false
      this.imageData = null
      this.loadObjetos()
    },
    save() {
      const method = this.edit ? 'put' : 'post'
      const id = this.edit ? `/${ this.objeto.id }` : ''

      this.onSubmit()
      this.objeto.fotoUrl = `${baseApiUrl}/image/profile-1.jpg`

      axios[method](`${baseApiUrl}/usuarios${id}`, this.objeto)
        .then(() => { 
          this.$toasted.global.defaultSucess()
          this.reset()
        })
        .catch(showError)
    },
    remove() {
      const id = this.objeto.id
      axios.delete(`${baseApiUrl}/usuarios/${id}`)
        .then(() => {
          this.$toasted.global.defaultSucess()
          this.reset()
        })
        .catch(showError)
    },
    onSelect() {
      this.previewImage()
      const tiposPermitidos = ["image/jpeg", "image/jpg", "image/png"]
      const file = this.$refs.file.files[0]
      this.file = file

      if(!tiposPermitidos.includes(file.type)){
        this.message = "Apenas imagens são aceitas."
      }

      if(file.size > 500000) {
        this.message = "Arquivo muito grande. O máximo permitido é 50KB"
      }
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('userId', this.user.id)
      formData.append('file', this.file)

      try {
        await axios.post(`${baseApiUrl}/upload-profileImg`, formData)
        this.message = 'Upado!'
      } catch(err) {
        this.message = 'Deu ruim.' + err
      }
    },
    previewImage() {
      // Reference to the DOM input element
      var input = event.target;
      // Ensure that you have a file before attempting to read it
      if (input.files && input.files[0]) {
        // create a new FileReader to read this image and convert to base64 format
        var reader = new FileReader();
        // Define a callback function to run, when FileReader finishes its job
        reader.onload = (e) => {
          // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
          // Read image as base64 and set to imageData
          this.imageData = e.target.result;
        }
        // Start the reader job - read file as a data url (base64 format)
        reader.readAsDataURL(input.files[0]);
      }
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