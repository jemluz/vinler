<template lang='pug'>
  div.loading
    font-awesome-icon(icon='spinner' spin)
    p carregando
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style>
  .loading {
    grid-area: content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>