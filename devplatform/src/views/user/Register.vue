<template>
  <div class="LoginPage">
    <div class="main text-center">
      <div class="logo"></div>
      <h3>Sign  In</h3>
      <div class="text-muted">Enter your details to login to your account</div>
      <div class="LoginForm">
        <div class="Form_content">
        <el-form :model="user" :ref="user" status-icon :rules="rules"   label-width="120px" class="demo-ruleForm">

        <el-form-item label="用户名" prop="username">
          <el-input type="text" placeholder="请输入用户名" v-model="user.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input type="password" placeholder="请输入密码" v-model="user.password" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" placeholder="请确认密码" v-model="user.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="user.email" placeholder="请输入邮箱"></el-input>
        </el-form-item>

        <div class="register_button">
        <el-form-item>
          <el-button type="primary" @click="submitForm('user')">提交</el-button>
          <el-button @click="resetForm('user')">重置</el-button>
        </el-form-item>
        </div>
        </el-form>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
  export default {
    data() {
      var validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }
        callback();
      }

      var checkEmail = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('邮箱不能为空'));
        }
        else{
          var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
          if(reg.test(this.user.email)){
            callback();
          }else{
            return callback(new Error('邮箱格式错误'));
          }
        }
      };
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.user.checkPass !== '') {
            this.$refs.user.validatePass2('checkPass');
          }
          callback();
        }
      };
      var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.user.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
        user: {
          username:'',
          password: '',
          checkPass: '',
          email: ''
        },
        rules: {
          username:[
            {validator: validateName , trigger:'blur'}
          ],
          password: [
            { validator: validatePass, trigger: 'blur' }
          ],
          checkPass: [
            { validator: validatePass2, trigger: 'blur' }
          ],
          email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(user) {
                if(this.user.username == ''){
                    console.log("用户名为空")
                    this.$message.warn("用户名为空");
                    return
                }
                if(this.user.password == ''){
                    console.log("密码为空")
                    this.$message.warn("密码为空");
                    return
                }
                if(this.user.checkPass == ''){
                  this.$message.warn("请再次输入密码");
                    return
                }
                if(this.user.password != this.user.checkPass){
                  this.$message.warn("两次输入密码不一致");
                    return
                }
                if(this.user.email == ''){
                  this.$message.warn("邮箱为空");
                  return
                }
                var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
                if(!reg.test(this.user.email)){
                  this.$message.warn("邮箱格式错误");
                  return
                }

                var _this = this
                this.axios.post('/register',{//请求登录接口
                    username:this.user.username,
                    password:this.user.password,
                    email:this.user.email
                }).then(function (response) {
                    if(response.data.code == 200){
                        console.log(response);
                        _this.$router.replace('/');
                        _this.$message.info("注册成功");
                    }else{
                      if(response.data.msg == "用户名已被使用"){
                        _this.$message.warn("用户名已被使用");
                        _this.user.username='';
                      }
                      if(response.data.msg == "邮箱已被使用"){
                        _this.$message.warn("邮箱已被使用")
                        _this.user.email='';
                      }
                    }
                }).catch(function (error) {
                    console.log(error);
                });        
      },
      resetForm(user) {
        this.user.username = '';
        this.user.password = '';
        this.user.checkPass = '';
        this.user.email = '';
      }
    }
  }
</script>

<style scoped>
.LoginPage{
    width: 100%;
    height: 685px;
    background-image: url("~@/assets/mesh.jpg");
    background-size: 100%;
}

.text-center{
    text-align: center !important;
}
.LoginPage .main{
    padding: 1.75rem;
    width: 450px;
    height: 100%;
    margin: auto;
}

.logo{
    width: 100%;
    height: 100px;
    display: inline-block;
}

.main h3{
    font-size: 26px;
    font-weight: 550;
    font-family:Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
    line-height: 1.2;
    color: var(--gray-dark);
}

.text-muted{
    color: rgb(156, 156, 156);
    font-weight: 600;
    font-size: 13px;
    font-family: Cambria, Cochin, Georgia, Times, 'Times New Roman', serif;
}
.LoginForm{
    margin-top: 50px;
}

.Form_content{
  margin-left: -20px;
  padding-right: 20px;
  width: 100%;
}

.register_button{
  margin-left: -60px;
  margin-top: 20px;
}
</style>