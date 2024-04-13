import { IShopItem } from '@/types/shop';
import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
    state: () => ({
        list: [
            {
                id: 1,
                name: 'Ninja food',
            },
            {
                id: 3,
                name: 'Пятерочка',
            },
            {
                id: 10,
                name: 'Автобус',
                default_price: 27
            },
        ] as IShopItem[]
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