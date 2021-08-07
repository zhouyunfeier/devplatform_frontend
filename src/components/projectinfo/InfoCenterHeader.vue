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
        <div type="success" class="info_upload" size="medium" slot="reference">克隆/下载<i class="el-icon-caret-bottom"></i></div>
        </el-popover>
        <el-button size="medium" class="header_button info_webIDe">Web IDE</el-button>

        <a-dropdown>
            <a-menu slot="overlay" @click="handleMenuClick" class="dropdown_menu">
                <a-menu-item key="1"><a @click="createfile()">创建文件</a></a-menu-item>
                <a-menu-item key="2"><a @click="uploadfile()">上传文件</a></a-menu-item>
            </a-menu>
            <el-button size="medium" class="header_button info_file">文件<i class="el-icon-caret-bottom"></i></el-button>
        </a-dropdown>


        <el-dialog title="上传文件" :visible.sync="dialogFormVisible">
            <uploader :options="options" class="uploader-example"
            :file-status-text="statusText"
            :autoStart="false"
            ref="uploader"
            @file-added="onFileAdded"
            @file-success="onFileSuccess"
            @file-error="onFileError"
            @file-removed="fileRemoved">
                <uploader-unsupport></uploader-unsupport>
                <uploader-drop>
                    <p>拖拽文件进行上传</p>
                    <uploader-btn>select files</uploader-btn>
                    <uploader-btn :directory="true">select folder</uploader-btn>
                </uploader-drop>
                <uploader-list style="text-align:left"></uploader-list>
            </uploader>  
            <div>
                <el-input v-model="dir" placeholder="">dir</el-input>
                <el-button type="primary" @click="submitUpload">开始上传</el-button>
            </div>   
        </el-dialog>
    </div>
</template>

<script>
import qs from 'qs'
export default {
    data() {
        return {
            input:window.location.href,
            projectfounder:this.$route.query.founder,
            projectname:this.$route.query.project,
            branch:'main',
            dialogFormVisible:false,
            options:{
                target:'//localhost:8080/file/single',
                testChunks:false,
                categartyMap:{
                    image:["gift","jpg","jpeg","png","bmp"],
                    document: ['doc', 'txt', 'docx', 'pages', 'epub', 'pdf', 'numbers', 'csv', 'xls', 'xlsx', 'keynote', 'ppt', 'pptx']
                },
                //传递的参数，文件路径！
                query:{
                    path:this.$route.query.founder+'/'+this.$route.query.project + '/blob/'+this.$route.query.project+'-main',
                }
            },
            statusText:{
                success:'上传成功',
                error:'上传失败',
                uploading:'上传中',
                paused:'暂停中',
                waiting:'等待中'
            },
            dir:'',
            errorfilelist:[],    //上传失败信息列表
        }
    },
    
    methods: {
        download(){
            var _this = this;
            this.axios.post("/file/downloadproject",qs.stringify({
                projectfounder:this.projectfounder,
                projectname:this.projectname,
                branch:"main"
            }),
            {
                responseType:'blob'
            }
            ).then(function(response){
                //以下为另一种处理文件流的方法（注意返回的res.data）
                const url = window.URL.createObjectURL(new Blob([response.data]))
                const link = document.createElement('a')
                link.style.display = 'none'
                link.href = url
                const fileName = _this.projectname + '-' + _this.branch + '.zip'
                link.setAttribute('download', fileName)
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
            })
        },

        uploadfile(){
            this.dialogFormVisible = true;
        },
        handleMenuClick(e) {
            console.log('click left button', e);
        },

        onFileAdded(file){

        },

        //点击文件开始上传
        submitUpload(){
            this.$nextTick(() => {
                for(var i = 0 ; i < this.$refs['uploader'].files.length;i++){
                    console.log(this.$refs['uploader'].files[i]);
                    this.$refs['uploader'].files[i].resume()
                }
            });
        },
        onFileSuccess(){

        },

        onFileError(){

        },
        fileRemoved(file){
            
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
    margin-top: 15px;
    background-color: #1890ff;
    border: #1890ff;
    display: inline-block;
    height: 35px;
    line-height: 10px;
    font-size: 13px;
    color: #fff;
    border-radius: 3px;
    padding: 9px 10px;
    border: solid 2px #1890ff;
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
    background-color: #1890ff;
    opacity: 0.7;
}
.info_upload:visited{
    background-color: #1890ff;
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
.dropdown_menu{
    position: absolute;
}

.uploader-example {
    width: 90%;
    margin: 0 auto;
    padding: 15px;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
    text-align: center;
}
.uploader-example .uploader-btn {
    margin-right: 4px;
}
.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
</style>