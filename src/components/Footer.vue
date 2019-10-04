  
<template lang="pug">
  footer
    .copy-div
      h6#copy-year #[strong 2019] @ vinler
    .dev-div  
      p #[strong Desenvolvido por] RISE

    p.flat-icons-copy Icons made by #[a(href="https://www.flaticon.com/authors/freepik" title="Freepik") Freepik] from #[a(href="https://www.flaticon.com/" title="Flaticon") www.flaticon.com]

</template>

<script>
export default {
}
</script>

<style lang="scss">
footer { text-align: center; }
.copy-div strong { font-size: 12px; }
.dev-div { font-size: 10px; }
.flat-icons-copy { font-size: 10px; opacity: .6;}
</style>