import { defineStore } from "pinia";
import { account } from "@/appwrite.js";
import { ID } from "appwrite";
import { useRouter } from "vue-router";
import { ERRORS } from "@/constants.js";

const $router = useRouter();

export const useAccountStore = defineStore('account', {
    state: () => ({
        user: {
            email : '',
            name  : '',
            status: false,
        }
    }),
    getters: {
        authed: state => state.user.status,
    },
    actions: {
        async init() {
            try {
                const user = await account.get();
                this.user.email  = user.email;
                this.user.name   = user.name;
                this.user.status = user.status;
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
            await account.createEmailPasswordSession(email, password);
        },
        async signout() {
            try {
                await account.deleteSession('current');
                this.user.email  = '';
                this.user.name   = '';
                this.user.status = false;
            } catch(e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка при выходе из аккаунта');
            }
        }
    }
});