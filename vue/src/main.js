import Vue from 'vue'
import App from './app/components/App.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
  path: '/:id',
  component: App
}, ]

const router = new VueRouter({
  mode: 'history',
  routes
})

new Vue({
  el: '#app',
  components: {
    App
  },
  router,
  template: "<App/>"
}) //.$mount('#app')