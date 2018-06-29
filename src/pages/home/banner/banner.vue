<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always" height="640px">
      <el-carousel-item v-for="item in 4" :key="item">
        <img class="banner-img" src="https://www.bitauto.com/topics/adtopic/region/dazhongChengduH5/images/header_3.jpg" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'banner',
    data() {
      return {}
    }
  }
</script>

<style lang="scss" scoped>
  .banner {
    .el-carousel__container {
      .banner-img {
        position: absolute;
        left: 50%;
        top: 0;
        margin-left: -960px;
        width: 1920px;
        height: 640px;
      }
    }
  }
</style>