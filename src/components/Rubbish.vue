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
        <div v-for="item in datas">
          <div class="fileitem" @contextmenu.prevent="showRightClickMenu" @click="checkItem($event,item.id)">
            <el-row >
              <el-col :span="24"><div class="grid-content" >
                <i class="el-icon-video-camera" v-if="item.name.split('.')[1] == 'mp4'"></i>
                <i class="el-icon-picture-outline" v-else-if="item.name.split('.')[1] == ('png' || 'jpg')"></i>
                <i class="el-icon-notebook-2" v-else-if="item.name.split('.')[1] == 'word'"></i>
                <i v-else class="el-icon-bank-card" ></i>
                {{item.name}}
              </div></el-col>

<!--              <el-col :span="24"><div class="grid-content" >{{item.name}}</div></el-col>-->
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Rubbish",
    data(){
      return{
        datas:[
          {id:1,
            name:'1.pdf'
          },
          {
            id:2,
            name:'2.mp4'
          }],
        checked:[]
      }
    },
    methods:{
      //选中文件
      checkItem(e,id){
        console.log(e.target)
        let  _this = this
        function getNode(node) {
          if (node.className.includes('fileitem')) {
            if(node.className.includes('active')){
              node.className = 'fileitem'
              _this.checked[_this.checked.indexOf(id)] = _this.checked[_this.checked.length-1]
              _this.checked.pop()
            }else {
              node.classList.add('active')
              _this.checked.push(id)
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
        for (let i = 0;i<this.datas.length;i++){
          if(this.datas[i].id == this.checked[0]){
            let _this = this

            _this.datas[i] = _this.datas[_this.datas.length-1]
            _this.datas.pop()
          }
        }

      },
      //清空回收站
      empty(){
        this.datas = []
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
