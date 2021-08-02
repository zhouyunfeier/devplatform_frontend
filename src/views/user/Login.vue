<template>
    <div class="LoginPage">
        <div class="main text-center">
            <div class="logo">
            </div>
            <h3>Sign  In  To  DevPlatform</h3>
            <div class="text-muted">Enter your details to login to your account</div>
            <div class="LoginForm">
                <div class="Form_user">
                <el-input v-model="user.username" placeholder="请输入账号"></el-input>
                </div>
                <div class="Form_password">
                <el-input type="password" v-model="user.password" placeholder="请输入密码"></el-input>
                </div>
                <div class="Form_forget">
                    <div class="forget">
                    <el-link type="info" :underline="false">忘记密码</el-link>
                    </div>
                    <div class="register">
                    <el-link type="info"  v-on:click="toRegister" :underline="false">注册</el-link>
                    </div>
                </div>

                <div class="Form_login">
                     <el-button type="primary" v-on:click="handlesubmit">登录</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    const axios = require('axios');
    export default {
        name: "login",
        props:{

        },
        data(){
            return{
                user:{
                    username:'',
                    password:'',
                },
            }
        },
        methods:{
            handlesubmit(){
                if(this.user.username == ''){
                    console.log("用户名为空")
                        this.$message.info("用户名为空");
                    return
                }
                if(this.user.password == ''){
                    console.log("密码为空")
                    this.$message.info("密码为空");
                    return
                }

                var _this = this
                this.axios.post('/login',{//请求登录接口
                    username:this.user.username,
                    password:this.user.password
                }).then(function (response) {
                    console.log(response);
                    if(response.data.code == 200){
                        _this.$store.commit('login',response.data.data);
                        var path = _this.$route.query.redirect
                        _this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                    }else{
                        _this.$message.info("账号或密码错误")
                        _this.user.username = '';
                        _this.user.password = '';
                    }
                }).catch(function (error) {
                    console.log(error);
                });
            },
            toRegister(){
                this.$router.replace('/register')
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

.LoginForm div{
    margin-top: 15px;
}

.Form_forget div{
    display: inline;
}
.Form_forget .forget{
    padding-right: 130px;
}
.Form_forget .register{
    padding-left: 130px;
}
.Form_login{
    padding: 10px;
}

</style>
