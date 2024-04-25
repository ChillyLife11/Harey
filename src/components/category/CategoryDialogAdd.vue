<script setup>
import Button from "@/components/ui/UiButton.vue";
import { useCategoryStore } from '@/store/category.js';
import { reactive } from "vue";

const open = defineModel();

const categoryStore = useCategoryStore();

const fields = reactive([
    {
        label: 'Название',
        name:  'name',
        modelValue: '',
        rules: [v => (v.length > 2 || 'Ошибка')]
    }
])

function onSubmit() {
    categoryStore.add(values.name, values.default_cost);
    open.value = false;
}
</script>

<template>
    <div class="sm:max-w-[425px]">
        Добавить категорию
        <form @submit.prevent="onSubmit" class="flex flex-col space-y-4">
            <div class="space-y-2">
                <div v-for="(field, i) in fields" :key="i">
                    <label>{{ field.label }}</label>
                    <input type="text" v-model="field.modelValue" placeholder="Шоколадная Фантазия" />
                </div>
            </div>
            <div>
                <Button type="submit"> Добавить </Button>
            </div>
        </form>
    </div>
</template>
