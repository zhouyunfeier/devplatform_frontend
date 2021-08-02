<template>
    <div class="Requirement-Form">
        <form action="">
            <div class="Item-header">标题<span class="hightlight">*</span></div>
            <el-input v-model="requirement.title" placeholder="请输入标题" class="margin-top"></el-input>
            <div class="Item-header margin-top">需求描述</div>

            <div class="margin-top">
                 <mavon-editor ref="md" v-model="requirement.requirementtext" :subfield="false" :toolbars="toolbars"></mavon-editor>
            </div>
            <div class="Item-button margin-top">
                <el-button type="primary" @click="createRequirement()">创建</el-button>
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
                requirement:{
                    title:'',
                    projectid:this.$route.query.projectid,
                    createDate:'',
                    updateDate:'',
                    founder:this.$store.getters.getUsername,
                    requirementhtml:'',
                    requirementtext:''
                },
                toolbars: {
                    bold: true, // 粗体
                    italic: true, // 斜体
                    header: true, // 标题
                    underline: true, // 下划线
                    
                    
                    quote: true, // 引用
                    ol: true, // 有序列表
                    ul: true, // 无序列表
                    

                    code: true, // code
                    table: false, // 表格
                    fullscreen: true, // 全屏编辑
                    readmodel: true, // 沉浸式阅读
                                 
                    /* 2.1.8 */
                    alignleft: true, // 左对齐
                    aligncenter: true, // 居中
                    alignright: true, // 右对齐
                    /* 2.2.1 */
                    
                    preview: true, // 预览

                    link: false, // 链接
                    imagelink: true, // 图片链接
                    navigation: false, // 导航目录
                    undo: false, // 上一步
                    redo: false, // 下一步
                    trash: false, // 清空
                    save: false, // 保存（触发events中的save事件）
                    superscript: false, // 上角标
                    subscript: false, // 下角标
                    help: false, // 帮助
                    strikethrough: false, // 中划线
                    mark: false, // 标记
                    htmlcode: false, // 展示html源码  
                    subfield: true, // 单双栏模式
                }

            }
        },       
        
        
        methods: {
            createRequirement(){
                if(this.requirement.title == ''){
                    this.$emit('fatherMethod');
                    this.$message.warning('标题不能为空');
                    return;
                }
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var time = year+"/"+month+"/"+day+" "+hour+":"+min;
                this.requirement.createDate = time;
                this.requirement.updateDate = time;
                console.log(time);


                var _this = this;
                var requirementhtml = this.$refs.md.d_render;
                var requirementtext = this.$refs.md.d_value;
                this.axios.post("/index/saverequirement",{
                    'title':this.requirement.title,
                    'projectid':this.requirement.projectid,
                    'founder':this.requirement.founder,
                    'createDate':this.requirement.createDate,
                    'updateDate':this.requirement.updateDate,
                    'requirementhtml':requirementhtml,
                    'requirementtext':requirementtext,
                }).then(function(response){
                    if(response.data.code == 200){
                         console.log(response)
                        _this.$emit('ChangeRequirements',response.data.data.list);
                        _this.$emit('fatherMethod');
                        _this.$message.info('创建成功');
                        _this.requirement.title = '';
                        _this.requirement.requirementhtml = '';
                        _this.requirement.requirementtext = '';
                    }
                })

            },

            cancel(){
                console.log("son");
               this.$emit('fatherMethod');
            }

        },
    }
</script>

<style scoped>
.Requirement-Form{
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