import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import store from './store'

Vue.config.productionTip = false


new Vue({
  render: h => h(App),
  beforeCreate(){
    // 在Vue原型中添加事件总线
    Vue.prototype.$eventBus = this
  },
  store
}).$mount('#app')
