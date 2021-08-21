<template>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            <div class="info_center">
                <div class="info_title"><i class="el-icon-folder"></i> zyf / <a @click="toProjectInfo">{{projectname}}</a></div>
                <div class="info_function">
                    全部分支
                    <el-popover
                    placement="bottom"
                    width="240"
                    v-model="visible">
                    <div class="popover_info">
                        <div class="popver_title">起点</div>
                        <el-select v-model="newbranchstart" slot="prepend" placeholder="请选择" style="margin-top:5px;">
                        <el-option :label="mainbranch.branchname"  :key="mainbranch.branchname" :value="mainbranch.branchname"></el-option>
                        <el-option :label="item.branchname" v-for="item in branches" :key="item.branchename" :value="item.branchname"></el-option>
                        </el-select>

                        <div class="popver_title" style="margin-top:5px;">新建分支</div>
                        <el-input v-model="newbranchname" placeholder="" style="margin-top:5px;"></el-input>
                        <div class="popver_title" style="margin-top:5px;">更新信息</div>
                        <el-input v-model="newbranchmessage" placeholder="" style="margin-top:5px;"></el-input>
                        <el-button type="primary" @click="createBranch" style="margin-top:5px;">新建</el-button>
                    </div>
                        <el-button type="primary" class="info_create" size="small" slot="reference">新建分支</el-button>
                    </el-popover>
                </div>

                <div class="info_item_header">
                    <span>分支名</span>
                    <span>更新信息</span>
                    <span>操作</span>
                </div>
                <div class="info_branch">
                    <span style="padding-left:8px;"><i class="el-icon-star-on"></i>{{mainbranch.branchname}}</span>
                    <span>{{mainbranch.message}}</span>
                    <span>
                        <el-tooltip effect="dark" content="跳转" placement="top">
                            <i class="el-icon-s-platform"></i>
                        </el-tooltip>
                        <!-- <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <i class="el-icon-delete-solid" style="margin-left:10px"></i>
                        </el-tooltip>     -->
                    </span>
                </div>
                <div class="info_branch" v-for="(branch, index) in branches" :key="index">
                    <span>{{branch.branchname}}</span>
                    <span>{{branch.message}}</span>
                    <span>
                        <el-tooltip effect="dark" content="跳转" placement="top">
                            <i class="el-icon-s-platform"></i>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <i class="el-icon-delete-solid" style="margin-left:10px" v-show="branch.main == 0"></i>
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
import { returnStatement } from '@babel/types';
    export default {
        data() {
            return {
                activeName:'first',
                projectname:this.$route.query.project,
                branches:[],
                mainbranch:"",
                visible:false,
                newbranchstart:'',
                newbranchname:'',
                newbranchmessage:'',

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
            },

            createBranch(){
                if(this.newbranchstart == '' || this.newbranchstart == null){
                    this.$message.info("请选择分支起点");
                    return;
                }
                if(this.newbranchname == '' || this.newbranchname == null || this.newbranchstart == this.mainbranch.branchname){
                    this.$message.info("请重新输入新分支名");
                    this.newbranchname = "";
                    return;
                }
                for(let i = 0 ; i < this.branches.length ; i++){
                    if(this.branches[i].branchname == this.newbranchname){
                        this.$message.info("该分支已经存在");
                        this.newbranchname = "";
                        return;
                    }
                }
                this.axios.post("/branch/createbranch",qs.stringify({
                    projectfounder:this.$route.query.founder,
                    projectname:this.$route.query.project,
                    branchname:this.newbranchname,
                    branchstart:this.newbranchstart,
                    branchmessage:this.newbranchmessage,
                })).then(function(response){
                    console.log(response);
                })
            }
        },

        created() {
            var _this = this;
            this.axios.post('/branch/getbranches',qs.stringify({
                projectfounder:this.$route.query.founder,
                projectname:this.$route.query.project,
            })).then(function(response){
                if(response.data.code == 200){
                    var branchList = response.data.data;
                    for(var i = 0 ; i < branchList.length ; i++){
                        if(branchList[i].main == 1){
                            _this.mainbranch = branchList[i];
                        }else{
                            _this.branches.push(branchList[i]);
                        }

                    }
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
    margin-right: 5%;
    margin-top: -10px;
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
.info_branch:hover{
    background: rgb(235, 235, 235);
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
.popver_title{
    width: 100%;
    font-weight: 600;
    font-size: 14px;
}
</style>