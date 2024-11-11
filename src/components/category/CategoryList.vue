<script setup>
import { onMounted, ref, watch } from "vue";
import draggable from "vuedraggable";
import { databases } from "@/appwrite.js";
import { APPWRITE } from "@/config.js";

import CategoryItem from "@/components/category/CategoryItem.vue";
import CategoryDialogEdit from "@/components/category/CategoryDialogEdit.vue";

const $props = defineProps({
    items: Array,
});

const local_items = ref([]);

const dialog_edit_state = ref(false);
const curr_category_id  = ref(null);

watch(() => $props.items, fillItems);

onMounted(fillItems);

function openDialogEdit(category_id) {
    curr_category_id .value = category_id;
    dialog_edit_state.value = true;
}

function fillItems() { local_items.value = [...$props.items]; }

async function onChange({ moved }) {
    const category_id    = moved.element.$id;
    const new_index      = moved.newIndex < local_items.value.length ? moved.newIndex : moved.newIndex - 1;
    const old_index      = moved.oldIndex;
    const is_moving_down = new_index > old_index;

    local_items.value[new_index].sort = is_moving_down
                                        ? local_items.value.length - new_index
                                        : local_items.value[new_index+1].sort;
    for (
        let a = (is_moving_down ? old_index : new_index);
            a < (is_moving_down ? new_index : old_index);
            a++
    ) {
        if (is_moving_down) local_items.value[a].sort++;
        else {
            if (local_items.value[a+1]) local_items.value[a+1].sort--;
        }
    }

    try {
        await databases.updateDocument(
            APPWRITE.DB_ID,
            APPWRITE.CATEGORIES_ID,
            category_id,
            {
                sort: local_items.value[new_index].sort
            }
        );

        for (
            let a = is_moving_down ? old_index : new_index;
                a < is_moving_down ? new_index : old_index;
                a++
        ) {
            await databases.updateDocument(
                APPWRITE.DB_ID,
                APPWRITE.CATEGORIES_ID,
                local_items.value[a+1].$id,
                {
                    sort: is_moving_down ? local_items.value[a].sort : local_items.value[a+1].sort
                }
            );
        }
    } catch (e) {

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
                    <CategoryItem
                        :id="element.$id"
                        :title="element.title"
                        @open-dialog-edit="openDialogEdit(element.id)"
                    />
                </div>
            </template>
        </draggable>

        <CategoryDialogEdit
            v-model="dialog_edit_state"
            :id="curr_category_id"
        />
    </div>
</template>

<style lang="scss" scoped>
.list {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 8px;
}
</style>