<template>
  <div class="login">
    <div class="login-form">
      <img class="form-img" src="../../assets/logo.png" alt="">
      <el-form :model="ruleForm2" :rules="rules2" ref="ruleForm2" label-position="left" label-width="0px" class="demo-ruleForm login-container">
        <h3 class="title">重置密码</h3>
        <el-form-item prop="account">
          <el-input type="text" v-model="ruleForm2.account" auto-complete="off" placeholder="邮箱/账号"></el-input>
        </el-form-item>
        <el-form-item prop="validate">
          <el-input type="text" v-model="ruleForm2.validate" auto-complete="off" placeholder="验证码">
          </el-input>
          <el-button @click="sendMsg">{{buttonName}}</el-button>
        </el-form-item>
        <el-form-item prop="checkPass">
          <el-input type="password" v-model="ruleForm2.checkPass" auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item prop="checkPass2">
          <el-input type="password" v-model="ruleForm2.checkPass2" auto-complete="off" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item style="width:100%;">
          <el-button type="success" style="width:100%;" @click.native.prevent="handleSubmit2" :loading="logining">确认修改</el-button>
        </el-form-item>
      </el-form>
      <p @click="login" class="res-login">返回登录</p>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'modify',
    data() {
      return {
        buttonName: "发送短信",
        isDisabled: false,
        time: 60,
        logining: false,
        ruleForm2: {
          account: '',
          validate: '',
          checkPass: '',
          checkPass2: ''
        },
        rules2: {
          account: [{
            required: true,
            message: '请输入账号',
            trigger: 'blur'
          }, ],
          validate: [{
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }, ],
          checkPass: [{
            required: true,
            message: '请输入密码',
            trigger: 'blur'
          }, ],
          checkPass2: [{
            required: true,
            message: '您输入密码不一致',
            trigger: 'blur'
          }, ]
        }
      };
    },
    methods: {
      handleSubmit2(ev) {
        var _this = this;
        this.$refs.ruleForm2.validate((valid) => {
          if (valid) {
            this.logining = true;
            var loginParams = {
              account: this.ruleForm2.account,
              validate: this.ruleForm2.validate,
              checkPass: this.ruleForm2.checkPass,
              checkPass2: this.ruleForm2.checkPass2
            };
            axios.post("api/user/retrieve", loginParams)
              .then(function(response) {
                // console.log(loginParams)  //向后台传值
                _this.logining = false;
                var code = response.status;
                if (code !== 200) {
                  _this.$message({
                    message: '错误',
                    type: 'error'
                  });
                } else {
                  _this.$message({
                    message: '修改成功请点击立即登录',
                    type: 'success'
                  });
                  _this.ruleForm2.account = '';
                  _this.ruleForm2.validate = '';
                  _this.ruleForm2.checkPass = '';
                  _this.ruleForm2.checkPass2 = '';
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
      //获取验证码
      sendMsg() {
        let me = this;
        if (me.isDisabled) {
          return;
        } else {
          me.isDisabled = true;
          let interval = window.setInterval(function() {
            me.buttonName = me.time + '秒';
            --me.time;
            if (me.time < 0) {
              me.buttonName = "重新发送";
              me.time = 10;
              me.isDisabled = false;
              window.clearInterval(interval);
            }
          }, 1000);
        }
      },
      //跳转到登录页面
      login() {
        this.$router.push({
          path: '/login'
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
      .el-button--default {
        background: rgba(103, 195, 58, .5);
        color: #fff;
        border: 0;
        position: absolute;
        right: 1px;
        width: 40%;
        top: 1px;
      }
    }
    .res-login {
      margin-top: 30px;
      color: #fff;
      text-align: center;
      cursor: pointer;
      line-height: 40px;
    }
    .res-login:hover {
      color: red;
    }
  }
</style>
