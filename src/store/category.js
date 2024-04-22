import { defineStore } from 'pinia';
import { create, readAll }      from '@/api.js';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        list: []
    }),
    actions: {
        async getList() {
            try {
                const categories = await readAll('categories');

                this.list = categories;

            } catch (e) { console.log(e); }
        },
        async add(name, default_cost = 0) {
            try {
                const id = await create('categories', { name, default_cost, dt: (new Date()) });
            } catch (e) { console.log(e); }

        }
    }
});