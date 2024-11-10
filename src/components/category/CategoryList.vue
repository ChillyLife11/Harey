<script setup>
import { nextTick, ref, watch } from "vue";
import draggable from 'vuedraggable';
import { databases } from "@/appwrite.js";
import { APPWRITE } from "@/config.js";

import CategoryItem       from "@/components/category/CategoryItem.vue";
import CategoryDialogEdit from "@/components/category/CategoryDialogEdit.vue";

const $props = defineProps({
    items: Array,
});

const local_items = ref([]);

const dialog_edit_state = ref(false);
const curr_category_id  = ref(null);

watch(() => $props.items, new_items => local_items.value = [...new_items]);

function openDialogEdit(category_id) {
    curr_category_id .value = category_id;
    dialog_edit_state.value = true;
}

async function onChange({ moved }) {
    console.log(moved);

    const category_id = moved.element.$id;
    const new_index   = moved.newIndex < local_items.value.length ? moved.newIndex : local_items.value.length - 1;
    const old_index   = moved.oldIndex;

    local_items.value[new_index].sort = local_items.value.length - new_index;

    const isMovingDown = new_index > old_index;
    const updatePromises = [];

    const start = isMovingDown ? old_index : new_index;
    const end = isMovingDown ? new_index : old_index;
    const step = isMovingDown ? 1 : -1;

    for (let i = start; (isMovingDown ? i < end : i > end); i += step) {
        local_items.value[i].sort += step;
        updatePromises.push(
            databases.updateDocument(
                APPWRITE.DB_ID,
                APPWRITE.CATEGORIES_ID,
                local_items.value[i].$id,
                { sort: local_items.value[i].sort }
            )
        );
    }

    updatePromises.push(
        databases.updateDocument(
            APPWRITE.DB_ID,
            APPWRITE.CATEGORIES_ID,
            category_id,
            { sort: local_items.value[new_index].sort }
        )
    );

    try {
        await Promise.all(updatePromises);
    } catch (e) {
        console.error('Error updating documents:', e);
    }
}

</script>

<template>
    <div>
        <draggable
            v-model="local_items"
            :component-data="{
                tag: 'div',
                type: 'transition-group',
            }"
            class="list"
            item-key="id"
            animation="200"
            @change="onChange"
        >
            <template #item="{ element }">
                <div>
<!--                    sort: {{ element.sort }}-->
                    <CategoryItem :id="element.$id" :title="element.title" @open-dialog-edit="openDialogEdit(element.id)" />
                </div>
            </template>
        </draggable>


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