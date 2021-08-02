<template>
  <div style="height: 800px;">
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="个人信息" name="first">
        
      </el-tab-pane>
      <el-tab-pane label="更换头像" name="second">

      </el-tab-pane>

      <el-tab-pane label="修改密码" name="third">
        <div class="update_password_box">
          <el-form label-width="80px">
            <el-form-item label="旧密码">
              <el-input v-model="oldpassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="新密码">
              <el-input v-model="newpassword" show-password></el-input>
            </el-form-item>
            <el-form-item label="确认密码">
              <el-input v-model="confirmpassword" show-password></el-input>
            </el-form-item>
        <el-form-item>
        <el-button type="primary" @click="onUpdate">立即修改</el-button>
        </el-form-item>
        </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data() {
    return {
      activeName:'third',
      input:'',
      user:'',
      oldpassword:'',
      newpassword:'',
      confirmpassword:'',
    }
  },
  methods: {
    handleClick(){
      if(this.activeName == 'first'){
        this.$router.push({
          path:'/index/userinfo',
          query:{
            username:this.$route.query.username
          }
        });
      }
      if(this.activeName == 'second'){
        this.$router.push({
          path:'/index/updateavatar',
          query:{
            username:this.$route.query.username
          }
        });
      }
      if(this.activeName == 'third'){
        return;
      }
    },

    onUpdate(){
      var _this = this;
      if(this.newpassword != this.confirmpassword){
        this.$message.warning("你两次输入的密码不一样");
      }else{
        this.axios.post("/updatepassword",qs.stringify({
          username:this.$route.query.username,
          oldpassword:this.oldpassword,
          newpassword:this.newpassword,
        })).then(function(response){
          console.log(response);   
          if(response.data.code == 200){
            _this.$message.info('修改密码成功');
            _this.oldpassword = '';
            _this.newpassword = '';
            _this.confirmpassword = '';
          }
        })
      }
    }
  }
}

</script>

<style scoped>
.update_password_box{
  width: 100%;
  height: auto;
  text-align: left;
}
.update_password_box div{
  width: 200px;
}
.update_password_box div span{
  display: inline-block;
}
</style>
