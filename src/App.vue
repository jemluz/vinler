
<template lang="pug">
  div
    Loading.loading(v-if="isBussy")
    div(v-else)
      Header
      //- Content(@add-to-cart="updateCart")
      Content(v-if='!validatingToken')
      Footer
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

import { mapState } from "vuex";
import Header from "@/components/Header";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: { Header, Content, Footer, Loading },
  computed: mapState(['isLogoutVisible', 'user']),
  data: function() {
    return {
      validatingToken: true,
      isBussy: true
    }
  },
  methods: {
    async validateToken() {
      this.validatingToken = true

      const json = localStorage.getItem(userKey)
      const userData = JSON.parse(json)
      this.$store.commit('setUser', null)

      if(!userData) {
        this.validatingToken = false
        this.$router.push({ name: 'auth' })
        console.log('Você precisa fazer login!')
        return 
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data) { 
        this.$store.commit('setUser', userData) 
      } else { 
        localStorage.removeItem(userKey) 
        this.$router.push({ name: 'auth' })
        return console.log('Seu token não foi validado!')
      }
      this.validatingToken = false
    },
    loading() {
    }
  },
  mounted() {
    setTimeout(() => {
      this.isBussy = false
    }, 700)
  },
  created() {
    this.validateToken() 
  }
};
</script>


<style lang="scss">
@import 'node_modules/bootstrap/scss/bootstrap';
@import 'node_modules/bootstrap-vue/src/index.scss';

a:hover, a, li { text-decoration: none !important; }
li { list-style-type: none; }

.loading { margin: 200px; }
</style>