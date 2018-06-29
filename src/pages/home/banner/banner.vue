<template>
  <div class="banner">
    <el-carousel :interval="5000" arrow="always" height="640px">
      <el-carousel-item v-for="item in bannerData">
        <a :href="item.targetUrl">
          <img class="banner-img" :src="item.bannerImageUrl" :title="item.title" alt="">
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>


<script>
  import axios from 'axios';
  export default {
    name: 'banner',
    data() {
      return {
        bannerData: [1, 2, 3, 4]
      }
    },
    methods: {
      obtain() {
        var _this = this;
        axios.get("api/banner/getPublishBannerList")
          .then(function(response) {
            var code = response.status;
            if (code !== 200) {
              _this.$message({
                message: '错误',
                type: 'error'
              });
            } else {
              _this.bannerData = response.data.data
              console.log(_this.bannerData)
            }
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    },
    mounted() {
      this.obtain();
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