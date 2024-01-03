import { createRouter, createWebHistory } from 'vue-router'
import GabungRapat from '../views/GabungRapat.vue'
import PilihServer from '../views/Dashboard.vue'
import Loading from '../components/meetings/PreJoinLoad'

const routes = [{
        path: '/',
        name: 'Landing',
        component: () =>
            import ('../views/Landing.vue')
    },
    {
        path: '/gabungrapat',
        name: 'GabungRapat',
        component: GabungRapat
    },
    {
        path: '/pilihserver',
        name: 'PilihServer',
        component: PilihServer
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