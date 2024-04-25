<script setup>

import { computed } from "vue";

const $props = defineProps({
    text: {
        type: String,
    },
    icon: {
        type: String,
        default: null
    },
    size: {
        type: String,
        default: 'default',
        validator(value, props) {
            return ['sm', 'default', 'lg'].includes(value)
        }
    },
    color: {
        type: String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary', 'warning', 'danger', 'success', 'info'].includes(value)
        }
    },
    variant: {
        type: String,
        default: 'default',
        validator(value) {
            return ['default', 'tonal', 'ghost', 'outlined'].includes(value)
        }
    },
    prependIcon: {
        type: String,
        default: null
    },
    appendIcon: {
        type: String,
        default: null
    },
});

const waveColor = computed(() => {
    if ($props.variant === 'default') return 'white';
    if ($props.variant === 'tonal') return 'black';
});

</script>

<template>
    <button
        :class="[
            'ui-btn--color-' + $props.color,
            'ui-btn--variant-' + $props.variant,
            { 'ui-btn--icon': $props.icon }
        ]"
        class="ui-btn"
        type="button"
        v-wave="{
            initialOpacity: 0.7
        }"
    >
        <div class="ui-btn__content">
            <i v-if="$props.icon" class="asi" :class="$props.icon"></i>
        </div>
    </button>
</template>

<style lang="less" scoped>

.ui-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .25s;

    @apply h-9 px-4 rounded-lg;

    &--icon {
        @apply w-9 px-0;
    }

    &--color {
        &-primary {

        }
        &-secondary {
            color: theme('colors.secondary.700');
        }
        &-danger {
            color: theme('colors.danger.700');
        }
        &-warning {
            color: theme('colors.warning.700');
        }
    }
    &--variant-default {
        &.ui-btn--color-primary   { background-color: theme('colors.primary.700');   color: #fff; &:hover { background-color: theme('colors.primary.600');   } }
        &.ui-btn--color-secondary { background-color: theme('colors.secondary.700'); color: #fff; &:hover { background-color: theme('colors.secondary.600'); } }
        &.ui-btn--color-danger    { background-color: theme('colors.danger.700');    color: #fff; &:hover { background-color: theme('colors.danger.600');    } }
        &.ui-btn--color-warning   { background-color: theme('colors.warning.700');   color: #fff; &:hover { background-color: theme('colors.warning.600');   } }
    }
    &--variant-default &__content {
        color: #fff;
        i {
            color: #fff;
        }
    }

    &--variant-tonal {
        &.ui-btn--color-primary   { background-color: theme('colors.primary.100');   color: theme('colors.primary.700');   &:hover { background-color: theme('colors.primary.300') } }
        &.ui-btn--color-secondary { background-color: theme('colors.secondary.100'); color: theme('colors.secondary.700'); &:hover { background-color: theme('colors.secondary.300') } }
        &.ui-btn--color-danger    { background-color: theme('colors.danger.100');    color: theme('colors.danger.700');    &:hover { background-color: theme('colors.danger.300') } }
        &.ui-btn--color-warning   { background-color: theme('colors.warning.100');   color: theme('colors.warning.700');   &:hover { background-color: theme('colors.warning.300') } }
    }

    &--variant-ghost {
        &.ui-btn--color-primary   { background-color: transparent; color: theme('colors.primary.700');   &:hover { background-color: theme('colors.primary.100'); } }
        &.ui-btn--color-secondary { background-color: transparent; color: theme('colors.secondary.700'); &:hover { background-color: theme('colors.secondary.100'); } }
        &.ui-btn--color-danger    { background-color: transparent; color: theme('colors.danger.700');    &:hover { background-color: theme('colors.danger.100'); } }
        &.ui-btn--color-warning   { background-color: transparent; color: theme('colors.warning.700');   &:hover { background-color: theme('colors.warning.100'); } }
    }

    &__content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
}

</style>