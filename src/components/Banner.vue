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
    background-size: cover;
    display: flex;
    align-items: center;

    @media only screen and (max-width: 900px) {
      background-image: url('../assets/banner-mobile.png');
      height: 400px; 

      h1 {
        padding: 0vh 15vw;
        color: white;
        font-size: 30px;
      }
    }
    @media only screen and (min-width: 901px) {
      background-image: url('../assets/banner.png');
      height: 400px; 

      h1 {
        padding: 0vh 35vw;
        color: white;
      }
    }   
  }
</style>