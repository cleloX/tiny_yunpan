<template>
  <div class="home">
    <div class="disk_wrap">
      <div class="imgShowBox">
        <div class="imgShow"></div>
        <button class="btnimg"></button>
      </div>
      <section class="left">
<!--        <div class="left_menu">-->
<!--          <div class="user"></div>-->
<!--          <div class="disk"></div>-->
<!--          <div class="chat"></div>-->

<!--          <div class="rubbish"></div>-->
<!--          <div class="set"></div>-->
<!--        </div>-->
        <div class="left_list">
          <div class="titlelist">
            我的云盘
          </div>
          <ul class="list">
            <li>
              <span>标题1</span>
              <ul>
                <li>
                  <span>标题一</span>
                </li>
              </ul>
            </li>
            <li>
              <span>标题2</span>
              <ul>
                <li>
                  <span>标题一</span>
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="left_scroll"></div>
      </section>


      <section class="main">

        <div class="message"></div>
        <div class="confirm">
          <span></span>
          <div class="text">你确定要删除吗</div>
          <div class="click">
            <div class="checkbox active"></div>
            <strong >不再显示</strong>
            <button>是</button>
            <button>否</button>
          </div>
        </div>
        <div class="cover">
          <h1>重复的项目</h1>
          <span class="coverNum">你有3个文件重名了大哥.</span>
          <span>请对文件进行相应的操作:</span>
          <ul class="flieCover">
            <li>
              <span>文件一</span>
              <div class="flieCover-btn">
                <button>覆盖</button>
                <button>新建</button>
                <button>忽略</button>
              </div>
            </li>
          </ul>

          <div class="fileCoverBtn">
            <button>取消移动</button>
            <button>确定</button>
          </div>
        </div>

        <div class="banner">
          <div class="row">

            <span class="searchbtn"></span>
            <input class="searchtext" />
            <span class="mes"></span>
            <span class="headico" @click="showRightmenu"></span>
          </div>
          <div class="rightmenu">
            <div class="shutico" @click="stopRightmenu"></div>
            <ul class="col_ul">
              <li>我的账户</li>
              <li v-if="isAdmin" @click="userManage">用户管理</li>
              <li @click="logOut">注销</li>
            </ul>
          </div>
        </div>

        <router-view></router-view>

<!--          <div class="listShow">-->
<!--            <div class="moveplace">-->
<!--              <button class="active"></button><button></button>-->
<!--            </div>-->
<!--            <ul class="rubbishBox">-->

<!--            </ul>-->
<!--            <ul class="listShowBox">-->

<!--            </ul>-->
<!--            <div class="listBtn">-->
<!--              <button class="listBtnConfirm">移动</button>-->
<!--              <button class="listBtnCancel">取消</button>-->
<!--            </div>-->
<!--          </div>-->


      </section>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Home',
  data(){
    return{
      isAdmin:sessionStorage.getItem('isAdmin') ? true:false,
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
      sessionStorage.removeItem('isAdmin')
      this.$router.push('/login')
    },
    //进入用户管理
    userManage(){
      this.$router.push('/home/userManage')
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

      // let reader = new FileReader();
      // reader.readAsDataURL(files[0]);
      // reader.onload = function () {
      //
      //   let data = reader.result.split(',')[1] //获得文件的base64格式
      //   upload({username:JSON.parse(localStorage.getItem('login-form')),data:data})
      //
      // };
    },


    stopPropagation(event){
      event.stopPropagation();
    },
    //选中文件

    checkItem(e,id){
      let  _this = this
      function getNode(node) {
        if (node.className == 'fileitem') {
          node.classList.add('active')
          _this.checked.push(id)
          console.log(_this.checked)
        } else {
          getNode(node.parentNode)
        }
      }

      getNode(e.target)
      console.log(e.target.parentNode.parentNode.parentNode)
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
  .el-row {
    height: 100%;
  }
  .grid-content{
    height: 40px;
    line-height: 40px;
  }

</style>
