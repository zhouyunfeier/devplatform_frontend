<template>
    <div class="Infobox">
        <div class="Infobox-header">
        <span>需求详情页面</span>
        
        <i class="el-icon-close" @click="CloseDrawer()"></i>
        </div>
        
        <input type="text" class="RequirementInput" v-model="selectedrequirement.title" @focus="saveold()" @blur="updateTitle()">

        <div class="Info-change"><el-button plain  @click="showMavon()">编辑描述</el-button></div>
        <div v-show="flag" class="Info-text" v-html="selectedrequirement.requirementhtml"></div>
        <div class="class-mavon"  v-show="!flag">
        <mavon-editor :toolbars="toolbars" ref="md" :subfield="false" v-model="selectedrequirement.requirementhtml" @imgAdd="imgAdd" @imgDel="imgDel"/>
        </div>
        <div v-show="!flag" class="Info-bottom">
            <el-button type="primary" @click="saveRequirement()">保存</el-button>
        
            <el-button  @click="closeMavon()">取消</el-button>
        </div>   
    </div>
</template>

<script>
import qs from 'qs'
    export default {
        data() {
            return {
                flag:true,
                oldtitle:'',
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
        props:['selectedrequirement',"currentPage"],  
        
        methods: {
            saveRequirement(){
                var _this = this;
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var updateDate = year+"/"+month+"/"+day+" "+hour+":"+min;
                this.axios.post("/index/requirement/updaterequirement",{
                    requirementid:this.selectedrequirement.requirementid,
                    title:this.saveRequirement.title,
                    founder:this.selectedrequirement.founder,
                    createDate:this.selectedrequirement.createDate,
                    updateDate:updateDate,
                    projectid:this.selectedrequirement.projectid,
                    requirementhtml:this.selectedrequirement.requirementhtml,
                    requirementtext:this.selectedrequirement.requirementtext
                }).then(function(response){
                    if(response.data.code == 200){
                        _this.selectedrequirement.updateDate = updateDate;
                        _this.$emit('updateRequirement',_this.selectedrequirement);
                        _this.$message.info("更新成功");
                    }
                })
            },
            saveold(){
                this.oldtitle = this.selectedrequirement.title;
            },
            showMavon(){
                this.flag = false;
            },
            closeMavon(){
                this.flag = true;
            },
            updateTitle(){
                var _this = this;
                var date = new Date();
                var year = date.getFullYear();
                var month = date.getMonth()+1;
                var day = date.getDate();
                var hour = date.getHours();
                var min = date.getMinutes();
                var updateDate = year+"-"+month+"-"+day+" "+hour+":"+min;
                if(this.oldtitle != this.selectedrequirement.title){
                    this.axios.post("/index/requirement/updatetitle",qs.stringify({
                        requirementid:this.selectedrequirement.requirementid,
                        projectid:this.selectedrequirement.projectid,
                        title:this.selectedrequirement.title,
                        updateDate:updateDate,
                        currentPage:this.currentPage,
                    })).then(function(response){
                        if(response.data.code == 200){
                            _this.$emit('ChangeRequirements',response.data.data.list);
                            _this.$message.info("更新成功");
                        }else{
                            _this.$message.info("更新失败");
                        }
                    })
                }else{
                    return;
                }
            },
            CloseDrawer(){
                this.$emit('CloseDrawer');
            },
            imgAdd(){},
            imgDel(){},
        },
    }
</script>

<style scoped>
.Infobox{
    width: 100%;
    padding:20px 40px;
    overflow: hidden;
}

.Infobox-header{
    width: 100%;
    height: 50px;
    text-align: justify;
    line-height: 50px;
    position: relative;
}
.Infobox-header span{
    font-size: 16px;
    font-weight: 600;
}

.Infobox-header i{
    position: absolute;
    right: 0px;
    font-size: 24px;
    cursor: pointer;
    line-height: 50px;
}
.RequirementTitle{
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    text-align: left;
    margin-top: 20px;
}
.RequirementInput{
    margin-top: 24px;
    border: 2px solid #ffffff;
    width: 100%;
    font-size: 20px;
    font-weight: 600;
    border-radius: 4px;
}
.RequirementInput:hover{
    border: 2px solid #2a2b2e;
}
/* input :hover{
    border: 1px solid #dcdfe6;
    outline: 2px;
} */

.Info-change{
    text-align: left;
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    border-bottom: solid 2px beige;
}

.Info-text{
    text-align: left;
    margin-top: 20px;
    padding: 20px;
    width: 100%;
    height: auto;
    min-height: 300px;
}


.Info-bottom{
    width: 100%;
    text-align: left;
    margin-top: 30px;
}

.class-mavon{
    width: 100%;
    margin-top: 10px;
}
</style>