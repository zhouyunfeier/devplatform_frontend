<template>
<div class="ProjectItem" @click="toProjectInfo()">
    <div><a>{{project.name}}</a></div>
    <div>{{project.founder}}</div>
    <div>{{project.updateDate}}</div>
    <div class="Item-function" @click="stopPropagation($event)">
        <a-dropdown :trigger="['click']">
            <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            <i class="el-icon-more"></i>
            </a>
            <a-menu slot="overlay" class="Item-function-menu">
                <a-menu-item key="0">
                    <a @click="toProjectInfo()">详细信息</a>
                </a-menu-item>
                <a-menu-item key="1">
                    <a @click="toDemand()">需求文档</a>
                </a-menu-item>
                <a-menu-item key="2">
                    <a @click="toMilestone()">里程碑</a>
                </a-menu-item>
                <a-menu-item key="3">
                    <a href="http://www.taobao.com/">图标表查看</a>
                </a-menu-item>
                <a-menu-item key="4">
                    <a @click="toTeam()">团队管理</a>
                </a-menu-item>
                </a-menu>
                
        </a-dropdown>
    </div>
</div>
</template>

<script>
    export default {
        props:['project'],

        methods: {
            toMilestone(){
                this.$router.push({
                    path:'/index/milestone',
                    query:{
                        founder:this.project.founder,
                        project:this.project.name
                    }
                }) 
            },
            toDemand(){
                this.$router.push({
                    path:'/index/requirement',
                    query:{
                        founder:this.project.founder,
                        project:this.project.name
                    }
                })
            },
            toProjectInfo(){
                this.$router.push({
                    path:'/index/projectinfo',
                    query:{
                        founder:this.project.founder,
                        project:this.project.name
                    }
                })
            },
            stopPropagation(event){
                event.stopPropagation();
            },
            toTeam(){
                this.$emit('showDialog',this.project.projectid);
            }
        },
        
    }
</script>

<style scoped>
.ProjectItem{
    width: 100%;
    height: 56px;
    border-bottom: 1px solid rgb(245, 247, 250);
    padding: 10px 0;
    font-size: 15px;
    transition: all 0.2s linear;
}
.ProjectItem:hover{
    background: rgb(245, 247, 250);;
}
.ProjectItem div{
    display: inline-block;
    line-height: 36px;
}
.ProjectItem div:nth-child(1){
    position: absolute;
    left: 40px;
    width: 360px;
    text-align: left;
}

.ProjectItem div:nth-child(2){
    position: absolute;
    left: 457px;
    width: 120px;
    text-align: center;
}
.ProjectItem div:nth-child(3){
    position: absolute;
    left: 667px;
    width: 120px;
}
.ProjectItem div:nth-child(4){
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