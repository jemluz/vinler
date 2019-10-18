<template lang='pug'>
  transition
    div.auth-content
      div(class='auth-modal col-lg-3')
        h1(class='auth-title') {{ showSignup ? 'Novo Cadastro ' : 'Login' }}

        form.form-box
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="Seu nome aqui :)"
              v-model='user.nome'
              v-if="showSignup"
              required
                )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="seu e-mail"
              v-model='user.email'
              v-if="showSignup"
              required
            )
          div.form-group
            input(
              type="text" 
              class="form-control" 
              placeholder="... e o login!"
              v-model='user.login'
              required
            )
          div.form-group
            input(
              type="password" 
              class="form-control" 
              placeholder="Ah! Tem a senha também."
              v-model='user.senha'
              required
            )
          div.form-group
            input(
              type="password" 
              class="form-control" 
              placeholder="Pode repetir a senha?"
              v-model='user.confirmarSenha'
              v-if="showSignup"
              required
            )
            //- div.form-check    
            //- input(
            //-   id='checkFuncionario'
            //-   type="checkbox" 
            //-   class="form-check-input" 
            //-   v-model='user.isFuncionario'
            //-   v-if="showSignup"
            //-   required
            //- )
            //- label(
            //-   class="form-check-label" 
            //-   v-if="showSignup"
            //-   for="checkFuncionario") É funcionário?

            //- div.form-group
            //- input(
            //-   type="tel" 
            //-   class="form-control" 
            //-   placeholder="Ganha quanto?"
            //-   v-if="user.isFuncionario && showSignup "
            //-   v-model='user.salario'
            //-   required
            //- )  

          div.button-group
            input(
              type='button'     
              class="btn btn-primary btn-pill" 
              v-if="!showSignup"
              @click="signin"
              value="Entrar"
            )
            input(
              type='button'     
              class="btn btn-primary btn-pill" 
              v-else
              @click="signup"
              value="Registrar"
            )

            input(
              type='button'
              class="btn btn-dark danger ml-3 btn-pill" 
              @click=""
              value="limpar"        
              data-aos="fade-left" 
            )

        a(href @click.prevent="showSignup = !showSignup" class="alternar") 
            p(v-if='!showSignup' style='color: grey;') cadastro
            p(v-else style='color: #7971ea;') cadastro
            span(v-if='showSignup' class="fa fa-toggle-off fa-lg")
            span(v-else class="fa fa-toggle-on fa-lg")
            p(v-if='showSignup' style='color: grey;') login
            p(v-else style='color: #7971ea;') login

</template>

<script>
import { baseApiUrl, showError, userKey } from '@/global'
import axios from 'axios'
export default {
  name: 'LoginCadastro',
  data: function() {
    return {
      showSignup: false,
      user: { }
    }
  },
  methods: {
    signin() {
      axios.post(`${baseApiUrl}/signin`, this.user)
      .then(res => {
          this.$store.commit('setUser', res.data)
          localStorage.setItem(userKey, JSON.stringify(res.data))
          this.$router.push({ path: '/vitrine'})
      }).catch(showError)
    },
    signup() {
      axios.post(`${baseApiUrl}/signup`, this.user)
      .then(() => {
          this.$toasted.global.defaultSucess()
          this.user = {}
          this.showSignup = false
      }).catch(showError)
    }
  }
}
</script>

<style lang="scss">
.auth-content {
  h1 { margin-bottom: 50px; justify-self: center; color: grey;}
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 100px auto;
}
.auth-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 40px #7971ea51;
  padding: 80px 80px 0px 80px;
  border-radius: 20px;
}
.form-check {
  margin: auto auto 20px 17%;
}
.button-group {
  display: flex;
  margin: 30px auto 0px auto;
  align-items: center;
  justify-content: center;
}  
.alternar { display: flex; flex-direction: row; padding: 40px; text-decoration: none; 
  p:hover { color: #7971ea; }
  span { padding: 7px; color: #7971ea;} }
.bt-edit,
.bt-remove {
  background: none;
  border: none;
  color:  #7971ea;
}
.bt-remove {
  color:  #eb1c0f;
}
.v-enter, .v-leave-to { opacity: 0; }
.v-enter-active, .v-leave-active { transition: opacity .5s; }
</style>