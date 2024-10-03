import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: '/',
        name: 'home',
        component: () => (import('@/views/ViewHome.vue'))
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => (import('@/views/ViewCategories.vue'))
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => (import('@/views/ViewSignin.vue'))
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => (import('@/views/ViewSignup.vue'))
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;