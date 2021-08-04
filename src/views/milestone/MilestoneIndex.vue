<template>
<div>
    <el-button class="tab-create" size="small" type="primary" @click="toMilestoneCreate()">新建里程碑</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
        
        </el-tab-pane> 


        <el-tab-pane label="需求管理" name="second">
        
        </el-tab-pane> 

        <el-tab-pane label="里程碑管理" name="third">
            <div class="milestone-box">
                <el-row :gutter="20">

                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <div class="grid-header bule-dark">所有<span>({{milestoneAllCount}})</span></div>
                        <MilestoneItem v-for="(milestone, index) in milestonesAll" :milestone=milestone :key="index"></MilestoneItem>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <div class = "grid-header green-light">执行中<span>({{milestoneDoingCount}})</span></div>
                        <MilestoneItem v-for="(milestone, index) in milestonesDoing" :milestone=milestone :key="index"></MilestoneItem>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <div class = "grid-header red-light">逾期<span>({{milestoneLateCount}})</span></div>
                        <MilestoneItem v-for="(milestone, index) in milestonesLate" :milestone=milestone :key="index"></MilestoneItem>
                    </div>
                </el-col>

                <el-col :span="6">
                    <div class="grid-content bg-purple-light">
                        <div class = "grid-header green-dark">已完成<span>({{milestoneDoneCount}})</span></div>
                        <MilestoneItem v-for="(milestone, index) in milestonesDone" :milestone=milestone :key="index"></MilestoneItem>
                    </div>
                </el-col>   

                </el-row>   
            </div>
        
        </el-tab-pane>

        <el-tab-pane label="图标表查看" name="fourth">
            
        </el-tab-pane> 

    </el-tabs>

    <el-dialog title="新建里程碑" :visible.sync="dialogFormVisible" class="dialog">
        <MilestoneCreate @fatherMethod="ChangedialogFormVisible"></MilestoneCreate>
    </el-dialog>
</div>
</template>

<script>
import MilestoneItem from '@/components/milestone/MilestoneItem.vue'
import MilestoneCreate from '@/views/milestone/MilestoneCreate.vue'
import qs from 'qs'
export default {

    data() {
        return {
            activeName: 'third',
        
            milestonesAll:[],
            milestonesDoing:[],
            milestonesLate:[],
            milestonesDone:[],

            milestoneAllCount:0,
            milestoneDoingCount:0,
            milestoneLateCount:0,
            milestoneDoneCount:0,

            dialogFormVisible:false
        }
    },
    components: {
        MilestoneItem,
        MilestoneCreate
    },

    methods: {
        handleClick(){
            if(this.activeName == 'first'){
                this.$router.push({
                    path:'/index/projectinfo',
                    query:{
                        founder:this.$route.query.founder,
                        project:this.$route.query.project,
                    }
                })
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
                return;
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
  
        ChangedialogFormVisible(){
            this.dialogFormVisible = false;
        },

        toMilestoneCreate(){
            this.dialogFormVisible = true;
        }
    },  

    created() {
        var _this = this;
      this.axios.post("/index/milestone",qs.stringify({
            founder:this.$route.query.founder,
            project:this.$route.query.project,
      })).then(function(response) {
          if(response.data.code == 200){
              if(response.data.msg == "操作成功"){
                  _this.milestonesAll = response.data.data;
                  _this.milestoneAllCount = _this.milestonesAll.length;
                  for(var i = 0 ; i < _this.milestoneAllCount ;i++){
                      if(_this.milestonesAll[i].status == "执行中"){
                          _this.milestonesDoing.push(_this.milestonesAll[i])
                      }
                      else if(_this.milestonesAll[i].status == "逾期"){
                          _this.milestonesLate.push(_this.milestonesAll[i])
                      }
                      else if(_this.milestonesAll[i].status == "已完成"){
                          _this.milestonesDone.push(_this.milestonesAll[i])
                      }
                  }
                    _this.milestoneDoingCount = _this.milestonesDoing.length;
                    _this.milestoneLateCount = _this.milestonesLate.length;
                    _this.milestoneDoneCount = _this.milestonesDone.length;
              }
          }
      })
    },



    
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
.milestone{
    width: 100%;
    height: 1000px;
}
.milestone div{

}

.el-row {
    margin-bottom: 20px;
    &:last-child {
        margin-bottom: 0;
    }
}
.el-col {
border-radius: 4px;
}

.bg-purple-light {
/* background: #F0F2F5; */
}
.grid-content {
    margin-top: 4px;
    min-height: 36px;
    height: 550px;
    overflow-y:auto;
    margin-left: 1px;
    margin-right: 1px;
    width: 280px;

}
.row-bg {
padding: 10px 0;
background-color: #f9fafc;
}

.grid-header{
    text-align: left;
    width: 100%;
    height: 40px;
    line-height: 40px;
    background: #F0F2F5;
    
    font-weight: 600;
    padding-left: 10px;
}
.bule-dark{
    color: rgb(79, 79, 236);
}
.red-light{
    color: rgb(204, 44, 44);
}
.green-light{
    color: rgb(51, 224, 167);
}
.green-dark{
    color: rgb(81, 151, 81);
}

.dialog{
    min-width: 500px;
}

</style>