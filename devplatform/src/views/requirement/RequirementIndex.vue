<template>
<div style="height:800px">
    <el-button class="tab-create" size="small" type="primary" @click="toCreate()">新建需求</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            
        </el-tab-pane> 
        <el-tab-pane label="需求管理" name="second">
            <ItemHeader></ItemHeader>
            <RequirementItem v-for="(requirement, index) in requirements" :requirement=requirement :key="index"
            @fatherMethod="showDrawer"
            @ChangeRequirements="ChangeRequirements"
            ></RequirementItem>
            
            <div class="Item-Pagination">
                <a-pagination :default-current="1" :current="currentPage" :total="totalCount" @change="PaginationChange" />
            </div>
        </el-tab-pane> 

        <el-tab-pane label="里程碑管理" name="third">
            
        </el-tab-pane> 

        <el-tab-pane label="图标表查看" name="fourth">
            
        </el-tab-pane> 
    </el-tabs>

    <el-dialog title="新建需求" :visible.sync="dialogFormVisible" class="dialog">
        <RequirementCreate @fatherMethod="ChangedialogFormVisible" ></RequirementCreate>
    </el-dialog>


    <!-- <el-drawer title="需求详情页" :visible.sync="drawer" :with-header="false" size='50%' class="drawerbox">
        <requirement-info :selectedrequirement="selectedrequirement" :currentPage="currentPage" @ChangeRequirements='ChangeRequirements' @CloseDrawer="CloseDrawer()"></requirement-info>
    </el-drawer> -->

    <div v-show="drawer" class="drawer">
        <requirement-info :selectedrequirement="selectedrequirement" :currentPage="currentPage" @ChangeRequirements='ChangeRequirements' @updateRequirement='updateRequirement' @CloseDrawer="CloseDrawer()"></requirement-info>
    </div>

</div>
</template>

<script>
import ItemHeader from '@/components/requirement/ItemHeader.vue'
import RequirementItem from '@/components/requirement/RequirementItem.vue'
import RequirementCreate from '@/views/requirement/RequirementCreate.vue'
import RequirementInfo from '@/views/requirement/RequirementInfo.vue'

import qs from 'qs'
export default {
    data() {
        return {
            activeName:'second',
            currentPage:1,
            totalCount:1,
            requirements:[], 
            dialogFormVisible:false,
            drawer:false,
            selectedrequirement:{},
        }
    },

    methods: {
        toCreate(){
            this.dialogFormVisible = true;
        },

        CloseDrawer(){
            this.drawer = false;
        },

        //进入需求详情页
        showDrawer(requirementid){
            var _this = this;
            this.axios.post("/index/getinfo",qs.stringify({
                'requirementid':requirementid
            })).then(function(response){
                if(response.data.code == 200){
                    _this.selectedrequirement = response.data.data;
                }
            })
            this.drawer = true;
        },
        
        //页头功能栏切换
        handleClick(){
            if(this.activeName == 'first'){
                this.$router.push({
                    path:'/index/projectinfo',
                    query:{
                        projectid:this.$route.query.projectid,
                    }
                })
            }
            else if(this.activeName == 'second'){
                return;
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
        ChangeRequirements(requirements){
            this.requirements = requirements;
        },
        ChangedialogFormVisible(){
            this.dialogFormVisible = false;
        },

        //分页功能
        PaginationChange(page){
            var _this = this;
            this.axios.post('/index/requirement',qs.stringify({
                projectid:this.$route.query.projectid,
                currentPage:page
            })
            ).then(function (response) {
                if(response.data.code == 200){
                    if(response.data.msg == "操作成功"){
                        _this.requirements = response.data.data.list;
                        _this.totalCount = response.data.data.totalCount;
                        _this.currentPage = response.data.data.currentPage;
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        },
        updateRequirement(selectedrequirement){
            this.requirements.forEach(requirement =>{
                if(requirement.requirementid == selectedrequirement.requirementid){
                    requirement.updateDate = selectedrequirement.updateDate;
                }
            })
        }
    },

    created() {
        var _this = this;
        this.axios.post("/index/requirement",qs.stringify({
            projectid:this.$route.query.projectid,
            currentPage:1
        })).then(function(response){
            if(response.data.code == 200){
                if(response.data.msg == "操作成功"){
                    _this.requirements = response.data.data.list;
                    _this.totalCount = response.data.data.totalCount;
                    _this.currentPage = response.data.data.currentPage;
                }
            }
        })
    },


    
    components:{ItemHeader,RequirementItem,RequirementCreate,RequirementInfo}
    
}
</script>

<style scoped>
.tab-create{
  position: absolute;
  right: 80px;
  top: 115px;
  margin-top: 0px;
  z-index: 999;
}

.Item-Pagination{
  margin: 25px;
}

.drawer{
    width: 50%;
    position: fixed;
    height: 720px;
    background-color: #fff;
    top: 0px;
    right: 0px;
    z-index: 999;
    border-left: solid 2px rgb(233, 233, 233);
    overflow-y: scroll;
    box-shadow: 0 -5px 10px rgb(233, 233, 233);
}

</style>