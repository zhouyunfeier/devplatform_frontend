<template>
  <div style="height: 800px;">
    <el-button class="tab-create" size="small" type="primary" @click="toCreate">新建项目</el-button>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="开源项目" name="first">
        <div class="Items">
          <ItemHeader></ItemHeader>
          <ProjectItem v-for="(project, index) in projects" :project=project :key="index"></ProjectItem>
          <div class="Item-Pagination">
            <a-pagination :default-current="1" :current="currentPage" :total="total" @change="PaginationChange" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="我的项目" name="second">
        <!-- <ItemHeader></ItemHeader>
        <MyProjectIndex></MyProjectIndex> -->
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import ItemHeader from '@/components/project/ItemHeader.vue'
import ProjectItem from '@/components/project/ProjectItem.vue'
import qs from 'qs'

export default {
  data() {
    return {
      activeName: 'first',
      projects:'',
      total:null,
      currentPage:null
    };
  },
  components:{ProjectItem,ItemHeader},
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
      this.axios.post('/index/project',qs.stringify({
              "currentPage":"1"
              })
              ).then(function (response) {
                if(response.data.code == 200){
                  console.log(response);
                  _this.total = response.data.data.totalCount;
                  _this.projects = response.data.data.list;
                  _this.currentPage = response.data.data.currentPage;
                  console.log(_this.currentPage);
                }
              }).catch(function (error) {
                  console.log(error);
              });
    },

    PaginationChange(page){
      var _this = this;
      this.axios.post('/index/project',qs.stringify({
          'currentPage':page
      })
      ).then(function (response) {
        if(response.data.code == 200){
          _this.total = response.data.data.totalCount;
          _this.projects = response.data.data.list;
          _this.currentPage = response.data.data.currentPage;
        }
      }).catch(function (error) {
          console.log(error);
      });

    },

    toMyProject(){
      alert("12");
    }
  },
  created() {
    this.getProject();
  },
};

</script>

<style>
.tab-create{
  position: absolute;
  right: 80px;
  top: 115px;
  margin-top: 5px;
  z-index: 999;
}

.Items{
  margin: 0px;
  padding: 0px;
}

.Item-Pagination{
  margin: 25px;
}
</style>
