import { createRouter, createWebHistory } from 'vue-router';
import { useAccountStore } from "@/store/account.js";
import { account } from "@/appwrite.js";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => (import('@/views/ViewHome.vue')),
        meta: { requires_auth: true }
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => (import('@/views/ViewCategories.vue')),
        meta: { requires_auth: true }
    },
    {
        path: '/signin',
        name: 'signin',
        component: () => (import('@/views/ViewSignin.vue')),
        meta: { requires_unauth: true }
    },
    {
        path: '/signup',
        name: 'signup',
        component: () => (import('@/views/ViewSignup.vue')),
        meta: { requires_unauth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    try {
        const session = await account.getSession('current');

        const $account_store = useAccountStore();
        $account_store.session = session;

        if (to.meta.requires_unauth) {
            return next({ name: 'home' });
        }
    } catch {
        if (!to.meta.requires_unauth) {
            return next({ name: 'signin' });
        }
    }

    next();
});

export default router;