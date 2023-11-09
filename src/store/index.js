import Vue from 'vue'
import Vuex from 'vuex'

// 使用vuex插件
Vue.use(Vuex)

/**
 * 创建vuex核心的store
 */

// 准备actions 用于响应组件中的动作
const actions = {}

// 准备mutations 用于操作状态数据
const mutations = {}

// 创建state 存储数据
const state = {}



const store = new Vuex.Store({
  actions,
  mutations,
  state
})

export default store

