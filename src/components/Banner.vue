<template lang="pug">
  div.banner
    h1 #[strong Troque] os livros dos seus filhos e continue estimulando a leitura para eles ao #[strong explorar novos mundos]
</template>

<script>
export default {
  name: 'Banner'
}
</script>

<style lang="scss">
  .banner { 
    width:100vw;
    height: 400px; 
    background-image: url('../assets/banner.png');

    h1 {
      padding: 12vh 35vw;
      color: white;
    }
  }
</style>