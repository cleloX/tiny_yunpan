<template>
  <div class="userManage">
<!--    添加用户填表-->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话号码" :label-width="formLabelWidth">
          <el-input v-model="form.tel" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="single">确 定</el-button>
      </div>
    </el-dialog>

    <el-container>
      <el-header>
        <el-row class="userNav">
          <el-col :span="4"><div class="grid-content " style="">用户管理></div></el-col>
          <el-col :span="14"><div class="grid-content "></div></el-col>
          <el-col :span="3"><div class="grid-content "><el-button type="primary" @click="dialogFormVisible = true">添加用户</el-button></div></el-col>
          <input type="file" id="userFile" style="display: none" @change="getFiles">
          <el-col :span="3"><div class="grid-content "><el-button type="success" @click="fileClick">批量导入</el-button></div></el-col>
        </el-row>
      </el-header>
      <el-main>
        <el-row>
          <el-col :span="4"><div class="active grid-content bg-purple">用户名</div></el-col>
          <el-col :span="4"><div class="active grid-content bg-purple">手机号</div></el-col>
          <el-col :span="4"><div class="active grid-content bg-purple">邮箱</div></el-col>
          <el-col :span="4"><div class="active grid-content bg-purple">真实姓名</div></el-col>
          <el-col :span="4"><div class="active grid-content bg-purple">用户操作</div></el-col>
          <el-col :span="4"><div class="active grid-content bg-purple">用户请求</div></el-col>
        </el-row>
        <el-row v-for="(item,index) in userList">
          <el-col :span="4"><div class="grid-content bg-purple">{{item.username}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{item.tel}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{item.email}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">{{item.name}}</div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <i class="el-icon-warning-outline" v-if="item.status" @click="statusToFalse(item.username,index)"></i>
            <i class="el-icon-warning" v-if="!item.status" @click="statusToTrue(item.username,index)"></i>
            <i class="el-icon-delete" @click="userDel(item.username,index)"></i>
          </div></el-col>
          <el-col :span="4"><div class="grid-content bg-purple">
            <i class="el-icon-circle-check"></i>
            <i class="el-icon-circle-close"></i>
          </div></el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>

<script>
  import {adminBatch, adminSingle} from "../network/admin";

  export default {
    name: "userManage",
    data(){
      return{
        requestChange:null,
        userList:[
          {
            username:'11',
            tel:'123123',
            email:'123123',
            name:'11',
            status:true
          },
          {
            username:'22',
            tel:'2222',
            email:'2222',
            name:'22222',
            status:true
          },
          {
            username:'33',
            tel:'333',
            email:'333333',
            name:'3333333',
            status:false
          }
        ],
        dialogFormVisible:false,
        form: {
          name: '',
          username:'',
          email:'',
          tel:''
        },
        formLabelWidth: '100px'

      }
    },
    methods:{
      statusToFalse(username,index){
        this.userList[index].status = false
      },
      statusToTrue(username,index){
        this.userList[index].status = true
      },
      userDel(username,index){
        this.userList.splice(index,1)
      },


      //文件形式批量导入
      fileClick() {
        document.getElementById('userFile').click();

      },
      getFiles(e){
        let files = e.target.files
        console.log(files[0])
        let formData = new FormData()
        formData.append(files[0].name,files[0])
        console.log('formDataf',formData)
        let _this = this

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          console.log(reader.result)
          let data = reader.result.split(',')[1] //获得文件的base64格式
          
          adminBatch({data})
            .then(res => {
              console.log(res);
              if(res.data.status){
                _this.$message({
                  showClose: true,
                  message: '导入成功',
                  type: 'success'
                });
              }
              //再次请求数据
            })
            .catch(err => {
              _this.$message({
                  showClose: true,
                  message: '导入失败',
                  type: 'waring'
                });
                console.log(err);
            })
        };
      },
      single(){
        this.dialogFormVisible = false
        adminSingle(this.form)
          .then(res => {
            if(res.data.status){
              this.$message({
                showClose: true,
                message: '导入成功',
                type: 'success'
              });
            }
          })
      }
    }
  }
</script>

<style scoped>
   .userManage{
     height: 100vh;
     /*background-color: #3B2835;*/
   }
  .el-header {
    background-color: rgba(46, 108, 205, 0.31);
    color: #333;
    text-align: center;
    line-height: 3rem;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    /*line-height: 500px;*/
    height: 95vh;
  }
   .userNav .el-col{
     line-height: 60px;
     align-items: center;

   }

   .el-row .el-col:nth-child(6){
     margin-bottom: 0.1rem;
   }

   .el-col {
     border-radius: 4px;
     line-height: 36px;
     align-items: center;
     align-content: center;
   }
   .bg-purple {
     background: rgba(211, 220, 230, 0.36);
   }
   .grid-content {
     border-radius: 4px;
     min-height: 36px;
   }
  .active{
    background: rgb(211, 220, 230);
  }
  .el-icon-circle-check{
    color: green;
    margin-right: 1.5rem;
    font-size: 1.5rem;
  }
  .el-icon-circle-close{
    color: red;
    font-size: 1.5rem;
  }
  .el-icon-warning-outline{
    color: green;
    margin-right: 1.5rem;
    font-size: 1.5rem;
  }
  .el-icon-warning{
    color: red;
    margin-right: 1.5rem;
    font-size: 1.5rem;
  }
  .el-icon-delete{
    color: red;
    font-size: 1.5rem;
  }

</style>
