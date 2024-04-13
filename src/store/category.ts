import { ICategoryItem } from '@/types/category.ts';
import { defineStore } from 'pinia';

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
        ] as ICategoryItem[]
    }),
    actions: {
        add() {
            this.list.push({
                id: 111,
                name: 'Магнит',
            });
        }
    }
});