<template>
    <div class="ItemHeader">
        <div>标题</div>
        <div>创建人</div>
        <div>创建时间</div>
        <div>更新时间</div>
        <div>操作</div>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.ItemHeader{
    width: 100%;
    height: 30px;
    padding: 5px 0px;
    line-height: 22px;
    border-bottom: 1px solid rgb(245, 247, 250);
    font-size: 12px;
    font-weight: 600px;
}

.ItemHeader div{
    display: inline-block;
}
.ItemHeader div:first-child{
    position: absolute;
    left: 60px;
}
.ItemHeader div:nth-child(2){
    position: absolute;
    left: 400px;
}
.ItemHeader div:nth-child(3){
    position: absolute;
    left: 600px;
}
.ItemHeader div:nth-child(4){
    position: absolute;
    left: 800px;
}
.ItemHeader div:nth-child(5){
    position: absolute;
    left: 1000px;
}
</style>