<template>
  <div id="app">
  <router-view></router-view>
  </div>
</template>
<script>
  export default {
    name: 'App',
    components: {
  
    },
    data() {
      return {

      };
    },
    methods:{

    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 0px;
  height: 100%;
  width: 100%;
  position: relative;
  overflow-y: scroll;
}

/*修改antd全局属性*/
.ant-form-explain{
    text-align: left;
}



/* 滚动条 */
::-webkit-scrollbar-thumb:horizontal { /*水平滚动条的样式*/
	width: 5px;
	background-color: #e9e9e9;
	-webkit-border-radius: 6px;
}
::-webkit-scrollbar-track-piece {
	background-color: #fff; /*滚动条的背景颜色*/
	-webkit-border-radius: 0; /*滚动条的圆角宽度*/
}
::-webkit-scrollbar {
	width: 10px; /*滚动条的宽度*/
	height: 8px; /*滚动条的高度*/
}
::-webkit-scrollbar-thumb:vertical { /*垂直滚动条的样式*/
	height: 50px;
	background-color: #e9e9e9;
	-webkit-border-radius: 4px;
	outline: 2px solid #fff;
	outline-offset: -2px;
	border: 2px solid #fff;
}
::-webkit-scrollbar-thumb:hover { /*滚动条的hover样式*/
	height: 50px;
	background-color: #e9e9e9;
	-webkit-border-radius: 4px;
}

.el-dialog{
  min-width: 600px;
  min-height: 300px;
}

.el-drawer__header{
    font-size: 16px;
    font-weight: 600;
    text-align: left;
    margin-left: 20px;
}
.el-drawer{
  overflow-y: scroll;
}
.el-drawer__wrapper {
  background: rgba(255,255,255, 0.01);
  overflow-y: scroll;
}
</style>
