import { defineStore } from "pinia";
import { databases } from "@/appwrite.js";
import { APPWRITE } from "@/config.js";
import { ID, Query } from "appwrite";
import { ERRORS } from "@/constants.js";
import { useAccountStore } from "@/store/account.js";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        list: []
    }),
    actions: {
        /* 25 limit - default at appwrite */
        async getList(limit = 25) {
            const response = await databases.listDocuments(
                                APPWRITE.DB_ID,
                                APPWRITE.CATEGORIES_ID,
                        [Query.orderDesc('sort'), Query.limit(limit)]
                            );
            this.list = response.documents;
        },
        async add(title, default_price) {
            const $account_store = useAccountStore();

            // no idea how to make this calculate automatically with appwrite functions 😢
            const current_max_sort_number = Math.max( ...this.list.map(c=>c.sort) );

            try {
                await databases.createDocument(
                    APPWRITE.DB_ID,
                    APPWRITE.CATEGORIES_ID,
                    ID.unique(),
                    { title, default_price, user_id: $account_store.user.$id, sort: current_max_sort_number + 1 }
                );
            } catch (e) {
                throw new Error(ERRORS[e.type] || 'Неизвестная ошибка при добавлении категории');
            }
        }
    }
});