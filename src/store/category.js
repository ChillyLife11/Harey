import { defineStore } from "pinia";
import { databases } from "@/appwrite.js";
import { APPWRITE } from "@/config.js";
import { COLLECTIONS } from "@/constants.js";
import { Query } from "appwrite";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        list: []
    }),
    actions: {
        async getList(limit = 0) {
            const response = await databases.listDocuments(
                                APPWRITE.DB_ID,
                                COLLECTIONS.categories,
                        [Query.orderDesc('$createdAt'), Query.limit(limit)]
                            );
            this.list = response.documents;
        },
    }
});