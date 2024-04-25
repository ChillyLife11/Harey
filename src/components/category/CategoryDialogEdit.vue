<script setup>
import UiButton from "@/components/ui/UiButton.vue";
import { useCategoryStore } from "@/store/category.js";
import { ref, watch } from "vue";

const $props = defineProps({
    categoryId: String
});

const categoryStore = useCategoryStore();

const open = defineModel();

const currCategory = ref({});

watch(
    () => $props.categoryId,
    id => currCategory.value = categoryStore.list.find(c => c.id === id),
    { immediate: true }
);


function onSubmit() {
    handleSubmit((values, actions) => {
        console.log(values);
    });
}
</script>

<template>
    <div>
        <div class="sm:max-w-[425px]">
            Редактировать категорию
            <form
                class="flex flex-col space-y-4"
                @submit.prevent="onSubmit"
            >
                <div class="space-y-2">
                    <div>
                        <label>Название</label>
                        <input type="text" placeholder="Шоколадная Фантазия" />
                    </div>
                    <div>
                        <label>Цена по умолчанию</label>
                        <input type="number" placeholder="2000 ₽" />
                    </div>
                </div>
                <div>
                    <UiButton type="submit"> Редактировать</UiButton>
                </div>
            </form>
        </div>
    </div>
</template>
