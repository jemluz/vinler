<template lang="pug">
  div.novo_livro
  
    form.form-box
      
      img(:src='imageData || `http://${baseApiUrl}:3000/image/image-default.svg`')
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
        textarea(
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
        label Ah! Tem a categoria também!
        select( 
          class="form-control"  
          name='categoria'
          placeholder='escolha uma opção'
          v-model='objeto.categoriaId' 
          required
        )
          option(v-for='categoria in categorias' :value="categoria.id") {{ categoria.id }} / {{ categoria.nome }}


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
      categorias: [],
      file: "",
      imageData: "",
      idLivro: null,
      novoLivro: null,

    }
  },
  methods: {
    loadCategorias() {
        // utiliza uma url pra fazer uma requisição com o axios e carregar um array de clientes
        axios.get(`${baseApiUrl}/categorias`).then(resposta => {
            this.categorias = resposta.data
        })
    },
    full() {
      // realiza a inserção do novo livro no banco
      this.objeto.proprietarioId = this.user.id

      axios.post(`${baseApiUrl}/livros`, this.objeto)
        .then(result => { 
          this.idLivro = result.data[0]

          // upando foto no servidor
          this.uploadPhoto()

          // extraindo a extensão do arquivo
          var name = this.file.name
          var lastDot = name.lastIndexOf('.');
          var ext = name.substring(lastDot + 1);

          // obtendo o objeto recem inserido
          this.getNovo(this.idLivro, ext)

        })
        .catch(showError)  
        
      this.reset()

    },
    save() {
      // realiza a inserção do novo livro no banco
      axios.post(`${baseApiUrl}/livros`, this.objeto)
        .then(result => { 
          this.idLivro = JSON.stringify(result.data[0]) 
        })
        .catch(showError)

      // realiza um put
      this.reset()
    },
    getNovo(idLivro, ext) {
      // puxa o livro recem adicionado ao banco
       axios.get(`${baseApiUrl}/livros/${idLivro}`)
        .then(novo => { 
          this.novoLivro = JSON.parse(JSON.stringify(novo.data))
          
          // atualizando a propriedade foto para ser atualizada no banco
          this.novoLivro.fotoUrl = `${baseApiUrl}/image/livro-${this.user.id}-${this.idLivro}.${ext}`

          // fazendo o put no banco
          this.putNovo(this.idLivro, this.novoLivro)
        })
        .catch(showError)

      // console.log(this.novoLivro)
    },
    putNovo(idLivro, novoLivro) {
      axios.put(`${baseApiUrl}/livros/${idLivro}`, novoLivro)
        .then(this.$toasted.global.defaultSucess())
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
      formData.append('livroId', this.idLivro)
      formData.append('file', this.file)

      axios.post(`${baseApiUrl}/upload-livroImg`, formData)
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
  mounted () {
    this.loadCategorias()
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
// MOBILE
@media only screen and (max-width: 900px) {
  .novo_livro {
    width: 80vw;
    margin: 0 auto;
  }
}
</style>