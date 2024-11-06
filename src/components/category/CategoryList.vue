<script setup>
import { ref, watch } from "vue";
import draggable from 'vuedraggable';

import CategoryItem       from "@/components/category/CategoryItem.vue";
import CategoryDialogAdd  from "@/components/category/CategoryDialogAdd.vue";
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

function onChange({ moved }) {
    console.log(props.moved.newIndex, props.moved.oldIndex, props.moved.element.id);

    if (moved.newIndex > moved.oldIndex) {
        const diff = moved.newIndex - moved.oldIndex;
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
                    <CategoryItem :title="element.title" :id="element.id" @open-dialog-edit="openDialogEdit(element.id)" />
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