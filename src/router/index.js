import {
    createRouter,
    createWebHashHistory
} from 'vue-router'


const IndexChildren = [
    {
        path: '/imageUpload',
        name: 'ImageUpload',
        component: () => import('@/components/ImageUpload'),
        meta: {
            title: '新闻动态'
        }
    },
    {
        path: '/developHistory',
        name: 'DevelopHistory',
        component: () => import('@/components/DevelopHistory'),
        meta: {
            title: '发展历程'
        }
    },
    {
        path: '/taskManage',
        name: 'TaskManage',
        component: () => import('@/components/TaskManage'),
        meta: {
            title: '任务管理'
        }
    }
]
const routes = [
    {
        path: '',
        redirect: '/login',
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/components/Login'),
    },
    {
        path: '/index',
        name: 'index',
        redirect: '/imageUpload',
        component: () => import('@/components/Index'),
        children: IndexChildren
    }
]

const history = createWebHashHistory()

const router = createRouter({
    history,
    routes
})

export default router
