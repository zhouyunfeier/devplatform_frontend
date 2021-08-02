<template>
<div style="height:800px">
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="新建项目" name="first"> 
    <div class="create-form">
        <a-form-model :model="project" 
        :rules="rules"
        :label-col="labelCol" :wrapper-col="wrapperCol">

        <a-form-model-item label="项目名" prop="name">
        <a-input v-model="project.name" />
        </a-form-model-item>

        <a-form-model-item label="创建人">
            <div class="Item-founder">
            {{project.founder}}
            </div>
        </a-form-model-item>

        <a-form-model-item label="创建日期">
            <div class="Item-founder">
            {{project.createDate}}
            </div>
        </a-form-model-item>
        
        <a-form-model-item label="是否公开">
            <div class="Item-switch">
            <a-switch v-model="project.open" />
            </div>
        </a-form-model-item>


        <a-form-model-item label="项目描述">
        <a-input v-model="project.description" type="textarea" />
        </a-form-model-item>

        <a-form-model-item label="备注">
        <a-input v-model="project.remarks" />
        </a-form-model-item>

        <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">
            创建
        </a-button>

        <a-button style="margin-left: 10px;" @click="cancel">
            取消
        </a-button>

        </a-form-model-item>

        </a-form-model>
    </div>

    </el-tab-pane>

  </el-tabs>

</div>
</template>
<script>
export default {
  data() {
    return {
      activeName:"first",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      rules:{
          name:[
              {required:true,message:'请填写项目名称',trigger:'blur'},
              {max:20, message:'最大20个字符',trigger:'blur'}]
      },
      project: {
        name: '',
        description: '',
        remarks:'',
        founder:this.$store.getters.getUsername,   
        open: false,
        createDate:'',     
      },
    };
  },

  created(){
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth()+1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    var time = year+"/"+month+"/"+day+" "+hour+":"+min;
    this.project.createDate = time;
  },

  methods: {
    onSubmit() {
        if(this.project.name == ''){
            this.$message.warn("请输入项目名称");
            return;
        }
        var _this = this;
        this.axios.post('/index/saveproject',{
            name:this.project.name,
            description:this.project.description,
            remarks:this.project.remarks,
            founder:this.project.founder,
            createDate:this.project.createDate,
            open:this.project.open == false? 0:1
        }).then(function(response){
            if(response.data.code == 200){
                if(response.data.msg == "新建项目成功"){
                    _this.$message.info("新建项目成功");
                    _this.$router.replace("/index/project");
                }else{
                    _this.$message.warn("新建项目失败");
                }
            }
            
        }).catch(function (error) {
                _this.$message.warn("新建项目失败");
        });
    },

    handleClick(){
        
    },

    cancel(){
        this.$router.replace("/index/project");
    }
  },
};
</script>

<style scoped>
.create-form{
    width: 900px;
    margin-left: 150px;
}
.Item-founder{
    position: absolute;
    left: -250px;
}

.Item-switch{
    position: absolute;
    left: -250px;
}

</style>
