<template lang='pug'>
  div.file
    form(@submit.prevent='onSubmit' enctype='multipart/form-data')
      div.fields
        label Upload File #[br]
        input(type='file' ref='file' @change='onSelect')
      
      div.fields
        button Submit

      div.message
        h5 {{ message }}

</template>

<script>
import { baseApiUrl, showError } from '@/global'
import axios from 'axios'

export default {
  name: 'Upload',
  data: function() {
    return {
      file: "",
      message: ''
    }
  },
  methods: {
    onSelect() {
      const allowedTypes = ["image/jpeg", "image/jpg", "image/png"]
      const file = this.$refs.file.files[0]
      this.file = file

      if(allowedTypes.includes(file.type)){
        this.message = "Apenas imagens são aceitas!"
      }

      if(file.size > 500000) {
        this.message = "Arquivo muito grande. O máximo permitido é 50KB"
      }
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.file)

      try {
        await axios.post(`${baseApiUrl}/upload`, formData)
        this.message = 'Upado!'
      } catch(err) {
        console.log(err)
        this.message = 'Deu ruim.'
      }
    },
  }
}
</script>

<style lang='scss'>

</style>