<template>
    <div class="Nav_box">
      <a-dropdown>
        <div class="Nav_main">
        <a class="ant-dropdown-link" @click="e => e.preventDefault()">
          <a-avatar class="nav_avatar" shape="square" :size="32" icon="user" :src="avatar"/>
          <span class="Nav_username">{{username}}</span>
        </a>
        </div>
        <a-menu class="Drop_menu" slot="overlay">
          <a-menu-item>
            <a @click="userInfo()"><i class="el-icon-user"></i><div class="menu_item">个人信息</div></a>
          </a-menu-item>
          <a-menu-item>
            <a @click="updateAvatar()"><i class="el-icon-cloudy"></i><div class="menu_item">更换头像</div></a>
          </a-menu-item>
          <a-menu-item>
            <a @click="updatePassword()"><i class="el-icon-delete"></i><div class="menu_item">修改密码</div></a>
          </a-menu-item>
          <a-menu-item>
            <a @click="logout()"><i class="el-icon-switch-button"></i><div class="menu_item">退出登录</div></a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
    </div>
</template>

<script>
  export default {
    name: 'NavMenu',
    data () {
      return {
        username:this.$store.getters.getUsername, 
        avatar:this.$store.getters.getAvatar,
      }
    },
    methods: {
      userInfo(){
        this.$router.push({
          path:'/index/userinfo',
          query:{
            username:this.username
          }
        })
      },
      updateAvatar(){
        this.$router.push({
          path:'/index/updateavatar',
          query:{
            username:this.username
          }
        })
      },
      updatePassword(){
        this.$router.push({
          path:'/index/updatepassword',
          query:{
            username:this.username
          }
        })
      },
      logout(){
        var _this = this;
        this.axios.get('/logout').then(res =>{
          if(res.data.code === 200){
            _this.$store.commit('logout')
            _this.$router.replace('/')
          }
        })
      }
    },
  }
</script>

<style scoped>
.Nav_box{
  width: auto;
  line-height: 64px;
  padding: 0 10px;
}

.nav_avatar{
  margin-right: 10px;
}

.Drop_menu{
  margin-top: -2px;
}

.Nav_main{
  line-height: 38px;
  width: auto;
  min-width: 120px;
  height: 38px;
  padding: 0px 5px;
  border-radius: 4px;
  transition:all .5s linear;
}
.Nav_main a{
  color: black;
}
.Nav_main:hover{
  background: rgb(228, 227, 227);
}

.menu_item{
  display: inline;
  font-size: 5px;
  margin-left: 15px;
}

.Nav_username{
  display: inline-block;
  width: auto;
  min-width: 70px;
  text-align: center;
}
</style>

