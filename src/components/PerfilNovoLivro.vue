<template lang="pug">
  div.novo_livro
  
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
        input(
          type="text" 
          class="form-control" 
          placeholder="Título da obra"
          v-model='objeto.titulo'
          required
        )

      div.form-group
        input(
          type="text" 
          class="form-control" 
          placeholder="Breve descrição do livro"
          v-model='objeto.descricao'
          required
        )
        

      div.form-group
        input(
          type="text" 
          class="form-control" 
          placeholder="Quantas páginas tem?"
          v-model='objeto.nPaginas'
          required
        )

      div.form-group
        input(
          type="text" 
          class="form-control" 
          placeholder="Há quanto tempo o livro está com você? "
          v-model='objeto.tempoVida'
          required
        )

      div.form-group
        input(
          type="text" 
          class="form-control" 
          placeholder="id do dono do livro"
          v-model='objeto.proprietarioId'
          required
        )

      div.form-group
        input(
          type="text" 
          class="form-control" 
          placeholder="id da categoria"
          v-model='objeto.categoriaId'
          required
        )

      //- div.form-check    
      //-   input(
      //-     id='checkDisponivel'
      //-     type="checkbox" 
      //-     class="form-check-input" 
      //-     v-model='objeto.disponivel'
      //-     required
      //-   )

      //-   label(
      //-     class="form-check-label" 
      //-     for="checkDisponivel") Disponível? 


      div.button-group.mb-5 
        input(
          type='button'
          class="btn btn-primary btn-pill bt-salvar" 
          @click="full"
          value="Salvar"
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

export default {
  name: 'NovoLivro',
  computed: mapState(['user']),
  data: () => {
    return {
      objeto: {
        disponivel: false
      },
      file: "",
      imageData: "",
      idLivro: "".
      novoLivro
    }
  },
  methods: {
    full() {
        // testar cada uma separado

        // realiza a inserção do novo livro no banco
        this.save()

        // puxa o livro recem adicionado ao banco
        this.getNovo(this.idLivro) 

        // nomeia o arquivo de imagem
        // this.onSubmit()

        // realiza o put com a imagem correta
        // axios.put(`${baseApiUrl}/livros/`)
    },
    async getNovo(idLivro) {
      // puxa o livro recem adicionado ao banco
      axios.get(`${baseApiUrl}/livros/${idLivro}`)
        .then(novo => { 
          // this.novoLivro = novo.data 
          console.log(this.idLivro + '- ' + JSON.stringify(novo.data[0]))
        })
        .catch(showError)

      // console.log(this.novoLivro)
    },
    save() {
      // realiza a inserção do novo livro no banco
      axios.post(`${baseApiUrl}/livros`, this.objeto)
        .then(result => { 
          this.idLivro = JSON.stringify(result.data[0]) 
          this.$toasted.global.defaultSucess()
        })
        .catch(showError)

      // realiza um put
      this.reset()
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
      formData.append('livroId', this.idLivro)
      formData.append('file', this.file)

      try {
        await axios.post(`${baseApiUrl}/upload-livroImg`, formData)
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
    },
    reset() {
      this.objeto = {}
      this.imageData = null
    },
  }
}
</script>

<style lang='scss'>
#checkDisponivel { margin: none;}

.novo_livro form img {
  max-width: 300px; 
  max-height: 300px;
}

.bt-salvar { 
  border-color: #00ABC8;
  background-color: #00ABC8;
  &:hover {
    background-color: #02869d;
  }
}
</style>