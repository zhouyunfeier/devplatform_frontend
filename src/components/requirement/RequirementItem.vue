<template>
    <div class="RequirementItem" @click="toRequirementInfo()">
        <div><a>{{requirement.title}}</a></div>
        <div>{{requirement.founder}}</div>
        <div>{{requirement.createDate}}</div>
        <div>{{requirement.updateDate}}</div>
        <div class="Item-function"  @click="stopPropagation($event)">
            <a-dropdown :trigger="['click']">
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <i class="el-icon-more"></i>
                </a>
                <a-menu slot="overlay" class="Item-function-menu">
                    <a-menu-item key="0">
                        <a @click="toRequirementInfo()">详细信息</a>
                    </a-menu-item>
                    <a-menu-item key="1">
                        <a @click="deleteRequirement()">删除</a>
                    </a-menu-item>
                 </a-menu>
                 
            </a-dropdown>
        </div>
    </div>
</template>

<script>
import qs from 'qs'
    export default {
        props:['requirement'],


        methods: {
            toMilestone(){
                this.$router.push({
                    path:'/index/milestone',
                    query:{
                        projectid:this.$route.query.projectid
                    }
                }) 
            },
            deleteRequirement(){
                var _this = this;
                this.$confirm({
                    title: '你想要删除这条需求吗?',
                    content: h => <div style="color:red;"></div>,
                    okText:'确认',
                    cancelText:'取消',
                    mask:false,
                    onOk() {
                        _this.axios.post('/index/requirement/delete',qs.stringify({
                            requirementid:_this.requirement.requirementid,
                            projectid:_this.$route.query.projectid
                        })).then(function(response){
                            console.log(response);
                            if(response.data.code == 200){
                                _this.$emit("ChangeRequirements",response.data.data.list);
                                _this.$message.info('删除成功');
                            }else{
                                _this.$message.info('删除失败');
                            }
                        })
                    },
                    onCancel() {
                    console.log('Cancel');
                    },
                    class: 'test',
                });
            },

            stopPropagation(event){
                event.stopPropagation();
            },
            toRequirementInfo(){
                this.$emit('fatherMethod',this.requirement.requirementid);
            }
        },
        
    }
</script>

<style scoped>
.RequirementItem{
    width: 100%;
    height: 56px;
    border-bottom: 1px solid rgb(245, 247, 250);;
    padding: 10px 0;
    font-size: 15px;
    transition: all 0.2s linear;
}
.RequirementItem:hover{
    background: rgb(245, 247, 250);;
}
.RequirementItem div{
    display: inline-block;
    line-height: 36px;
}
.RequirementItem div:nth-child(1){
    position: absolute;
    left: 40px;
    width: 360px;
    text-align: left;
}

.RequirementItem div:nth-child(2){
    position: absolute;
    left: 356px;
    width: 120px;
    text-align: center;
}
.RequirementItem div:nth-child(3){
    position: absolute;
    left: 568px;
    width: 120px;
}
.RequirementItem div:nth-child(4){
    position: absolute;
    left: 792px;
}
.RequirementItem div:nth-child(5){
    position: absolute;
    left: 1000px;
}

.Item-function{
    text-align: center;
}
.Item-function i{
    padding: 4px;
    transition: all 0.3s linear;
    border-radius: 2px;
}
.Item-function i:hover{
    background: rgb(236, 235, 235);
}
.Item-function i:active{
    background: rgb(236, 235, 235);
}


.Item-function-menu{
    font-size: 17px;
    margin-left: -35px;
    text-align: center;
}
</style>