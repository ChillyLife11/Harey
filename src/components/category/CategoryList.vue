<script setup>
import CategoryItem from "@/components/category/CategoryItem.vue";

const $emit = defineEmits(["openDialogAdd"]);

const $props = defineProps({
    items: Array
});
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <CategoryItem
            v-for="(item, i) in $props.items"
            :key="i"
            :name="item.name"
        />
        <CategoryItem
            icon="asi-plus-circle"
            @click="$emit('openDialogAdd')"
        />
    </div>
</template>
