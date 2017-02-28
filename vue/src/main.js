import Vue from 'vue'
import App from './components/App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: App },
]

const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  components: {
    App
  },
  // router
  template: "<App/>",
})//.$mount('#app')
