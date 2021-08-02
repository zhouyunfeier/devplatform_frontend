import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      username : window.localStorage.getItem('user'||'[]')==null? '': JSON.parse(window.localStorage.getItem('user' || '[]')).username,
      avatar: window.localStorage.getItem('user'|| '[]')==null? '': JSON.parse(window.localStorage.getItem('user'|| '[]')).avatar,
    }
  },
  mutations: {
    login(state , user){
      state.user = user;
      window.localStorage.setItem('user',JSON.stringify(user));
    },

    logout(state){
      state.user = [];
      window.localStorage.removeItem('user');
    },
    setAvatar(state,avatar){
      state.avatar = avatar;
    }
  },
  getters:{
    getUsername (state){
      return state.user.username;
    },
    getAvatar(state){
      return state.user.avatar;
    }
  },
  actions: {
  },
  modules: {
  }
})
