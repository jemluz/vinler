<template lang="pug">
  div.meus_dados

    form.form-box
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
      objeto: {}
    }
  },
  methods: {
    update() {
      delete this.objeto.iat
      delete this.objeto.exp
      delete this.objeto.token

      axios.put(`${baseApiUrl}/usuarios/${this.user.id}`, this.objeto)
        .then(() => { 
          this.$toasted.global.defaultSucess()
        })
        .catch(showError)
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
</style>