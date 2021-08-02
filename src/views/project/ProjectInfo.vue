<template>
<div>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            <div class="info_box">
                <div class="info_center">
                    <InfoCenter></InfoCenter></InfoCenter>
                </div>
                <div class="info_right">
                    <div class="info_right_title">项目名</div>
                    <div class="title_info">{{project.name}}</div>
                    <div class="info_right_description">项目描述</div>
                    <div class="description_info">{{project.description}}</div>
                    <div class="info_right_team">团队成员</div>
                    <div class="team_info">
                        <TeamMemberItem v-for="(member, index) in members" :key="index" :member="member"></TeamMemberItem>
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
import InfoCenter from '@/views/project/projectinfo/InfoCenter.vue'
import TeamMemberItem from '@/components/project/TeamMemberItem.vue'
import qs from 'qs'
    export default {
        data() {
            return {
                activeName:'first',
                project:{
                    name:"这是我第一个项目,测试一下如果标题太长了会自己换行的吗啊",
                    description:"描述用力一个项目,测试一下如果标题太长了会自己换行的一个项目,测试一下如果标题太长了会自己换行的1",
                    remarks:"备注信息"
                },
                members:[]
            }
        },

        components:{InfoCenter,TeamMemberItem},

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
        },

        created() {
            var _this = this;
            this.axios.post('/index/projectinfo',qs.stringify({
                projectid:this.$route.query.projectid,
            })).then(function(response){
                if(response.data.code == 200){
                    _this.members = response.data.data;
                }
            })
        },
    }
</script>

<style scoped>
.info_center{
    height: 500px;
    width: 70%;
    display: inline-block;
    min-width: 500px;
    float: left;
}

.info_right{
    display: inline-block;
    height: 500px;
    width: 30%;
    min-width: 200px;
    text-align: left;
    padding: 15px;
}
.info_box{
    width: auto;
    min-width: 800px;
    text-align: left;
}

.info_right_title{
    font-size: 16px;
    font-weight: 600;
}
.title_info{
    margin-top: 10px;
}
.info_right_description{
    margin-top: 60px;
    font-size: 16px;
    font-weight: 600;
}
.info_right_team{
    margin-top: 60px;
    font-size: 16px;
    font-weight: 600;
}
.team_info{
    margin-top: 20px;
    font-size: 16px;
    font-weight: 600;
}
</style>