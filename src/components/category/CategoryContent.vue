<script setup>
import { useCategoryStore } from "@/store/category.js";
import CategoryList from "@/components/category/CategoryList.vue";
import { onMounted, ref } from "vue";
import { UiButton, UiMenu, UiList } from "@/components/ui/index.js";
import CategoryDialogAdd from "@/components/category/CategoryDialogAdd.vue";
import { databases } from "@/appwrite.js";
import { Query } from "appwrite";

const $category_store = useCategoryStore();

const additional_category_menu = ref(false);
const category_add_dialog      = ref(false);

onMounted(() => $category_store.getList());
</script>

<template>
    <div class="categories">
        <div class="categories__top">
            <div class="subtitle">Категории</div>
            <UiMenu v-model="additional_category_menu" placement="bottom-end">
                <template #trigger="{ props }">
                    <UiButton v-bind="props" :ref="ref" variant="ghost" color="secondary" icon="har-menu-dots" />
                </template>

                <UiList :items="[
                    {
                        title       : 'Добавить',
                        prepend_icon: 'har-plus',
                        onclick     : () => category_add_dialog = true
                    },
                    {
                        title       : 'Удалить все',
                        prepend_icon: 'har-close',
                        color       : 'danger',
                        onclick    : $category_store.deleteAll,
                        show_cond   : $category_store.list.length
                    },
                ]" />
            </UiMenu>
        </div>
        <CategoryList v-if="$category_store.list.length" :items="$category_store.list" />
        <div v-else class="empty">
            <div class="empty__title">Нет добавленных категорий</div>
            <ui-button text="Добавить" class="empty__btn" @click="category_add_dialog = true" />
        </div>
    </div>

    <CategoryDialogAdd v-model="category_add_dialog" />
</template>

<style lang="scss" scoped>

.categories {
    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 20px;
    }
}

</style>