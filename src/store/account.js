import { defineStore } from "pinia";
import { useRouter } from "vue-router";
import { nhost } from "@/nhost.js";

export const useAccountStore = defineStore('account', {
    state: () => ({
        user: null,
    }),
    actions: {
        async init() {
            const $router   = useRouter();

            this.user = await nhost.auth.getSession();
            nhost.auth.onAuthStateChanged((_, newSession) => {
                this.user = newSession;

                if (!this.user && !/\b(signup|signin)\b/.test(window.location.href))    $router.push({ name: 'signin' });
                else if (this.user && /\b(signup|signin)\b/.test(window.location.href)) $router.push({ name: 'home' });
            });
        },

        async signout() {
            const { error } = await nhost.auth.signOut();
        }
    }
});