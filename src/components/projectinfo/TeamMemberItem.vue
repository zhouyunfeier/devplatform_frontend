<template>
<div class="member_box">
  <a-popover title="用户详情">
        <template slot="content">
            <div class="content_avatar"><img src="@/assets/avatar.jpg" alt=""></div>
            <div class="content_username">
                {{member.username}}
                <p>{{member.status}}</p>
            </div>
        </template>
        <div class="member_avatar"><img :src="member.avatar" alt=""></div>
  </a-popover>
</div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        props:['member']
    }
</script>

<style scoped>
.member_box{
    position: relative;
    display: inline-block;
    margin-left: 10px;
    margin-top: 5px;
    
}
.member_content{
    position: relative;
    width: 200px;
    height: 100px;
}
.member_avatar{
    width: 50px;
    height: 50px;
}
.member_avatar img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.content_avatar{
    display: inline-block;
    float: left;
}
.content_avatar img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
}

.content_username{
    display: inline-block;
    width: 100px;
    text-align: center;
    padding-top: 10px;
    font-size: 12px;
}
</style>