<template lang='pug'>
  div
    DadosAmostraUsuarios
    DadosAmostraLivros
    DadosAmostraCategorias
    
</template>

<script>
import DadosAmostraUsuarios from '@/components/DadosAmostraUsuarios'
import DadosAmostraLivros from '@/components/DadosAmostraLivros'
import DadosAmostraCategorias from '@/components/DadosAmostraCategorias'

export default {
  name: 'Dados',
  components: { DadosAmostraUsuarios, DadosAmostraLivros, DadosAmostraCategorias }
}
</script>

<style>

</style>