<template>
  <div>
    <div class="button">
      <div class="nav">
        <a href="javascript:;">来自pcb分享的文件> </a>
      </div>
      <div class="btn">
        <button @click="download">
          <i class="el-icon-download"></i>
          下载
        </button>
        <button @click="selectAll">全选</button>

      </div>
    </div>

    <div class="file-box">
      <div class="file-container colum">
        <div v-for="(item,index) in datas">
          <div class="fileitem checkAll"   @click="checkItem($event,item)" @dblclick="preview(item.url)">
            <el-col  :span="5"><div  class="grid-content" >
              <i class="el-icon-video-camera" v-if="item.name.split('.')[1] == 'mp4'"></i>
              <i class="el-icon-picture-outline" v-else-if="item.name.split('.')[1] == 'png' || item.name.split('.')[1] =='jpg'"></i>
              <i class="el-icon-notebook-2" v-else-if="item.name.split('.')[1] == 'word'"></i>
              <i v-else class="el-icon-bank-card" ></i>
            </div></el-col>
            <el-col :span="19" style="text-align: left"><div class="grid-content" >
              {{item.name}}
            </div></el-col>
          </div>
        </div>

        <div>
          <el-pagination
              background
              layout="prev, pager, next"
              :total="100">
          </el-pagination>
        </div>

      </div>

    </div>
  </div>
</template>

<script>


  export default {
    name: "ShareFiles",
    data(){
      return{
        datas:[
          {
            id:2,
            name:'2.mp4',
            url:'https://sust-group-11.obs.cn-east-3.myhuaweicloud.com/ead7caa0-134e-4045-9544-389328682580.mp4'
          },
          {id:1,
            name:'1.jpg',
            url: 'https://sust-group-11.obs.cn-east-3.myhuaweicloud.com/1.jpg'
          },],
        checked:[],
        active:0
      }
    },
    components: {
    },
    methods:{
      getDocs(){
        var rightMenu  = document.querySelector('.rightmenu');
        var rightRow = document.querySelector('.row');
        var shutBtn = document.querySelector('.shutico');
        return {rightMenu, rightRow, shutBtn}
      },
      //点击人型图标弹出的菜单
      showRightmenu(){
        let {rightMenu, rightRow, shutBtn} = this.getDocs()
        rightMenu.style.width = '8rem';
        rightMenu.style.right = '0';
        rightMenu.style.opacity = '.8';
        shutBtn.style.display = 'block';
        rightRow.style.right = '8rem';
      },
      stopRightmenu(){
        const {rightMenu, rightRow, shutBtn} = this.getDocs()
        rightMenu.style.width = '';
        rightMenu.style.right = '';
        rightMenu.style.opacity = '';
        shutBtn.style.display = '';
        rightRow.style.right = '';
      },
      logOut(){
        sessionStorage.setItem('token',false)
        this.$router.push('/login')
      },

      //文件上传
      fileClick() {
        document.getElementById('file').click();

      },
      getFiles(e){
        let files = e.target.files
        files = [...files]
        // console.log(files[0])
        let formData = new FormData()
        files.forEach(file => {
          formData.append(file.name,file)
        })

        // console.log('formDataf',formData)
        upload({username:localStorage.getItem('username'),multipartFile:formData})
            .then(res => {
              if(res.date.status){
                this.$message({
                  message: res.data.message,
                  type: 'success',
                  duration:1000
                });
              }
            })
            .catch(err => {
              this.$message({
                message: res.data.message,
                type: 'error',
                duration:1000
              });
              console.log(err)
            })
      },
      //双击预览
      preview(url){
        window.open(url)
      },
      //文件下载
      download(){
        this.checked.forEach(item => {
          window.open(item.url + '?versionId=null', '')
        })

      },
      //删除
      delFile(){
        this.checked.forEach(item => {
          if(this.datas.indexOf(item) >= 0){
            this.datas[this.datas.indexOf(item)] = this.datas[this.datas.length-1]
            this.datas.pop()
          }
        })
        this.$message({
          message: '删除成功',
          type: 'success',
          duration:1000
        });
      },

      stopPropagation(event){
        event.stopPropagation();
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

      //全选
      selectAll(){
        this.active = !this.active
        let selectAlls = document.querySelectorAll('.checkAll')
        // console.log(selectAlls)
        if(this.active){
          selectAlls.forEach(item => {
            item.classList.add('active')
          })
          this.checked = JSON.parse(JSON.stringify(this.datas))
        }else{
          selectAlls.forEach(item => {
            item.classList.remove('active')
          })
          this.checked = []
        }

        console.log(this.checked)
      },
      //share
      share(){
        this.$alert('链接为：' + this.checked[0].url, '分享文件', {
          confirmButtonText: '确定'
        });
      },




    }
  }
</script>

<style scoped>
  .fileitem{
    height: 40px;
    line-height: 40px;
  }
  .el-icon-position{
    font-size: 1.2rem;
  }
  .el-pagination{
    position: absolute;
    top: 86vh;
    left: 50%;
    transform: translate(-50%);
  }
  .btn button{
    background: none;
  }
  .btn button:nth-of-type(2){
    background: none;
  }
</style>
