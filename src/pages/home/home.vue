<template>
  <div class="home">

    <banner></banner>
  </div>
</template>


<script>
  import axios from 'axios';
  import banner from './banner/banner.vue'
  export default {
    name: 'home',
    data() {
      return {}
    },
    components: {
      banner
    }
  }
</script>

<style lang="scss">
  .home {
    height: 640px;
  }
</style>
