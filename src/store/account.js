import { defineStore } from "pinia";
import { account } from "@/appwrite.js";
import { ID } from "appwrite";
import { useRouter } from "vue-router";
import { ERRORS } from "@/constants.js";

const $router = useRouter();

export const useAccountStore = defineStore('account', {
    state: () => ({
        session: null,
        user   : null
    }),
    getters: {
        is_authed: state => !!state.user,
    },
    actions: {
        async init() {
            try {
                this.user = await account.get();
            } catch(e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка');
            }
        },
        async signup(email, password, name) {
            try {
                await account.create(ID.unique(), email, password, name);
            } catch(e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка при регистрации');
            }
        },
        async signin(email, password) {
            try {
                await account.createEmailPasswordSession(email, password);
                this.init();
            } catch (e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка при входе');
            }
        },
        async signout() {
            try {
                await account.deleteSession('current');
                this.user = null;
            } catch(e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка при выходе из аккаунта');
            }
        }
    }
});