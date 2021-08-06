<template>
    <div class="Info_header">
        <el-button class="header_button">master</el-button>
        <el-button class="header_button">分支</el-button>
        <el-button class="header_button">标签</el-button>
        <el-popover
        placement="bottom"
        width="300"
        trigger="click">
        <div class="pover_title">Showing HTTP(S) URL</div>
        <div class="pover_content">
            <el-input v-model="input" placeholder="请输入内容" class="pover_input" disabled></el-input>
            <a>复制</a>
        </div>
        <div class="pover_buttom"><a  @click="download()"><i class="el-icon-download"></i>下载ZIP</a></div>
        <div type="success" class="info_upload" size="medium" slot="reference">克隆/下载</div>
        </el-popover>
        <el-button size="medium" class="header_button info_webIDe">Web IDE</el-button>
        <el-button size="medium" class="header_button info_file" >文件页</el-button>
        
    </div>
</template>

<script>
import qs from 'qs'
    export default {
        data() {
            return {
                input:window.location.href,
            }
        },
        
        methods: {
            download(){
                var _this = this;
                this.axios.post("/index/downloadproject",qs.stringify({
                    projectfounder:this.$route.query.founder,
                    projectname:this.$route.query.project,
                    branch:"main"
                })).then(function(response){
                    console.log(response);
                })
            }
        },
    }
</script>

<style scoped>
.Info_header{
    width: 100%;
    height: 60px;
    font-size: 10px;
    line-height: 60px;
}
.info_upload{
    float:right;
    margin-top: 16px;
    background-color: #fe7300;
    border: #fe7300;
    display: inline-block;
    height: 34px;
    line-height: 10px;
    font-size: 13px;
    color: #fff;
    border-radius: 3px;
    padding: 10px;
    border: solid 2px #fe7300;
}
.header_button{
    padding: 10px 10px;
    margin-top: 15px;
}
.header_button:hover{
    opacity: 0.5;
    background: #fff;
}
.info_upload:hover{
    background-color: #fe7300;
    opacity: 0.7;
}
.info_upload:visited{
    background-color: #fe7300;
}

.info_webIDe{
    float: right;
    margin-right: 10px;
}
.info_file{
    float: right;
    margin-right: 10px;
}
.pover_title{
    font-size: 20px;
    font-weight: 600;
}
.pover_content{
    margin-top: 10px;
}
.pover_input{
    width: 80%;
    padding: 5px;
}
.pover_buttom{
    text-align: center;
    margin-top: 10px;
}
</style>