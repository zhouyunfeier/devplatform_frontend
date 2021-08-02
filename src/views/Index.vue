<template>
  <a-layout id="components-layout-demo-fixed-sider">
    <a-layout-sider :style="{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }">
      <div class="logo" />
      <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
        <a-menu-item key="1"  @click="toProject">
          <a-icon type="user"/>
          <span class="nav-text">项目管理</span>
        </a-menu-item>
        <a-menu-item key="2">
          <a-icon type="video-camera" />
          <span class="nav-text">流水线管理</span>
        </a-menu-item>
        <a-menu-item key="3">
          <a-icon type="upload" />
          <span class="nav-text">里程碑管理</span>
        </a-menu-item>
        <a-menu-item key="4">
          <a-icon type="bar-chart" />
          <span class="nav-text">统计报表</span>
        </a-menu-item>
        <a-menu-item key="5">
          <a-icon type="cloud-o" />
          <span class="nav-text">nav 5</span>
        </a-menu-item>
        <a-menu-item key="6">
          <a-icon type="appstore-o" />
          <span class="nav-text">nav 6</span>
        </a-menu-item>
        <a-menu-item key="7">
          <a-icon type="team" />
          <span class="nav-text">nav 7</span>
        </a-menu-item>
        <a-menu-item key="8">
          <a-icon type="shop" />
          <span class="nav-text">nav 8</span>
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout :style="{ marginLeft: '200px'}">
      <a-layout-header style="background: #fff; padding: 0">
        <div class="header_box">
        <NavMenu class="header_nav"></NavMenu>
        </div>
      </a-layout-header>
      <a-layout-content :style="{ margin: '24px 16px 0', overflow: 'initial', }">
        <div :style="{ padding: '24px', background: '#fff', textAlign: 'center' }">
          <router-view></router-view>
        </div>
      </a-layout-content>
      <a-layout-footer :style="{ textAlign: 'center' }">
        Dev Platform ©2021 Created by WUT
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script>
import NavMenu from "@/components/navmenu/NavMenu.vue"
export default {
  data() {
    return {
      collapsed: false,
    };
  },
  components: { NavMenu },

  methods: {
    toProject(){
      this.$router.replace('/index/project');
    }
  },
};
</script>
<style scoped>
#components-layout-demo-fixed-sider .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-fixed-sider .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-fixed-sider .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}

.header_box{
  text-align: right;
}

.header_nav{
  padding-right: 10px;
  display: inline-block;
  margin-right: 0px;
}
</style>
