<script setup>
import { ref } from "vue";
import { UiMenu, UiButton, UiList } from "@/components/ui/index.js";
import { useCategoryStore } from '@/store/category.js';
import { useNotifications } from "@/composables/useNotifications.js";

const $emit = defineEmits(['openDialogEdit', 'deleteCategory']);

const $category_store = useCategoryStore();
const { notify } = useNotifications();

const $props = defineProps({
    id   : String,
    title: String,
    icon : String
});

const opened_menu = ref(false);

function openDialogEdit() {

    $emit('openDialogEdit');
}
function deleteCategory() {
    try {
        $category_store.delete($props.id);
        notify({ type: 'success', title: 'Категория успешно удалена', icon: 'check' });
    } catch (e) {
        notify({ type: 'error', title: e, icon: 'alert-circle' });
    }
}

</script>

<template>
    <div class="card">
        <div v-if="$props.title" class="card__top-actions">
            <UiMenu v-model="opened_menu" placement="bottom-end">
                <template #trigger="{ props }">
                    <UiButton v-bind="props" :ref="ref" variant="ghost" color="secondary" icon="har-menu-dots" />
                </template>

                <UiList :items="[
                    {
                        title       : 'Редактировать',
                        prepend_icon: 'har-edit',
                        onclick     : openDialogEdit
                    },
                    {
                        title       : 'Удалить',
                        prepend_icon: 'har-trash',
                        color       : 'danger',
                        onclick     : deleteCategory
                    },
                ]" />
            </UiMenu>
<!--            <Button v-wave="{ color: 'black' }" :variant="opened_menu ? 'secondary' : 'ghost'" size="icon"><i class="har har-menu-dots"></i></Button>-->
        </div>
        {{ $props.title }}
        <template v-if="$props.icon"><i class="har card__plus" :class="[$props.icon, $props.title ? 'mt-2' : '']"></i></template>
    </div>
</template>

<style lang="scss" scoped>

.card {
    position: relative;
    aspect-ratio: 4 / 3;
    color: $secondary-400;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 600;
    border: 1px solid $secondary-200;
    font-size: 16px;
    border-radius: 6px;

    &__top-actions {
        position: absolute;
        right: 8px;
        top: 8px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    &__plus {
        font-size: 24px;
    }
}

</style>