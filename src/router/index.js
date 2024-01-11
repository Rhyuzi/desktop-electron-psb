import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import Dashboard from '../views/Dashboard.vue'
import Loading from '../components/meetings/PreJoinLoad'

const routes = [{
        path: '/',
        name: 'Landing',
        component: () =>
            import ('../views/Landing.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/ruangrapat',
        name: 'RuangRapat',
        component: () => import('../views/RuangRapat.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router