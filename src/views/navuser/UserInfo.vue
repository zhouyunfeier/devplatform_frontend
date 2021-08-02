<template>
  <div style="height: 800px;">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="个人信息" name="first">

        <div class="userinfo_box"> 
          <el-form label-width="80px">
              <el-form-item label="用户名" v-model="user">
                <el-input v-model="user.username" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="user.email"></el-input>
              </el-form-item>
          <el-form-item>
          <el-button type="primary" @click="onUpdate">保存</el-button>
          </el-form-item>
          </el-form>
        </div>

      </el-tab-pane>
      <el-tab-pane label="更换头像" name="second">

      </el-tab-pane>

      <el-tab-pane label="修改密码" name="third">

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data() {
    return {
      activeName:'first',
      user:{
        username:this.$route.query.username,
        email:''
      },
    }
  },
  methods: {
    handleClick(){
      if(this.activeName == 'first'){
        return;
      }
      if(this.activeName == 'second'){
        this.$router.push({
          path:'/index/updateavatar',
          query:{
            username:this.user.username,
          }
        });
      }
      if(this.activeName == 'third'){
        this.$router.push({
          path:'/index/updatepassword',
          query:{
            username:this.user.username
          }
        });
      }
    },

    onUpdate(){
      var _this = this;
      this.axios.post('/updateuserinfo',qs.stringify({
        username:this.$route.query.username,
        email:this.user.email
      })).then(function(response){
        if(response.data.code == 200){
          _this.$message.info("更新成功");
        }
      })
    }
  },

  created() {
    var _this = this;
    this.user.username = this.$route.query.username;
    this.axios.post('/userinfo',qs.stringify({
      username:this.$route.query.username,
    })).then(function(response){
      console.log(response);
      if(response.data.code == 200){
        _this.user.email = response.data.data;
      }
    })
  },
};

</script>

<style scoped>
.userinfo_box{
  width: 100%;
  height: auto;
  text-align: left;
}
.userinfo_box div{
  width: 200px;
}
</style>
