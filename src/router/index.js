import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'chatroom',
    component: () =>
        import ('../views/chatroom')
}]

const router = new VueRouter({
    mode: 'history',
    routes
})

export default router