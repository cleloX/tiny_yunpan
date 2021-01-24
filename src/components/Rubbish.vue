<template>
  <div>
    <div class="button">
      <div class="nav">
        <a href="javascript:;">回收站文件> </a>
      </div>
      <div class="btnRubbish">
        <button @click="recover"><i class="el-icon-refresh-left"></i>恢复</button>
        <button @click="empty"><i class="el-icon-s-release"></i> 清空回收站</button>
        <!--        <button>全选</button>-->

      </div>
    </div>

    <div class="file-box">
      <div class="file-container colum">
<!--        <div class="fileitem">-->
<!--          <div class="pic"></div>-->
<!--          <div class="name">-->
<!--            <span>新建文件夹</span>-->
<!--            <input type="text" value="重命名" />-->
<!--          </div>-->
<!--        </div>-->
        <div v-for="(item,index) in datas" :key="item.fileid">
          <div class="fileitem checkAll" v-if="!item.used"   @click="checkItem($event,item)" @dblclick="preview(item.url)">
            <el-col :span="12" ><div class="grid-content" >{{item.filename}}</div></el-col>
            <el-col  :span="4"><div  class="grid-content" >
              <i class="el-icon-video-camera" v-if="item.type === 'mp4'"></i>
              <i class="el-icon-picture-outline" v-else-if="item.type === 'png' || item.type ==='jpg'"></i>
              <i class="el-icon-notebook-2" v-else-if="item.type === 'word'"></i>
              <i v-else class="el-icon-bank-card" ></i>
              {{item.type}}
            </div></el-col>
            <el-col :span="8"><div class="grid-content" >{{item.size}}</div></el-col>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getFileList} from "../network/getFileList";
  import {recycle} from "../network/deleteANDrecycle";

  export default {
    name: "Rubbish",
    data(){
      return{
        datas:[
          {
            fileid:1,
            filename:'3.pdf',
            type:'pdf',
            size:'5kb',
            url:'',
            used:0,
            cateid:1,
            username:'pcb'

          },
          {
            fileid:2,
            filename:'2.mp4',
            type:'mp4',
            size:'5kb',
            url:'https://sust-group-11.obs.cn-east-3.myhuaweicloud.com/ead7caa0-134e-4045-9544-389328682580.mp4',
            used:0,
            cateid:1,
            username:'pcb'

          },
          {
            fileid:3,
            filename:'1.jpg',
            type:'jpg',
            size:'800kb',
            url:'https://sust-group-11.obs.cn-east-3.myhuaweicloud.com/1.jpg',
            used:true,
            cateid:1,
            username:'pcb'

          }
        ],
        checked:[]
      }
    },
    created:function() {
      this.getFilesList()
    },
    methods:{
      //获取数据
      getFilesList(){
        let FormList = new FormData()
        FormList.append('username',sessionStorage.getItem('username'))
        getFileList(FormList)
            .then(res => {
              if(res.data.status){
                this.datas = res.data.data
              }
            })
      },

      //选中文件
      checkItem(e,item){
        console.log(e.target)
        let  _this = this
        function getNode(node) {
          if (node.className.includes('fileitem')) {
            if(node.className.includes('active')){
              node.className = 'fileitem'
              _this.checked[_this.checked.indexOf(item)] = _this.checked[_this.checked.length-1]
              _this.checked.pop()
            }else {
              node.classList.add('active')
              _this.checked.push(item)
            }

            console.log(_this.checked)
          } else {
            getNode(node.parentNode)
          }
        }

        getNode(e.target)
      },



      //恢复文件
      recover(){
        // for (let i = 0;i<this.datas.length;i++){
        //   if(this.datas[i] == this.checked[0]){
        //     let _this = this
        //
        //     _this.datas[i] = _this.datas[_this.datas.length-1]
        //     _this.datas.pop()
        //     this.$message({
        //       message: '恢复文件成功',
        //       type: 'success',
        //       duration:1000
        //     });
        //     return
        //   }
        // }
        //
        // this.$message({
        //   message: '恢复文件失败',
        //   type: 'error',
        //   duration:1000
        // });
        let rec = new FormData()
        rec.append('fileid', this.checked[0].fileid)
        rec.append('username', this.checked[0].username)
        recycle(rec)
            .then(res => {
              if(res.data.status){
                this.$message({
                  message: '恢复成功',
                  type: 'success',
                  duration:1000
                });
                this.getFilesList()
              }
            })

      },
      //清空回收站
      empty(){
        this.datas = []
        this.$message({
          message: '清空回收站成功',
          type: 'success',
          duration:1000
        });
      }

    }
  }
</script>

<style scoped>
  .btnRubbish{
    right: 10px;
    height: 100%;
    display: flex;
    position: absolute;
    justify-content: center;
  }
  .btnRubbish button{
    margin-left: 8px;
    text-align: left;
    padding-left: 24px;
    height: 100%;
    box-sizing: border-box;
    border: none;
    font-size:16px ;
    box-sizing:border-box ;
    color: #999999;
    outline: none;
    background-color: #F6F6F6;
  }

  .btnRubbish button:hover{
    /*background: url(../image/uploadhover.png)no-repeat 0px center;*/
    background-size:30% ;
    color: #09AAFF;
    cursor: pointer;
  }

  .el-icon-s-release, .el-icon-refresh-left{
    font-size: 1.2rem;
  }
  .fileitem{
    height: 40px;
    line-height: 40px;
  }
</style>
