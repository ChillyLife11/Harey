<script setup>
import { useCategoryStore }  from '@/store/category.ts';
import CategoryList      from "@/components/category/CategoryList.vue";
import CategoryDialogAdd from "@/components/category/CategoryDialogAdd.vue";
import { reactive, ref } from "vue";

const shopStore = useCategoryStore()

const addDialogOpen = ref();
const selectedShop = reactive({
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
        <CategoryList
            :items="shopStore.list"
            @open-dialog-add="addDialogOpen = true"
        />

        <CategoryDialogAdd
            v-if="addDialogOpen"
            v-model="addDialogOpen"
            title="Добавить магазин"
        />
    </div>
</template>
