<template>
  <div class="login">
    <div class="login-wrap">
      <div class="login-title">
        <small>欢迎使用云盘，请登录！</small>
      </div>
      <div class="login-form">
        <el-form :model="form" :rules="formRules" ref="login-form">
          <el-form-item prop="username">
            <el-input
                prefix-icon="el-icon-user"
                v-model="form.username"
                @keypress.native.enter="login"
                placeholder="请输入账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                type="password"
                prefix-icon="el-icon-lock"
                v-model="form.password"
                @keypress.native.enter="login"
                placeholder="请输入密码">
            </el-input>
          </el-form-item>
          <el-form-item style="margin: 0;">
            <el-checkbox-group v-model="remember">
              <el-checkbox
                  label="记住密码"
                  name="remember">
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item style="margin: 10px 0;">
            <el-button
                type="primary"
                @click="login"
                :loading="isLoading">
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from '@/network/login'
  export default {
    data(){
      return {
        isLoading: false,
        remember: false,
        form: {
          username: '',
          password: '',
        },
        formRules: {
          username: [
            { required: true, message: '请输入账号', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码', trigger: 'blur' }
          ]
        }
      }
    },
    mounted(){

      this.remember = localStorage.getItem('login-remember') === 'true' ? true : false
      let loginForm = localStorage.getItem('login-form')
      if(loginForm){
        this.form = JSON.parse(loginForm)
      }
    },
    methods: {
      // 登录
      login(){
        this.$refs['login-form'].validate(async (flag) => {
          if(!flag) return

          this.isLoading = true
          localStorage.setItem('login-remember', this.remember)

          // 记住密码
          if(this.remember){
            localStorage.setItem('login-form', JSON.stringify(this.form.username))
          }else{
            localStorage.removeItem('login-form')
          }
          login({username:this.form.username,password:this.form.password})
            .then(res => {
              this.isLoading = false
              console.log(res);
              if(!res.status || res.data.status == -1){
                return this.$message.error('账号或者密码错误！！')
              }
              sessionStorage.setItem('token',true)
              if(res.data.status == 1)
                sessionStorage.setItem('isAdmin',true)
              this.$message({
                type: 'success',
                message: '登录成功，正在为你跳转'
              })

              setTimeout(() => {
                this.$router.push('/home')
              }, 1000)
            })


        })
      }
    }
  }
</script>

<style scoped>
  .login{
    position: absolute;
    width: 100%;
    height: 100%;
    background: url('../assets/images/login-bg.svg') center no-repeat rgba(240, 240, 240, 0.6);
    background-size: 100%;
  }
  .login-wrap{
    width: 400px;
    /* background: orange; */
    margin: 5% auto;
    padding: 15px;
  }
  .login-title{
    text-align: center;
    line-height: 50px;
  }
  .login-title h1{
    color: #444;
    font-weight: normal;
  }
  .login-title small{
    color: #888;
  }

  .login-form{
    margin: 10px 0 0 0;
  }
  .login-form .el-button{
    width: 100%;
    font-size: 16px;
  }
  .el-form-item{
    margin: 20px 0;
  }

  a{
    color: #aaa;
    cursor: pointer;
  }
  a:hover{
    color: #409EFF;
  }

  @media screen and (max-width: 768px) {
    .login-wrap{
      width: 100%;
      margin: 20% 0;
    }
  }
</style>
