<template>
    <div class="member_box">

    </div>
</template>

<script>
    export default {
        data() {
            return {
                member:{
                    avatar:'',
                    username:'',
                    status:'',

                }   
            }
        },
        props:[member]
    }
</script>

<style scoped>
.member_box{
    
}

</style>