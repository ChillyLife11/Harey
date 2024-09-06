<script setup>
import { useCategoryStore } from "@/store/category.js";
import CategoryList         from "@/components/category/CategoryList.vue";
import { onMounted } from "vue";

const $category_store = useCategoryStore();

onMounted(() => $category_store.getList());
</script>

<template>
    <CategoryList
        :items="$category_store.list"
    />
</template>