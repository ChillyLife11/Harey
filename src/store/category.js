import { defineStore } from 'pinia';
import { create, readAll }      from '@/api.js';

export const useCategoryStore = defineStore('category', {
    state: () => ({
        list: [
            {
                id: 1,
                name: 'Кафе',
            },
            {
                id: 3,
                name: 'Продуктовый магазин',
            },
            {
                id: 10,
                name: 'Автобус',
                default_price: 27
            },
        ]
    }),
    actions: {
        async getList() {
            try {
                let a = await readAll('categories');
                console.log(a);
            } catch (e) { console.log(e); }
        },
        async add(name, default_cost = 0) {
            try {
                const id = await create('categories', { name, default_cost, dt: (new Date()) });
                
                this.list.push({
                    id: 111,
                    name: 'Магнит',
                });
            } catch (e) { console.log(e); }

        }
    }
});