<template lang='pug'>
  div
    b-tabs(content-class="mt-5")
      b-tab(title="Usuários" active)
        DadosAmostraUsuarios
        
      b-tab(title="Livros")
        DadosAmostraLivros
  
      b-tab(title="Categorias")
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

<style lang='scss'>

</style>