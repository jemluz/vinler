<template lang="pug">
  div.meus_dados

    form.form-box
      img(:src='imageData || "http://localhost:3000/image/image-default.svg"')
      div.form-group.mt-3.col
        
        input(
          id='img'
          type='file' 
          ref='file' 
          accept="file_extension|image/*"
          @change='onSelect'
        )

      div.form-group
        label(for='nome') Nome e Sobrenome
        input(
          name='nome'
          type="text" 
          class="form-control" 
          placeholder="Seu nome aqui :)"
          v-model='objeto.nome'
          required
            )
      div.form-group
        label(for='email') E-mail
        input(
          name='email'
          type="text" 
          class="form-control" 
          placeholder="seu e-mail"
          v-model='objeto.email'
          required
        )
      div.form-group
        label(for='login') Login
        input(
          name='login'
          type="text" 
          class="form-control" 
          placeholder="... e o login!"
          v-model='objeto.login'
          required
        )
      div.form-group
        label(for='senha') Senha
        input(
          name='senha'
          type="password" 
          class="form-control" 
          placeholder="Ah! Tem a senha também."
          v-model='objeto.senha'
          required
        )
      div.form-group
        label(for='confirmarSenha') Confirmar Senha
        input(
          name='confirmarSenha'
          type="password" 
          class="form-control" 
          placeholder="Pode repetir a senha?"
          v-model='objeto.confirmarSenha'
          required
        )
      div.form-group
        label(for='celular') Celular
        input(
          name='celular'
          type="text" 
          class="form-control" 
          placeholder="Diz aí qual teu número."
          v-model='objeto.celular'
          required
        )
      div.form-group
        label(for='local') Local
        input(
          name='local'
          type="text" 
          class="form-control" 
          placeholder="E onde você mora ;)"
          v-model='objeto.local'
          required
        )

      div.button-group
        input(
          type='button'     
          class="btn btn-primary bt-salvar mr-3 mb-5" 
          @click="update"
          value="Salvar"
        )

</template>

<script>
import { mapState } from 'vuex';
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: "MeusDados",
  computed: mapState(["user"]),
  data: () => {
    return {
      objeto: {},
      file: "",
      imageData: ""
    }
  },
  methods: {
    update() {
      delete this.objeto.iat
      delete this.objeto.exp
      delete this.objeto.token

      // upando foto no servidor
      this.uploadPhoto()

      // extraindo a extensão do arquivo
      var name = this.file.name
      var lastDot = name.lastIndexOf('.');
      var ext = name.substring(lastDot + 1);

      // atualizando a propriedade foto para ser atualizada no banco
      this.objeto.fotoUrl = `${baseApiUrl}/image/profile-${this.user.id}.${ext}`

      axios.put(`${baseApiUrl}/usuarios/${this.user.id}`, this.objeto)
        .then(() => { 
          this.$toasted.global.defaultSucess()
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
    uploadPhoto() {
      const formData = new FormData()
      formData.append('userId', this.user.id)
      formData.append('file', this.file)

      axios.post(`${baseApiUrl}/upload-profileImg`, formData)
        .catch()
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
    },
    reset() {
      this.objeto = {}
      this.imageData = null
    }
  },
  mounted() {
    this.objeto = this.user
  }
};
</script>

<style lang="scss">
h4 { color: #00ABC8; }
label { color: grey; }

.bt-salvar { 
  border-color: #00ABC8;
  background-color: #00ABC8;
  &:hover {
    background-color: #02869d;
  }
}

// MOBILE
@media only screen and (max-width: 900px) {
  .meus_dados {
    width: 80vw;
    margin: 0 auto;
  }
}
</style>