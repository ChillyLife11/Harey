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

const $props = defineProps({ id: String });

const id_hash = generateRandomString();

const { values, setFieldValue, setFieldError, validate } = useForm({
    validationSchema: toTypedSchema(z.object({
        title        : z.string({ required_error: 'Обязательное поле' }).min(1, 'Обязательное поле').min(2, 'Минимум 2 буквы'),
        default_price: z.number().max(1000000),
    }))
});

const title         = useField('title',     null, { validateOnValueUpdate: false });
const default_price = useField('default_price', null, { validateOnValueUpdate: false });

const loading = ref(false);

watch(() => title        .value.value, () => setFieldError('title',          null));
watch(() => default_price.value.value, () => setFieldError('default_price', null));

watch(() => $props.id, new_id => {
    const category = $category_store.list.find(c=>c.id===new_id);

    setFieldValue('title'        , category.title);
    setFieldValue('default_price', category.default_price);
});

function closeDialog() {
    open.value = false;
}

function emptyFields() {
    setFieldValue('title',         '');
    setFieldValue('default_price', '');
}

async function editCat() {
    const { valid } = await validate();
    if (!valid) return;

    loading.value = true;

    try {
        await $category_store.edit($props.id, title.value.value, default_price.value.value);
        notify({ type: "success", title: 'Категория успешно отредактирована', icon: 'alert-check' })
    } catch(e) {
        notify({ type: "error", title: 'Неизвестная ошибка, повторите позже', icon: 'alert-circle' })
    } finally {
        closeDialog();
        emptyFields();
    }
}

</script>

<template>
    <UiDialog
        v-model="open"
        title="Редактировать категорию"
        @closed="emptyFields"
    >
        <form :id="'form-'+id_hash" @submit.prevent="editCat" class="form">
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
            <UiButton prepend-icon="har-close" text="Закрыть" variant="tonal" @click="closeDialog" />
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