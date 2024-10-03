<script setup>
import { reactive, onMounted } from "vue";
import { useRouter, useRoute } from 'vue-router';
import { useAccountStore } from "@/store/account.js";
import CoreHashModal from "@/components/core/CoreHashModal.vue";
import CoreNotifications from "@/components/core/CoreNotifications.vue";
import { account } from "@/appwrite.js";

const $router = useRouter();
const $route  = useRoute();

const $account_store  = useAccountStore();

const selectedShop = reactive({
    id: null,
    name: null,
});

onMounted(async () => {
    try {
        await $account_store.init();

        if (window.location.href.includes('signin') || window.location.href.includes('signup')) {
            await $router.push({ name: 'home' });
        }
    } catch {
        await $router.push({ name: 'signin' });
    }
});
</script>

<template>
    <div
        class="header"
    >
        <button v-if="$account_store.authed" class="header__logout" type="button" @click="$account_store.signout"><i class="har har-log-out"></i></button>
        Harey
    </div>
    <div class="main">
        <router-view />
    </div>

    <CoreHashModal />
    <CoreNotifications />
</template>

<style lang="scss" scoped>
.header {
    padding: 16px 0;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
    border-bottom: 1px solid $secondary-300;
    position: relative;

    &__logout {
        position: absolute;
        left: 12px;
        top: 50%;
        transform: translateY(-50%);
        color: $danger-600;
    }
}

.main {
    padding: 32px 12px;
}
</style>