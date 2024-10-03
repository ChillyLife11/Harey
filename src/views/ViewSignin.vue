<script setup>
import { useField, useForm } from "vee-validate";
import { UiButton, UiField } from "@/components/ui/index.js";
import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';
import { ref, watch } from "vue";
import { ERRORS } from "@/constants.js";
import { useRouter } from "vue-router";
import { useNotifications } from "@/composables/useNotifications.js";
import { useAccountStore } from "@/store/account.js";
// import { nhost } from "@/nhost.js";

const $router        = useRouter();
const $notification  = useNotifications();
const $account_store = useAccountStore();

const { values, setFieldError, validate } = useForm({
    validationSchema: toTypedSchema(z.object({
        email   : z.string({ required_error: 'Обязательное поле' }).min(1, 'Обязательное поле').email('Некорректная почта'),
        password: z.string({ required_error: 'Обязательное поле' }).min(1, 'Обязательное поле').min(6, 'Минимум 6 символов').max(64, 'Максимум 64 символа'),
    }))
});

const email    = useField('email',    null, { validateOnValueUpdate: false });
const password = useField('password', null, { validateOnValueUpdate: false });

const loading = ref(false);

watch(() => email   .value.value, () => setFieldError('email',    null));
watch(() => password.value.value, () => setFieldError('password', null));

async function signin(values) {
    const { valid } = await validate();
    if (!valid) return;

    loading.value = true;

    try {
        await $account_store.signin(email.value.value, password.value.value);
        await $router.push({ name: 'home' });
        $notification.notify({ type: 'success', icon: 'check', title: 'Отлично!', description: 'Вы успешно вошли в аккаунт' });
    } catch(e) {
        $notification.notify({ type: 'error', icon: 'alert-circle', title: e.message });
    } finally {
        loading.value = false;
    }

}

</script>

<template>
    <h1 class="title">Войти</h1>

    <form class="form" novalidate @submit.prevent="signin">
        <UiField
            v-model="email.value.value"
            :error-message="email.errorMessage.value"
            name="email"
            label="Почта"
            placeholder="example@mail.ru"
        />
        <UiField
            v-model="password.value.value"
            :error-message="password.errorMessage.value"
            name="password"
            label="Пароль"
            placeholder="********"
            type="password"
        />
        <UiButton :loading="loading" type="submit" text="Войти" />

        <div class="form__additional">
            Нет аккаунта? <router-link :to="{ name: 'signup' }">Зарегистрируйтесь!</router-link>
        </div>
    </form>
</template>

<style lang="scss" scoped>

.form {
    margin-top: 20px;

    > *:not(:first-child) { margin-top: 12px; }

    .btn { margin-top: 20px; width: 100%; }

    &__additional {
        text-align: center;
        a {
            color: $primary-600;
            text-decoration: underline;
        }
    }
}

</style>