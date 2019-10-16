<template lang='pug'>
  div
    DadosAmostraUsuarios
    DadosAmostraLivros
    
</template>

<script>
import DadosAmostraUsuarios from '@/components/DadosAmostraUsuarios'
import DadosAmostraLivros from '@/components/DadosAmostraLivros'

export default {
  name: 'Dados',
  components: { DadosAmostraUsuarios, DadosAmostraLivros }
}
</script>

<style>

</style>