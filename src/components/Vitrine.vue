<template lang='pug'>
    div
        Banner
        ListaLivros
    //-   Upload
      //- VAds

</template>

<script>
// import VBanner from './VBanner'
// import VAds from './VAds'
import ListaLivros from './ListaLivros'
import Upload from './Upload'
import Banner from '@/components/Banner'

export default {
    name: 'Vitrine',
    components: { Upload, ListaLivros, Banner }
}
</script>

<style lang='scss'>
    
</style>