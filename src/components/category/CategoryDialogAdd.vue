<script setup>
import { UiButton, UiDialog, UiField } from "@/components/ui/index.js";
import { useCategoryStore } from '@/store/category.js';
import { watch, ref } from "vue";
import { generateRandomString } from "@/utils/helpers.js";
import { useForm, useField } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from 'zod';
import { useNotifications } from "@/composables/useNotifications.js";

const $category_store = useCategoryStore();
const { notify } = useNotifications();

const open = defineModel({ type: Boolean, default: false });

const id_hash = generateRandomString();

const { values, setFieldValue, setFieldError, validate } = useForm({
    validationSchema: toTypedSchema(z.object({
        title         : z.string({ required_error: 'Обязательное поле' }).min(1, 'Обязательное поле').min(2, 'Минимум 2 буквы'),
        default_price: z.string().max(10),
    }))
});

const title         = useField('title',     null, { validateOnValueUpdate: false });
const default_price = useField('default_price', null, { validateOnValueUpdate: false });

const loading = ref(false);

watch(() => title        .value.value, () => setFieldError('title',          null));
watch(() => default_price.value.value, () => setFieldError('default_price', null));

function closeDIalog() {
    open.value = false;
}

function emptyFields() {
    setFieldValue('title',         '');
    setFieldValue('default_price', '');
}

async function createCat() {
    const { valid } = await validate();
    if (!valid) return;

    loading.value = true;

    try {
        await $category_store.add(title.value.value, default_price.value.value);
        notify({ type: "success", title: 'Категория успешно добавлена', icon: 'alert-check' })
    } catch(e) {
        notify({ type: "error", title: 'Неизвестная ошибка, повторите позже', icon: 'alert-circle' })
    } finally {
        closeDIalog();
        emptyFields();
    }
}

</script>

<template>
    <UiDialog
        v-model="open"
        title="Добавить категорию"
        @closed="console.log('Empty fields')"
    >
        <form :id="'form-'+id_hash" @submit.prevent="createCat" class="form">
            <UiField
                v-model="title.value.value"
                :error-message="title.errorMessage.value"
                name="title"
                label="Название"
                placeholder="Сладкая фантазия"
            />
            <UiField
                v-model="default_price.value.value"
                :error-message="default_price.errorMessage.value"
                name="default_price"
                label="Цена по умолчанию (не обязательно)"
                placeholder="1000"
            />
        </form>
        <template #footer>
            <UiButton prepend-icon="har-close" text="Закрыть" variant="tonal" @click="closeDIalog" />
            <UiButton type="submit" prepend-icon="har-check" text="Подтвердить" :form="'form-'+id_hash" />
        </template>
    </UiDialog>
</template>

<style lang="scss" scoped>

.form {
    display: flex;
    flex-direction: column;

    > *:not(:first-child) {
        margin-top: 16px;
    }
}

</style>