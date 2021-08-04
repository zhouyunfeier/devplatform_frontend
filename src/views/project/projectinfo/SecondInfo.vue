<template>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            <div class="info_box">
                <div class="info_center">
                    <InfoCenterHeader></InfoCenterHeader>
                    <div class="Center_box">
                        <div class="Center_box_header">
                            <div class="Header_tip">
                                3hour
                                3080 commits
                            </div>
                        </div>
                        <el-empty description="空空如也" v-show="dirs.length==0 && files.length==0">
                            <el-button type="success">上传文件</el-button>
                        </el-empty>
                        <div class="File_Item" v-for="(dir, index) in dirs" :key="index">
                            <i class="el-icon-folder"></i>
                            <div class="Name_box"><a class="File_Name"  @click="reload(dir.path)">{{dir.filename}}</a></div>
                            <div class="Message_box"><a class="File_Message"  @click="reload(dir.path)">消息文件</a></div>
                            <div class="Date_box">{{dir.updateDate}}</div>
                        </div>

                        <div class="File_Item" v-for="file in files" :key="file.filename">
                            <i class="el-icon-document"></i>
                            <div class="Name_box"><a class="File_Name"  @click="reload(file.path)">{{file.filename}}</a></div>
                            <div class="Message_box"><a class="File_Message" @click="reload(file.path)">消息文件</a></div>
                            <div class="Date_box">{{file.updateDate}}</div>
                        </div>
                    </div>
                    <div class="Readme_box" v-show="readme">
                        <div class="Readme_box_header">
                            <div class="Readme_title">
                                README.md
                            </div> 
                        </div>
                        <div class="Readme_content" v-html="readme"></div>
                    </div>
                </div>
            </div>
        </el-tab-pane> 


        <el-tab-pane label="需求管理" name="second" @click="toRequirement()">
        </el-tab-pane> 

        <el-tab-pane label="里程碑管理" name="third">     
        </el-tab-pane>
        <el-tab-pane label="图标表查看" name="fourth">               
        </el-tab-pane> 

    </el-tabs>
</div>
</template>
<script>
import InfoCenterHeader from '@/components/projectinfo/InfoCenterHeader'
import qs from 'qs'
    export default {
        data() {
            return {
                activeName:'first',
                dirs:"",
                files:"",
                readme:""
            }
        },

        components:{InfoCenterHeader},

        methods: {
            handleClick(){
                if(this.activeName == 'first'){
                    return;
                }
                else if(this.activeName == 'second'){
                    this.$router.push({
                        path:'/index/requirement',
                        query:{
                            projectid:this.$route.query.projectid,
                        }
                    })
                }
                else if(this.activeName == 'third'){
                    this.$router.push({
                        path:'/index/milestone',
                        query:{
                            projectid:this.$route.query.projectid,
                        }
                    }) 
                }
                else if(this.activeName == 'fourth'){
                    this.$router.push({
                        path:'/index/icontable',
                        query:{
                            projectid:this.$route.query.projectid,
                        }
                })
                }  
            },

            reload(path){
                var _this = this;
                this.axios.post('/index/projectsecondinfo',qs.stringify({
                    path:path
                })).then(function(response){
                    console.log(response.data);
                    if(response.data.code == 200){
                        _this.dirs = response.data.data.dir_list;
                        _this.files = response.data.data.file_list;
                        _this.readme = response.data.data.readme;
                        console.log(_this.readme);
                        _this.$router.push({
                            query:{
                                path:path
                            }
                        })
                    }
                })
            }
        },

        created() {
            var _this = this;
            this.axios.post('/index/projectsecondinfo',qs.stringify({
                path:this.$route.query.path
            })).then(function(response){
                console.log(response.data);
                if(response.data.code == 200){
                    _this.dirs = response.data.data.dir_list;
                    _this.files = response.data.data.file_list;
                    _this.readme = response.data.data.readme;
                    console.log(_this.readme);
                    console.log(_this.dirs.length);
                    console.log(_this.files.length)
                }
            })
        },
    }
</script>

<style scoped>
.info_center{
    height: 1000px;
    width: 100%;
    display: inline-block;
    min-width: 700px;
    float: left;
}
.info_box{
    width: auto;
    min-width: 800px;
    text-align: left;
}
.Center_box{
    width: 100%;
    height: auto;
    border: solid 2px #F0F2F5;
    border-radius: 8px;
    padding-left: 0px;
    padding-bottom: 20px;
}
.Center_box_header{
    height: 40px;
    width: 100%;
    border-bottom: solid 2px #F0F2F5;
    line-height: 40px;
    margin-left: 0px;
}
.Header_tip{
    float: right;
    padding-right: 20px;
}
.File_Item{
    width: 100%;
    height: 40px;
    border-bottom: solid 2px #F0F2F5;
    line-height: 40px;
    padding-left: 18px;
}
.File_Item i{
    float: left;
    line-height: 40px;
}
.File_Item:hover{
    background: #F0F2F5;
}
.Name_box{
    float: left;
    display: inline-block;
    width: 30%;
    min-width: 200px;
    height: 38px;
    line-height: 40px;
}
.File_Name{
    margin-left: 5px;
    color: black;
    font-size: 13px;
    width: auto;
    font-weight: 550;
}
.File_Name:hover{
    text-decoration: underline;
    color: #409EFF;  
}
.Message_box{
    float: left;
    width: 50%;
    font-size: 12px;
    display: inline-block;
    line-height: 40px;
    height: 38px;
    color: black;
   
}
.File_Message{
    color: black;
}
.File_Message:hover{
    text-decoration: underline;
    color: #409EFF;
}
.Date_box{
    float: left;
    height: 38px;
    width: 17%;
    font-size: 12px;
    text-align: right;
}

.Readme_box{
    width: 100%;
    height: auto;
    border: solid 2px #F0F2F5;
    border-radius: 8px;
    padding-left: 0px;
    padding-bottom: 20px;
    margin-top: 20px;
}
.Readme_box_header{
    height: 40px;
    width: 100%;
    border-bottom: solid 2px #F0F2F5;
    line-height: 40px;
    margin-left: 0px;
}
.Readme_title{
    font-weight: 600;
    font-size: 14px;
    margin-left: 20px;
}
.Readme_content{
    display: block;
    width: 100%;
    height: auto;
    min-height: 200px;
    padding: 20px;
}
</style>