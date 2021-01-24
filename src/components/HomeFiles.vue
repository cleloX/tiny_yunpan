<template>
  <div>
    <div class="button">
      <div class="nav">
        <a href="javascript:;">全部文件> </a>
      </div>
      <div class="btn">
        <button @click="fileClick">
          <input type="file" id="file" style="display: none" @change="getFiles" multiple />
          上传
        </button>
        <button @click="download">
          <i class="el-icon-download"></i>
          下载
        </button>

<!--        <button>新建文件夹</button>-->

<!--        <button @click="rename">重命名</button>-->
        <button @click="share"><i class="el-icon-position"></i>分享</button>
        <button @click="delFile">删除</button>
        <button @click="selectAll">全选</button>

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

        <div class="fileitem" style="margin: 0 0 5px 0;box-shadow:none;background-color: rgba(0, 0, 0, 0.15);border-radius: 0 0 4px 4px">
          <el-col :span="12" ><div class="grid-content" >文件名</div></el-col>
          <el-col  :span="4"><div  class="grid-content" >文件类型</div></el-col>
          <el-col :span="8"><div class="grid-content" >文件大小</div></el-col>
        </div>


        <div v-for="(item,index) in datas" :key="item.fileid">
          <div class="fileitem checkAll" v-if="item.used"   @click="checkItem($event,item)" @dblclick="preview(item.url)">
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
  import {upload} from "../network/upload";
  import {getFileList} from "../network/getFileList";
  import {delFile} from "../network/deleteANDrecycle";

  export default {
    name: "HomeFiles",
    data(){
      return{
        datas:[
          {
            fileid:1,
            filename:'3.pdf',
            type:'pdf',
            size:'5kb',
            url:'',
            used:true,
            cateid:1,
            username:'pcb'

          },
          {
            fileid:2,
            filename:'2.mp4',
            type:'mp4',
            size:'5kb',
            url:'https://sust-group-11.obs.cn-east-3.myhuaweicloud.com/ead7caa0-134e-4045-9544-389328682580.mp4',
            used:true,
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
        checked:[],
        active:0
      }
    },
    components: {
    },
    mounted:function () {
      this.getFilesList()
    },
    methods:{
      //获取数据
      getFilesList() {
        let FormList = new FormData()
        FormList.append('username', sessionStorage.getItem('username'))
        getFileList(FormList)
            .then(res => {
              if (res.data.status) {
                this.datas = res.data.data
              }
            })
      },


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
        console.log(files)
        let formData = new FormData()
        files.forEach(file => {
          formData.append('multipartFile',file)
        })
        formData.append('username',sessionStorage.getItem('username'))

        // console.log('formDataf',formData)
        upload(formData)
          .then(res => {
            if(res.data.status){
              this.$message({
                message: res.data.message,
                type: 'success',
                duration:1000
              });
              this.getFilesList()
            }else{
              this.$message({
                message: res.data.message,
                type: 'error',
                duration:1000
              });
            }
          })
          .catch(err => {
            console.log(err)
          })
        // let reader = new FileReader();
        // reader.readAsDataURL(files[0]);
        // reader.onload = function () {
        //   console.log(reader.result)
        //   let data = reader.result.split(',')[1] //获得文件的base64格式



        //解析成本地文件并浏览器下载
          // var raw = window.atob(data);
          // var uInt8Array = new Uint8Array(raw.length);
          // for (var i = 0; i < raw.length; i++) {
          //   uInt8Array[i] = raw.charCodeAt(i);
          // }
          //
          // const link = document.createElement("a");
          // const blob = new Blob([uInt8Array],{
          //   type: 'application/vnd.ms-excel'
          // })
          //
          // link.style.display = 'none';
          // link.href = URL.createObjectURL(blob);
          // link.setAttribute('download','对比结果_'+ 'nnnnnnnn'+'.xlsx');
          //
          // document.body.appendChild(link)
          // link.click()
          //
          // document.body.removeChild(link)
          // console.log(data)
          // upload({username:JSON.parse(localStorage.getItem('login-form')),data:data})

        // };
      },
      //双击预览
      preview(url){
        window.open(url)
      },
      //文件下载
      async download(){
        // this.checked.forEach((item) => {
        //   window.open(item.url + '?response-content-disposition=attachment', '_self')
        // })
        for(let i=0;i<this.checked.length;i++){
          //华为云obs对象通过连接url可以直接访问（预览），通过加参数response-content-disposition=attachment，可以实现下载
          await window.open(this.checked[i].url + '?response-content-disposition=attachment', '_self')

        }

      },
      //删除
      delFile(){
        let del = new FormData()
        // this.checked.forEach(item => {
        //   if(this.datas.indexOf(item) >= 0){
        //     this.datas[this.datas.indexOf(item)] = this.datas[this.datas.length-1]
        //     this.datas.pop()
        //   }
        // })
        del.append('fileid', this.checked[0].fileid)
        del.append('username', this.checked[0].username)
        delFile(del)
          .then(res => {
            if(res.data.status){
              this.$message({
                message: '删除成功',
                type: 'success',
                duration:1000
              });
              this.getFilesList()
            }
          })

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
        console.log(window.location.href)

        this.$alert(`链接为：${window.location.href.split('/files')[0]}/share?folderID=5\n提取码: pcbb`, '分享文件', {
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
</style>
