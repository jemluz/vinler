<template lang="pug">
  div
    p id {{ id }}
</template>

<script>
export default {
  name: 'Livro',
  props: ['id'],
  data: () => {
    return {
      id: this.$route.params.id 
    }
  },
  methods: {}
}
</script>

<style lang='scss'>

</style>