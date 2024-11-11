<script setup>

import { computed, reactive, ref } from "vue";

const $props = defineProps({
    text:        { type: String, },
    icon:        { type: String, default: null },
    prependIcon: { type: String, default: null },
    appendIcon:  { type: String, default: null },

    active  : { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
    loading : { type: Boolean, default: false },

    size: {
        type   : String,
        default: 'default',
        validator(value, props) {
            return ['sm', 'default', 'lg'].includes(value)
        }
    },
    color: {
        type   : String,
        default: 'primary',
        validator(value) {
            return ['primary', 'secondary', 'warning', 'danger', 'success', 'info'].includes(value)
        }
    },
    variant: {
        type   : String,
        default: 'default',
        validator(value) {
            return ['default', 'tonal', 'ghost', 'outlined', 'link'].includes(value)
        }
    },
});

const waveColor = computed(() => {
    if ($props.variant === 'default') return 'white';
    if ($props.variant === 'tonal')   return 'black';
});

</script>

<template>
    <button
        :class="[
            'btn',
            'btn--color-' + $props.color,
            'btn--variant-' + $props.variant,
            'btn--size-' + $props.size,
            { 'btn--icon': $props.icon, 'btn--active': $props.active, 'btn--disabled': $props.disabled || $props.loading }
        ]"
        type="button"
        v-wave="$props.variant === 'link' ? false : { initialOpacity: 0.7 }"
    >
        <span class="btn__prepend">
            <i v-if="$props.prependIcon" class="har" :class="$props.prependIcon"></i>
            <slot name="prepend" />
        </span>
        <div class="btn__content">
            <slot v-if="!$props.icon && !$props.text"></slot>
            <span v-if="$props.loading" class="btn__loader">
                <i class="har har-loading"></i>
            </span>
            <i v-if="$props.icon && !$props.text" class="har" :class="$props.icon"></i>
            <template v-else>{{ $props.text }}</template>
        </div>
        <span class="btn__append">
            <slot name="append" />
            <i v-if="$props.appendIcon" class="har" :class="$props.appendIcon"></i>
        </span>
    </button>
</template>

<style lang="scss" scoped>

$icon_size: 16px;

.btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: .25s;
    position: relative;

    &--size {
        &-default {
            height: 36px;
            padding: 0 16px;
            border-radius: 4px;
            font-size: 14px;

            .btn__prepend, .btn__append { font-size: 16px }
        }
    }
    &--icon {
        width: 32px;
        height: 32px;
        border-radius: 6px;

        .btn__content { font-size: 20px }
    }

    &--variant-default {
        &.btn--color-primary   {
            background-color: $primary-700;
            color: #fff;
            &:focus { background-color: $primary-600; }
        }
        &.btn--color-secondary {
            background-color: $secondary-700;
            color: #fff;
            &:focus { background-color: $secondary-600; }
        }
        &.btn--color-danger    {
            background-color: $danger-700;
            color: #fff;
            &:focus { background-color: $danger-600; }
        }
        &.btn--color-warning   {
            background-color: $warning-700;
            color: #fff;
            &:focus { background-color: $warning-600; }
        }
    }
    &--variant-default &__content {
        color: #fff;
        i { color: #fff; }
    }

    &--variant-tonal {
        &.btn--color-primary   {
            background-color: $primary-100;
            color: $primary-700;
            &:focus { background-color: $primary-200; }
        }
        &.btn--color-secondary {
            background-color: $secondary-100;
            color: $secondary-700;
            &:focus { background-color: $secondary-300; }
        }
        &.btn--color-danger    {
            background-color: $danger-100;
            color: $danger-700;
            &:focus { background-color: $danger-300; }
        }
        &.btn--color-warning   {
            background-color: $warning-100;
            color: $warning-700;
            &:focus { background-color: $warning-300; }
        }
    }

    &--variant-ghost {
        &.btn--color-primary   {
            background-color: transparent;
            color: $primary-700;
            &:focus { background-color: $primary-100; }
        }
        &.btn--color-secondary {
            background-color: transparent;
            color: $secondary-500;
            &:focus { background-color: $secondary-100; }
        }
        &.btn--color-danger    {
            background-color: transparent;
            color: $danger-700;
            &:focus { background-color: $danger-100; }
        }
        &.btn--color-warning   {
            background-color: transparent;
            color: $warning-700;
            &:focus { background-color: $warning-100; }
        }
    }

    &--variant-link {
        height: unset;
        padding: 0;

        &.btn--color-primary {
            color: $primary-700;
        }
    }

    &--disabled {
        pointer-events: none;
        opacity: .6;
    }

    &__content {
        flex-grow: 1;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    &__prepend, &__append {
        flex-shrink: 0;
        display: flex;
        align-items: center;

        i { display: block; }
    }

    &__prepend:has(*) { margin-right: 8px; }
    &__append:has(*)  { margin-left:  8px; }

    &__loader {
        display: block;
        margin-right: 8px;
        animation: fullRotateAnim 1.5s linear infinite;
        font-size: 16px;

        i {
            display: block;
        }
    }
}

</style>