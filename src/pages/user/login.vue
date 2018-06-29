<template>
  <div class="login">
    <div class="login-form">
      <img class="form-img" src="../../assets/logo.png" alt="">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">系统登录</h3>
        <el-form-item prop="account">
          <el-input id="aaa" type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="邮箱/账号"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="success" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">登录</el-button>
          <!-- <el-button type="danger" style="width:100%;" @click.native.prevent="handleReset2">重置</el-button> -->
        </el-form-item>
        <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
        <p @click="modify" class="forget">忘记密码?</p>
      </el-form>
      <div class="login-res">
        <p>还没有小小贱账号？</p>
        <el-button @click="register" style="width:100%">立即注册</el-button>
      </div>
      <div class="login-text">
        <p>开发有你，瞬间爆炸</p>
        <p>自助化服务</p>
        <p>快速寄到现有产品</p>
        <p>新的通讯世界在这里等您</p>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'login',
    data() {
      return {
        logining: false,
        ruleForm2: {
          account: '',
          checkPass: ''
        },
        rules2: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, ],
          checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, ]
        },
        checked: true
      };
    },
    methods: {
      // handleReset2() {
      //   this.$refs.ruleForm2.resetFields();
      // },
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              account: this.ruleForm2.account,
              checkPass: this.ruleForm2.checkPass
            };
            axios.post("api/user/login", loginParams)
              .then(function(response) {
                // console.log(loginParams)  //向后台传用户名和密码
                _this.logining = false;
                var code = response.status;
                var userInfo = response.data;
                if (code !== 200) {
                  _this.$message({
                    message: '错误',
                    type: 'error'
                  });
                } else {
                  //登录成功后将token存储在cookie之中
                  _this.$store.commit('SET_TOKEN', userInfo.data.token)
                  _this.$store.commit('GET_USER', userInfo.data)
                  _this.$router.push({
                    path: '/home',
                    params: userInfo
                  });
                  // Cookies.set('Token', userInfo.token) //登录成功后将token存储在cookie之中
                  // sessionStorage.setItem('userInfo', JSON.stringify(userInfo));
                }
              })
              .catch(function(error) {
                console.log(error);
              });
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      // 注册
      modify() {
        this.$router.push({
          path: '/modify'
        });
      },
      register() {
        this.$router.push({
          path: '/register'
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .login {
    width: 100%;
    height: 100%;
    background-image: url(../../assets/bg.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    .login-form {
      width: 400px;
      margin: 0 auto;
      padding-top: 100px;
      .form-img {
        display: block;
        width: 300px;
        margin: 0 auto;
      }
      .el-button--success {
        background: rgba(103, 195, 58, .5);
        border-color: rgba(103, 195, 58, .5);
      }
      .title {
        text-align: center;
        height: 50px;
        line-height: 50px;
        margin: 10px 0;
        font-size: 22px;
        color: #fff;
        position: relative;
      }
      .title:after {
        content: '';
        position: absolute;
        left: 0;
        top: 28px;
        width: 140px;
        height: 1px;
        background: #fff;
      }
      .title:before {
        content: '';
        position: absolute;
        right: 0;
        top: 28px;
        width: 140px;
        height: 1px;
        background: #fff;
      }
      .el-input__inner {
        background: none;
        color: #fff;
        border-color: #fff;
      }
      .el-checkbox__label {
        color: #fff;
      }
      .el-checkbox__input.is-checked+.el-checkbox__label {
        color: #67c23a;
      }
      .el-checkbox__input.is-checked .el-checkbox__inner {
        background: #67c23a;
      }
      .forget {
        color: #fff;
        cursor: pointer;
        float: right;
        padding-top: 5px;
        font-size: 14px;
      }
      .login-res {
        margin-top: 70px;
        p {
          text-align: center;
          color: #fff;
          font-size: 14px;
          line-height: 46px;
        }
        .el-button {
          background: none;
          color: #fff;
        }
        .el-button:hover {
          background: rgba(103, 195, 58, 0.5);
        }
      }
      .login-text {
        position: absolute;
        bottom: 100px;
        left: 0;
        right: 0;
        color: #fff;
        text-align: center;
        font-size: 14px;
        line-height: 30px;
      }
    }
  }
</style>
