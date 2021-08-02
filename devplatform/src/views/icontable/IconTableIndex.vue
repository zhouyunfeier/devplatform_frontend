<template>
<div style="height:800px">
    <el-button class="tab-create" size="small" type="primary" @click="toCreate()">新建需求</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
        <el-tab-pane label="项目详情" name="first">
            
        </el-tab-pane> 
        <el-tab-pane label="需求管理" name="second">

        </el-tab-pane> 

        <el-tab-pane label="里程碑管理" name="third">
            
        </el-tab-pane> 

        <el-tab-pane label="图标表查看" name="fourth">
            图标表详情页
        </el-tab-pane> 
    </el-tabs>
</div>
</template>

<script>
export default {
    data() {
        return {
            activeName:'fourth',
        }
    },
    methods: {
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
                return;
            }  
        },
    },
    
}
</script>

<style scoped>

</style>