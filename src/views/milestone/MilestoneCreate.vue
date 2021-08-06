<template>
    <div class="MileCreate-Form">
        <form action="">
            <div class="Item-header">标题<span class="hightlight">*</span></div>
            <el-input v-model="milestone.milestonename" placeholder="请输入标题" class="margin-top"></el-input>
            <div class="Item-header margin-top">负责人<span class="hightlight">*</span></div>
            
            <div class="Item-Select">
                <el-select v-model="milestone.user" placeholder="请选择" class="Form-select margin-top">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.username"
                    :popper-append-to-body="false"
                    >
                    </el-option>
                </el-select>  
            </div>


            <div class="Item-header margin-top"><span>开始时间</span><span>结束时间</span></div>
            <div class="Form-Date margin-top">
                <div>
                <el-date-picker
                    v-model="milestone.createDate"
                    type="date"
                    placeholder="选择日期"
                    class="Date-pick"
                    style="width:90%;"
                    :picker-options="pickercreateDate"
                    format="yyyy/MM/dd"
                    >
                </el-date-picker>
                </div>

                <div>
                <el-date-picker
                    v-model="milestone.endDate"
                    type="date"
                    placeholder="选择日期"
                    class="Date-pick"
                    style="width:90% ;margin-left:5px"
                    :picker-options="pickerendDate"
                    format="yyyy/MM/dd"
                    >
                </el-date-picker>
                </div>
            </div>

            <div class="Item-header margin-top">里程碑描述</div>

            <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" class="margin-top" placeholder="请输入内容" v-model="milestone.description"></el-input>

            <div class="Item-button margin-top">
                <el-button type="primary" @click="createMilestone()">创建</el-button>
                <el-button @click="cancel()">取消</el-button>
            </div>
        
        </form>
    </div>
</template>

<script>
import qs from 'qs'
    export default {
        data() {
            return {
                milestone:{
                    milestonename:'',
                    projectname:this.$route.query.project,
                    founder:this.$route.query.founder,
                    createDate:'',
                    endDate:'',
                    user:'',
                    description:''
                },
                
               options: [{
                    value: 'tt',
                    label: 'tt'
                }, {
                    value: 'tt1',
                    label: 'tt1'
                }],

                pickercreateDate:{
                    disabledDate:(time) => {
                        if(this.milestone.endDate != ""){
                            return time.getTime() > new Date(this.milestone.endDate).getTime();
                        }else{
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                },
        
                pickerendDate: {
                    disabledDate: (time) => {
                        if(this.milestone.createDate != ""){
                            return time.getTime() < new Date(this.milestone.createDate).getTime();
                        }else{
                            return time.getTime() < Date.now() - 8.64e7
                        }
                    }
                }
            }
        },       
        
        
        methods: {
            createMilestone(){
                console.log(this.milestone.founder);
                var _this = this;
                this.axios.post("/index/savemilestone",{
                    projectfounder:_this.milestone.founder,
                    projectname:_this.milestone.projectname,
                    milestonename:_this.milestone.milestonename,
                    description:_this.milestone.description,
                    user:_this.milestone.user,
                    createDate:_this.milestone.createDate,
                    endDate:_this.milestone.endDate,
                }).then(function(response) {
                    if(response.data.code == 200){
                        if(response.data.msg == "新建里程碑成功"){
                            _this.$emit('fatherMethod')
                            _this.$router.go(0)
                        }
                    }

                })
        
            },

            cancel(){
               this.$emit('fatherMethod');
            }

        },

        created() {
            var _this = this;
            this.axios.post("/index/getmembers",qs.stringify({
                founder:this.$route.query.founder,
                projectname:this.$route.query.project
            })).then(function(response){
                console.log(response);
                if(response.data.code == 200){
                    _this.options = response.data.data;
                }
            })
        },
    }
</script>

<style scoped>
.MileCreate-Form{
    padding: 0px 20px;
    overflow: unset;
    min-width: 500px;
    min-height: 300px;
}
.Item-header{
    text-align: left;
    font-size: 16px;
    font-weight: 500;
    color: black;

}
.Item-header span:nth-child(2){
    margin-left: 250px;
}

.hightlight{
    color: #ff4a47;
    padding: 0 8px;
}

.margin-top{
    margin-top: 15px;
}

.Item-Select{
    width: 100%;
    text-align: left;
    padding: 0px;
    margin: 0px;
    overflow: hidden;
    border-radius: 0px;
}


.Form-select{
    width: 45%;
    padding: 0px;
    border-radius: 0px;
    overflow: hidden;
}

.Form-Date{
    position: relative;
    text-align: left;
    width: 100%;
}

.Form-Date div{
    display: inline-block;
    width: 50%;
}


.Date-pick{
    width: 100%;
}


</style>