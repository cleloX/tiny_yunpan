<template>
<div class="shareBody">
  <div class="verifyBox">
    <el-container>
      <el-header>来自 <span style="color: rgba(0,0,0,0.71)">pcb</span> 分享的文件</el-header>
      <el-main>
        <el-form :inline="true"  class="demo-form-inline">
          <el-form-item label="">
            <el-input v-model="input" placeholder="请输入提取码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onVerify">提取</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>
  </div>
</div>
</template>

<script>
  export default {
    name: "Verify",
    data(){
      return{
        input:'',
        shareFolder:{
          username:'',
          folderID:5
        }
      }
    },
    created() {
      console.log(this.$route.params.folderID)
    },
    methods:{
      onVerify(){
        if(this.input === 'pcbb'){
          sessionStorage.setItem('shareVerify',true)
          this.$router.push({path:'/home/share',params:{folderID:this.$route.params.folderID,username:this.$route.params.username}})
        }else {
          this.$message({
            message: '提取码输入错误，请重试',
            type: 'error',
            duration:1000
          });
        }
      }
    }
  }
</script>

<style scoped>
.shareBody{
  /*position: absolute;*/
  width: 100vw;
  height: 100vh;
  background: url('../../assets/images/login-bg.svg') center no-repeat rgba(240, 240, 240, 0.6);
  background-size: 100%;
}
  .verifyBox{
    height: 400px;
    width: 460px;
    margin-left: 50%;
    padding-top: 30vh;
    transform: translate(-50%);
  }
.el-header {
  border-radius: 8px 8px 0 0;
  background-color: #09AAFF;
  color: rgba(0, 0, 0, 0.55);
  text-align: center;
  height: 120px !important;
  line-height: 120px;
  font-size: 1.5rem;
}
.el-main {
  border-radius:0 0 8px 8px;
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  /*line-height: 220px;*/
  height: 220px;
}
  .demo-form-inline{
    margin-top: 3rem;
  }
</style>
