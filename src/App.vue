
<template lang="pug">
  div
    Nav
    //- Content(@add-to-cart="updateCart")
    Loading(v-if='validatingToken')
    Content(v-else)
    Footer
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl, userKey } from '@/global'

import { mapState } from "vuex";
import Nav from "@/components/Nav";
import Content from "@/components/Content";
import Footer from "@/components/Footer";
import Loading from "@/components/Loading";

export default {
  name: "App",
  components: { Nav, Content, Footer, Loading },
  computed: mapState(['isLogoutVisible', 'user']),
  data: function() {
    return {
      validatingToken: true
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
        return
      }

      const res = await axios.post(`${baseApiUrl}/validateToken`, userData)

      if(res.data) { this.$store.commit('setUser', userData) } 
      else { 
        localStorage.removeItem(userKey) 
        this.$router.push({ name: 'auth' })
      }

      this.validatingToken = false
    }
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
</style>