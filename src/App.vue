<script lang="ts" setup>
import { useShopStore } from '@/store/shop.ts';
import ShopList from "@/components/shop/ShopList.vue";
import ShopDialogAdd from "@/components/shop/ShopDialogAdd.vue";
import { reactive, ref } from "vue";
// import { shops } from "@/data/shops.ts";
import { IShopItem } from "@/types/shop";

const shopStore = useShopStore()

const addDialogOpen = ref<boolean>();
const selectedShop = reactive<IShopItem>({
    id: null,
    name: null,
});
</script>

<template>
    <div
        class="py-4 text-center text-sky-400 text-2xl font-bold border-b border-b-slate-200"
    >
        Harey
    </div>
    <div class="p-3 py-8">
        <ShopList
            :items="shopStore.list"
            @open-dialog-add="addDialogOpen = true"
        />

        <ShopDialogAdd
            v-if="addDialogOpen"
            v-model="addDialogOpen"
            title="Добавить магазин"
        />
    </div>
</template>
