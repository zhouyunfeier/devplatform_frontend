<template>
    <div class="Milestone-box">
        <div class="Milestone-name">{{milestone.milestonename}}</div>
        <div class="Milestone-createDate">下达日期:  {{milestone.createDate}}</div>
        <div class="Milestone-endDate">完成日期:  {{milestone.endDate}}</div>
        
        <div class="Milestone-bottom">
        <div class="Milestone-percentage" :style="handleStyle()">{{milestone.percentage}}</div>
        <div class="Milestone-user">{{milestone.user}}</div>
        <div class="Milestone-status" :style="handleColor()">{{milestone.status}}</div>
        </div>

    </div>
</template>

<script>
    export default {
        props:['milestone'],
        data() {
            return {
                
            }
        },  
        methods: {
            handleStyle(){
                if(this.milestone.status == '执行中'){
                    return{background:"rgb(51, 224, 167)"}
                }
                if(this.milestone.status == '逾期'){
                    return{background: "rgb(173, 24, 24)"}
                }
                if(this.milestone.status == '已完成'){
                    return{background: 'rgb(81, 151, 81)'}
                }
            },
            handleColor(){
                if(this.milestone.status == '执行中'){
                    return{color:"rgb(51, 224, 167)"}
                }
                if(this.milestone.status == '逾期'){
                    return{color: "rgb(204, 44, 44)"}
                }
                if(this.milestone.status == '已完成'){
                    return{color: 'rgb(81, 151, 81)'}
                }
            }
        },   
    }
</script>

<style scoped>
.Milestone-box{
    width: 100%;
    height: 110px;
    background: #F0F2F5;
    padding: 5px 10px;
    font-size: 12px;
    font-weight: 600;
    margin-top: 2px;
    transition: all 0.3s linear;
}
.Milestone-box:hover{
    background: rgb(233, 234, 236);
}

.Milestone-name{
    text-align: left;
}

.Milestone-createDate{
    text-align: left;
    margin-top: 5px;
}

.Milestone-endDate{
    text-align: left;
    margin-top: 5px;
}

.Milestone-percentage{
    width: 40px;
    height: 20px;
    border-radius: 4px;
    display: inline-block;
    text-align: center;
    line-height: 20px;
    color: #fff;
}
.Milestone-bottom{
    text-align: left;
}
.Milestone-bottom div{
    display: inline-block;
    margin-top: 5px;
}
.Milestone-user{
    margin-left: 30px;
    width: 150px;
}

.Milestone-status{
    margin-left: 0px;
}

</style>