<script setup>
import { ref } from 'vue';
import draggable from 'vuedraggable';

import CategoryItem       from "@/components/category/CategoryItem.vue";
import CategoryDialogAdd  from "@/components/category/CategoryDialogAdd.vue";
import CategoryDialogEdit from "@/components/category/CategoryDialogEdit.vue";

const $props = defineProps({
    items: Array
});

const dialog_add_state  = ref(false);
const dialog_edit_state = ref(false);
const curr_category_id  = ref(null);

function openDialogAdd() {
    dialog_add_state.value = true;
}

function openDialogEdit(category_id) {
    curr_category_id.value = category_id;
    dialog_edit_state.value = true;
}

</script>

<template>
    <div>
        <draggable
            v-model="$props.items"
            :component-data="{
                tag: 'div',
                type: 'transition-group',
            }"
            class="list"
            item-key="id"
        >
            <template #item="{ element }">
                <CategoryItem :title="element.title" :id="element.id" @open-dialog-edit="openDialogEdit(element.id)" />
            </template>
            <template #footer>
                <CategoryItem
                    icon="har-plus-circle"
                    @click="openDialogAdd"
                />
            </template>
        </draggable>


        <CategoryDialogAdd  v-model="dialog_add_state" />
        <CategoryDialogEdit v-model="dialog_edit_state" :id="curr_category_id" />
    </div>
</template>

<style lang="scss" scoped>

.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
}

</style>