<template>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            <div class="info_center">
                <div class="info_title"><i class="el-icon-folder"></i> zyf / <a @click="toProjectInfo">{{projectname}}</a></div>
                <div class="info_function">
                    全部分支   
                    <el-button type="primary" class="info_create" size="small">新建分支</el-button>
                </div>

                <div class="info_item_header">
                    <span>分支名</span>
                    <span>更新信息</span>
                    <span>操作</span>
                </div>
                <div class="info_branch">
                    <span>分支名</span>
                    <span>更新信息</span>
                    <span>
                        <el-tooltip effect="dark" content="跳转" placement="top">
                            <i class="el-icon-s-platform"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                             <i class="el-icon-delete-solid" style="margin-left:10px"></i>
                        </el-tooltip>    
                    </span>
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
import qs from 'qs'
    export default {
        data() {
            return {
                activeName:'first',
                projectname:this.$route.query.project,
                branches:[],
            }
        },

        components:{},

        methods: {
            handleClick(){
                if(this.activeName == 'first'){
                    this.toProjectInfo();
                }
                else if(this.activeName == 'second'){
                    this.$router.push({
                        path:'/index/requirement',
                        query:{
                            founder:this.$route.query.founder,
                            project:this.$route.query.project,
                        }
                    })
                }
                else if(this.activeName == 'third'){
                    this.$router.push({
                        path:'/index/milestone',
                        query:{
                            founder:this.$route.query.founder,
                            project:this.$route.query.project,
                        }
                    }) 
                }
                else if(this.activeName == 'fourth'){
                    this.$router.push({
                        path:'/index/icontable',
                        query:{
                            founder:this.$route.query.founder,
                            project:this.$route.query.project,
                        }
                })
                }  
            },      
            
            toProjectInfo(){
                this.$router.push({
                        path:'/index/projectinfo',
                        query:{
                            founder:this.$route.query.founder,
                            project:this.$route.query.project,
                        }
                })
            }
        },

        created() {
            var _this = this;
            this.axios.post('/branch/getbranches',qs.stringify({
                projectfounder:this.$route.query.founder,
                projectname:this.$route.query.project,
            })).then(function(response){
                console.log(response);
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
.info_title{
    font-size: 18px;
    font-weight: 600;
    text-align: left;
    padding-top: 10px;
    /* background: rgb(222, 238, 238); */
}
.info_title a{
    color: black;
}
.info_title a:hover{
    opacity: 0.8;
}
.info_function{
    /* background: rgb(222, 238, 238); */
    text-align: left;
    padding: auto 0px;
    font-size: 16px;
    font-weight: 600;
    color: #1890FF;
    padding-top: 20px;
    border-bottom: solid 1px rgb(228, 242, 255);
}
.info_create{
    float: right;
    margin-right: 10px;
    margin-top: -7px;
}
.info_item_header{
    width: 100%;
    font-size: 14px;
    height: 40px;
    line-height: 40px;
    margin-top: 20px;
}
.info_item_header span{
    float: left;
    text-align: left;
    font-weight: 600;
    position: relative;
}
.info_item_header span:nth-child(1){
    width: 20%;
    padding-left: 20px;
}
.info_item_header span:nth-child(2){
    width: 70%;
}
.info_item_header span:nth-child(3){
    width: 10%;
}

.info_branch{
    width: 100%;
    height: 50px;
    text-align: left;
    line-height: 50px;
}
.info_branch span{
    float: left;
}
.info_branch i{
    color: #1890FF;
    transition: all 0.3s linear;
}
.info_branch i:hover{
    color: rgb(58, 84, 199);
}
.info_branch span:nth-child(1){
    width: 20%;
    padding-left: 20px;
}
.info_branch span:nth-child(2){
    width: 70%;
}
.info_branch span:nth-child(3){
    width: 10%;
}
</style>