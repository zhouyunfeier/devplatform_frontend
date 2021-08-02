import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/user/Login.vue'
import Register from '../views/user/Register.vue'
import ProjectIndex from '../views/project/ProjectIndex.vue'
import CreateProject from '../views/project/CreateProject.vue'
import MyProject from '../views/project/MyProjectIndex.vue'
import Milestone from '../views/milestone/MilestoneIndex.vue'
import Requirement from '../views/requirement/RequirementIndex.vue'
import ProjectInfo from '../views/project/ProjectInfo.vue'
import IconTableIndex from '../views/icontable/IconTableIndex.vue'
import UpdateAvatar from '../views/navuser/UpdateAvatar.vue'
import UpdatePassword from '../views/navuser/UpdatePassword.vue'
import UserInfo from '../views/navuser/UserInfo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/index',
    name: 'Index',
    component: Index,
    redirect: '/index/project',
    meta: {
      requireAuth: true
    },
    children:[
      {
        path:'updateavatar',
        name:'UpdateAvatar',
        component:UpdateAvatar,
        meta:{
          requireAuth:true
        }
      },{
        path:'updatepassword',
        name:UpdatePassword,
        component:UpdatePassword,
        meta:{
          requireAuth:true
        }
      },{
        path:'userinfo',
        name:'UserInfo',
        component:UserInfo,
        meta:{
          requireAuth:true
        }
      },
      {
        path:'project',
        name:'Project',
        component:ProjectIndex,
        meta: {
          requireAuth: true
        }
      },
      {
        path:'projectinfo',
        name:'ProjectInfo',
        component:ProjectInfo,
        meta:{
          requireAuth:true
        }
      },
      {
        path:'createproject',
        name:'CreateProject',
        component:CreateProject,
        meta: {
          requireAuth: true
        }
      },
      {
        path:'myproject',
        name:'MyProject',
        component:MyProject,
        meta:{
          requireAuth: true
        }
      },
      {
        path:'milestone',
        name:'Milestone',
        component:Milestone,
        meta:{
          requireAuth:true
        }
      },
      {
        path:'requirement',
        name:'Requirement',
        component:Requirement,
        meta:{
          requireAuth:true
        }
      },
      {
        path:'icontable',
        name:'IconTableIndex',
        component:IconTableIndex,
        meta:{
          requireAuth:true
        }
      }
    ]
  },

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]




const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})




export default router
// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}