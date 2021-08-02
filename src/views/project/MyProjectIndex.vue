<template>
<div style="height:800px">
  <el-button class="tab-create" size="small" type="primary" @click="toCreate">新建项目</el-button>
  <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
    <el-tab-pane label="开源项目" name="first">
      
    </el-tab-pane>

    <el-tab-pane label="我的项目" name="second">
        <div class="Items">
            <ItemHeader></ItemHeader>
            <MyProjectItem v-for="(project, index) in myprojects" :project=project :key="index" @showDialog='showDialog'></MyProjectItem>
            <div class="Item-Pagination">
            <a-pagination :default-current="1" :current="currentPage" :total="total" @change="PaginationChange" />
            </div>
        </div>
    </el-tab-pane>

    <el-dialog
        title="团队成员管理"
        :visible.sync="dialogVisible"
        width="30%"
        :modal="false">
        <div class="dialog-header">
          <span class="header-title">开源社区</span>
          <el-button type="primary" @click="showAdd()" size="small" class="header-button">添加成员</el-button>
        </div>
        <div v-show="flag">
        <div class="TeamHeader" >
          <span>成员名称</span>
          <span>身份</span>
          <span>操作</span>
        </div>
        <div class="TeamItem" v-for="(member, index) in members" :key="index">
          <div class="Item-avatar"><a-avatar shape="square" :size="32" icon="user" /> <span class="Item-name">{{member.username}}</span></div>
          <span class="Item-status">{{member.status}}</span>
          <a class="Item-options">删除</a>
        </div>
        </div>

        <div v-show="!flag">
          <div class="Send-title">发送邮件邀请队友进入团队</div>
          <div class="Send-input">
            <div><el-input v-model="email" placeholder="请输入内容"></el-input></div>
          </div>
          <div class="Send-bottom">
            <el-button type="primary" size="small" @click="addMember()" class="header-button">确认邀请</el-button>
            <el-button size="small" @click="closeAdd()">返回上级</el-button>
          </div>
        </div>
</el-dialog>
    
  </el-tabs>
</div>
</template>
<script>
import ItemHeader from '@/components/ItemHeader.vue'
import MyProjectItem from '@/components/project/MyProjectItem.vue'
import qs from 'qs'

  export default {
    data() {
      return {
        activeName: 'second',
        myprojects:'',
        total:null,
        currentPage:null,
        dialogVisible:false,
        flag:true,
        email:'',
        members:[{
          username:'tttttttttttt1',
          status:'管理员',
        },
        {
          username:'tt2',
          status:'普通成员',
        },{
          username:'tt2',
          status:'普通成员',
        }],
        selectprojectid:''
      };
    },

    components:{MyProjectItem,ItemHeader},
    methods: {
      handleClick(tab, event) {
        if(this.activeName == 'first'){
          this.$router.replace("/index/project");
        }
        if(this.activeName == 'second'){
          this.$router.replace("/index/myproject");
        }
      },


      toCreate(){
        this.$router.replace("/index/createproject");
      },

      getProject(){
        var _this = this;
        this.axios.post('/index/myproject',qs.stringify({
                "currentPage":"1",
                "founder":this.$store.getters.getUsername
                })
                ).then(function (response) {
                  if(response.data.code == 200){
                    console.log(response);
                    _this.total = response.data.data.totalCount;
                    _this.currentPage = response.data.data.currentPage;

                    _this.myprojects = response.data.data.list;
                    console.log(_this.currentPage);
                  }
                }).catch(function (error) {
                    console.log(error);
                });
      },

      PaginationChange(page){
        var _this = this;
        this.axios.post('/index/myproject',qs.stringify({
            'currentPage':page,
            "founder":this.$store.getters.getUsername
        })
        ).then(function (response) {
          if(response.data.code == 200){
            _this.total = response.data.data.totalCount;
            _this.currentPage = response.data.data.currentPage;

            _this.myprojects = response.data.data.list;
          }
        }).catch(function (error) {
            console.log(error);
        });

      },

      showDialog(projectid){
        this.selectprojectid = projectid;

        var _this = this;
        this.axios.post('/index/getmembers',qs.stringify({
          projectid:this.selectprojectid
        })).then(function(response){
          console.log(response);
          if(response.data.code == 200){
            _this.members = response.data.data;
          }
        })
        this.dialogVisible = true;
      },
      showAdd(){
        this.flag = false;
      },
      closeAdd(){
        this.flag = true;
      },
      addMember(){
        var _this = this;
        this.axios.post("/index/sendemail",{
          projectid:this.selectprojectid,
          email:this.email,
        }).then(function(response){
          if(response.data.code == 200){
            _this.$message.info("发送邮件成功");
            _this.email = '';
          }
        })
      }
    },
    created() {
      this.getProject();
    },
  };
</script>

<style scoped>
.tab-create{
  position: absolute;
  right: 80px;
  top: 115px;
}

.Items{
  margin: 0px;
  padding: 0px;
}

.Item-Pagination{
  margin: 25px;
}

.dialog-header{
  width: 90%;
  text-align: left;
  padding: 3px 0px;
  margin: 0px auto;
  border-bottom: 1px solid rgb(245, 247, 250);
}

.header-title{
  display: inline-block;
  width: 80%;
  font-size: 16px;
  font-weight: 600;
}

.header-button{
  text-align: center;
}
.TeamHeader{
  width: 90%;
  padding: 4px 20px;
  border-bottom: 1px solid rgb(245, 247, 250);
  margin: 0 auto;
  text-align: left;
}
.TeamHeader span{
  display: inline-block;
}
.TeamHeader span:nth-child(2){
  margin-left: 200px;
}
.TeamHeader span:nth-child(3){
  margin-left: 130px;
}

.TeamItem{
  width: 90%;
  padding: 4px 20px;
  border-bottom: 1px solid rgb(245, 247, 250);
  margin: 0 auto;
  text-align: left;
  height: 50px;
  line-height: 42px;
}
.Item-avatar{
  display: inline-block;
  width: 242px;
  height: 42px;
}
.Item-name{
  display: inline-block;
  margin-left: 10px;
  width: 190px;
}
.Item-status{
  display: inline-block;
  width: 60px;
  text-align: center;
}

.Item-options{
  margin-left: 113px;

}

.Send-title{
  width: 100%;
  height: 50px;
  font-size: 20px;
  font-weight: 600;
  line-height: 50px;
}
.Send-input{
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
.Send-input div{
  width: 300px;
  margin: 0 auto;
}
.Send-bottom{
  margin-top: 20px;
}
</style>
