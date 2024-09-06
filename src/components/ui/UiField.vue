<script setup>
import { useAttrs } from "vue";

const value = defineModel();

const $props = defineProps({
    label       : String,
    prepend_icon: String,
    errorMessage: String,
    horizontal: {
        type   : Boolean,
        default: false
    }
});

const $attrs = useAttrs();

</script>

<template>
    <div :class="{ 'field--direction-horizontal': $props.horizontal, 'field--error': $props.errorMessage }" class="field">
        <label class="field__label">{{ $props.label }}</label>
        <div class="field__main">
            <span v-if="$props.prepend_icon">
                <i class="har-mail-circle"></i>
            </span>
            <input v-bind="$attrs" v-model="value" class="field__inp">
        </div>
        <div v-if="$props.errorMessage" class="field__error">{{ $props.errorMessage }}</div>
    </div>
</template>

<style lang="scss" scoped>

.field {
    position: relative;

    &--direction-horizontal {
        display: flex;
        align-items: center;
    }

    &--direction-horizontal &__label {
        width: 128px;
    }
    &__label {
        display: block;
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 14px;
    }

    &__inp {
        display: block;
        box-sizing: border-box;
        width: 100%;
        border: 1px solid $secondary-400;
        height: 36px;
        padding-left: 12px;
        padding-right: 12px;
        border-radius: 4px;
        font-size: 14px;
    }

    &__main {
        display: flex;
        align-items: center;
        flex-grow: 1;
    }

    &__error {
        font-size: 12px;
        color: $danger-600;
        margin-top: 4px;
    }

    &--error &__inp {
        border-color: $danger-600;
        &:focus-visible {
            outline: 3px solid $danger-200;
        }
    }
}

</style>