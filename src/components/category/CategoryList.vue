<script setup>
import { ref, watch } from "vue";
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
    const category_id = moved.element.$id;

    local_items.value[moved.newIndex].sort = local_items.value.length - moved.newIndex;

    if (moved.newIndex > moved.oldIndex) {
        for (let a = moved.oldIndex; a < moved.newIndex; a++) {
            local_items.value[a].sort++;
        }
    } else {
        for (let a = moved.newIndex; a < moved.oldIndex; a++) {
            local_items.value[a + 1].sort--;
        }
    }

    try {
        await databases.updateDocument(
            APPWRITE.DB_ID,
            APPWRITE.CATEGORIES_ID,
            category_id,
            {
                sort: local_items.value[moved.newIndex].sort
            }
        );

        if (moved.newIndex > moved.oldIndex) {
            for (let a = moved.oldIndex; a < moved.newIndex; a++) {
                await databases.updateDocument(
                    APPWRITE.DB_ID,
                    APPWRITE.CATEGORIES_ID,
                    local_items.value[a].$id,
                    {
                        sort: local_items.value[a].sort
                    }
                );
            }
        } else {
            for (let a = moved.newIndex; a < moved.oldIndex; a++) {
                await databases.updateDocument(
                    APPWRITE.DB_ID,
                    APPWRITE.CATEGORIES_ID,
                    local_items.value[a].$id,
                    {
                        sort: local_items.value[a].sort
                    }
                );
            }
        }
    } catch (e) {
        console.log(e);
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