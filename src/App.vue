
<template lang="pug">
  div
    Nav
    Content(@add-to-cart="updateCart")
    Footer
  </div>
</template>

<script>
import { mapState } from "vuex";
import Nav from "@/components/Nav";
import Content from "@/components/Content";
import Footer from "@/components/Footer";

export default {
  name: "App",
  components: { Nav, Content, Footer },
  // computed: mapState(['isFuncionario', 'user']),
  methods: {
  }
};
</script>


<style lang="scss">
a:hover { text-decoration: none !important; }
</style>