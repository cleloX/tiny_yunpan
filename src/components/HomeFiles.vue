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
        <button @click="fileClick">
          <i class="el-icon-download"></i>
          下载
        </button>

        <button>新建文件夹</button>
        <button>删除</button>
        <button>重命名</button>
        <button>全选</button>

      </div>
    </div>

    <div class="file-box">
      <div class="file-container colum">
        <div class="fileitem">
          <div class="pic"></div>
          <div class="name">
            <span>新建文件夹</span>
            <input type="text" value="重命名" />
          </div>
        </div>
        <div v-for="item in datas">
          <div class="fileitem" @contextmenu.prevent="showRightClickMenu" @click="checkItem($event,item.id)">
            <el-row >
              <el-col :span="24"><div class="grid-content" @clickable="false">{{item.name}}</div></el-col>
            </el-row>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeFiles",
    data(){
      return{
        datas:[
          {id:1,
            name:'png'
          },
          {
            id:2,
            name:'mp4'
          }],
        checked:[]
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
        console.log(files[0])
        let formData = new FormData()
        formData.append(files[0].name,files[0])
        console.log('formDataf',formData)

        let reader = new FileReader();
        reader.readAsDataURL(files[0]);
        reader.onload = function () {
          console.log(reader.result)
          let data = reader.result.split(',')[1] //获得文件的base64格式



          var raw = window.atob(data);
          var uInt8Array = new Uint8Array(raw.length);
          for (var i = 0; i < raw.length; i++) {
            uInt8Array[i] = raw.charCodeAt(i);
          }

          const link = document.createElement("a");
          const blob = new Blob([uInt8Array],{
            type: 'application/vnd.ms-excel'
          })

          link.style.display = 'none';
          link.href = URL.createObjectURL(blob);
          link.setAttribute('download','对比结果_'+ 'nnnnnnnn'+'.xlsx');

          document.body.appendChild(link)
          link.click()

          document.body.removeChild(link)
          // console.log(data)
          // upload({username:JSON.parse(localStorage.getItem('login-form')),data:data})

        };
      },


      stopPropagation(event){
        event.stopPropagation();
      },
      //选中文件

      checkItem(e,id){
        console.log(e.target)
        let  _this = this
        function getNode(node) {
          if (node.className.includes('fileitem')) {
            if(node.className.includes('active')){
              node.className = 'fileitem'
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


      showRightClickMenu(e){
        //鼠标在空白处跳出菜单
        if(e.target.classList.contains('file-container')){
          if(isRec)return; //在回收站不能新建
          menu =  creatMenu(data_menu,false);
          fileWrap.appendChild(menu);
          menuMove(e,menu);
        };
        //鼠标在文件夹范围内跳出菜单
        if(getParentCls(e.target,'fileitem')){
          menu =  creatMenu(data_menu,true);
          fileWrap.appendChild(menu);
          menuMove(e,menu);
        }

        // 菜单隐藏
        document.addEventListener('mouseup',function(e){
          if(isOpenMenu){
            fileWrap.removeChild(menu);
            isOpenMenu = false;
          }
        });
      },

      //创建菜单
      creatMenu(dataMenu,isFile){
        var div = document.createElement('div');
        div.className = 'menu';

        var menuList = [];
        if(isFile){
          if(isRec){
            menuList = ['del','rename','moveto'];
          }else{
            menuList = ['del','rename','moveto','copyto','paste'];
          }
        }else{
          menuList = ['creat','upload','paste'];
        }

        menuList.forEach(function(item){
          var a = document.createElement('a');
          var span = document.createElement('span');
          span.innerHTML = dataMenu[item].name;
          span.onmouseup = dataMenu[item].click;
          //		a.onmouseup = dataMenu[item].click;
          span.style.background = dataMenu[item].background;
          span.style.backgroundSize = dataMenu[item]['background-size'];
          a.appendChild(span);
          div.appendChild(a);
        })

        return div;
      }


    }
  }
</script>

<style scoped>

</style>
