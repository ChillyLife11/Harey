<script setup>

import { useNotifications } from "@/composables/useNotifications.js";

const { contents, removeNotification } = useNotifications();

</script>

<template>
    <div class="notifications">
        <div v-for="content in contents" :class="'notification--' + content.type" class="notification">
            <span class="notification__icon">
                <i :class="['har', 'har-'+content.icon]"></i>
            </span>
            <div class="notification__text">
                <div class="notification__top">
                    <div class="notification__title">{{ content.title }}</div>
                    <button type="button" class="notification__close" @click="removeNotification(content.id)"><i class="har har-close"></i></button>
                </div>
                <div class="notification__descr">{{ content.description }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notifications {
    position: fixed;
    left: 12px;
    bottom: 12px;
    width: calc(100% - 24px);

    > *:not(:last-child) {
        margin-bottom: 6px;
    }
}

.notification {
    display: flex;
    align-items: flex-start;
    border-radius: 4px;
    padding: 6px 12px;

    &--success {
        background-color: $success-200;
        color: $success-600;
    }
    &--error {
        background-color: $danger-200;
        color: $danger-600;
    }

    &__title {
        font-size: 18px;
        flex-grow: 1;
    }

    &__top {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__icon {
        font-size: 18px;
        flex-shrink: 0;
        margin-right: 8px;
    }
    &__close {
        font-size: 18px;
        flex-shrink: 0;
        margin-left: 8px;
        margin-top: 2px;
    }

    &__text {
        flex-grow: 1;
    }

    &__descr {
        font-size: 12px;
    }
}
</style>