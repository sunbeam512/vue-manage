import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../components/Home.vue'
// import Welcome from '../components/Welcome.vue'
// import Login from '../components/Login.vue'
const routes = [
    {
        name: 'home',
        path: '/',
        meta: {
            title: '首页'
        },
        component: Home,
        redirect: '/welcome',
        children: [
            {
                name: 'welcome',
                path: 'welcome',
                meta: {
                    title: '欢迎来到VUE3后台管理系统'
                },
                component: () => import('../views/Welcome.vue'),
            },
                    {
                        name: 'user',
                        path: '/system/user',
                        meta:{
                          title:'用户管理'
                        },
                        component:()=>import('../views/User.vue'),
                    },
                    {
                        name: 'menu',
                        path: '/system/menu',
                        meta:{
                          title:'菜单管理'
                        }, 
                        component:()=>import('../views/Menu.vue'),
                    },
                    {
                        name: 'role',
                        path: '/system/role',
                        meta:{
                          title:'角色管理'
                        }, 
                        component:()=>import('../views/Role.vue'),
                    }
                  
                        ]
             },

    {
        name: 'login',
        path: '/login',
        meta: {
            title: '登录'
        },
        component: () => import('../views/Login.vue')
    },
    
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router
