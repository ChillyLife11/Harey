<script setup>
import { ref } from 'vue';

import CategoryItem from "@/components/category/CategoryItem.vue";
import CategoryDialogAdd from "@/components/category/CategoryDialogAdd.vue";
import CategoryDialogEdit from "@/components/category/CategoryDialogEdit.vue";

const $props = defineProps({
    items: Array
});

const dialogAddState  = ref(false);
const dialogEditState = ref(false);

const categoryToEditId = ref(null);

function openDialogEdit(id) {
    dialogEditState.value  = true;
    categoryToEditId.value = id;
}

</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <CategoryItem
            v-for="(item, i) in $props.items"
            :key="i"
            :name="item.name"
            :id="item.id"
            @edit-category="openDialogEdit(item.id)"
        />
        <CategoryItem
            icon="asi-plus-circle"
            @click="$emit('openDialogAdd')"
        />
    </div>

    <CategoryDialogAdd v-model="dialogAddState" />
    <CategoryDialogEdit v-model="dialogEditState" :category-id="categoryToEditId" />
</template>
