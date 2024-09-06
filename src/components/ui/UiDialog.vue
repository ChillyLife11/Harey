<script setup>
import { ref } from "vue";
import { UiButton } from "@/components/ui/index.js";

const open = defineModel({ type: Boolean, default: false });

const $emit = defineEmits(['closed']);

const $props = defineProps({
    width: {
        type: Number,
        default: 500,
    },
    title: String,
});

function closeDialog() {
    open.value = false;
}

// watch(open, )

</script>

<template>

    <Transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
        @after-leave="$emit('closed')"
    >
        <div v-if="open" class="dialog" :class="{ 'dialog--active': open }">
            <div class="dialog__backdrop" @click="closeDialog"></div>
            <div class="dialog__content" :style="{ 'max-width': $props.width + 'px' }">
                <div class="dialog__header">
                    <slot name="header">
                        <div class="dialog__title">{{ $props.title }}</div>
                    </slot>
                    <UiButton variant="ghost" color="secondary" icon="har-close" class="dialog__close" @click="closeDialog" />
                </div>
                <div class="dialog__body">
                    <slot></slot>
                </div>
                <div class="dialog__footer">
                    <slot name="footer"></slot>
                </div>
            </div>
        </div>
    </Transition>

</template>

<style lang="scss" scoped>

.dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100dvh;
    display: none;
    align-items: center;
    justify-content: center;

    &--active { display: flex; }

    &__backdrop {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-color: rgba(black, .6);
    }

    &__content {
        width: calc(100% - 24px);
        box-sizing: border-box;
        background-color: #fff;
        position: relative;
        padding: 24px;
        border-radius: 8px;

        > *:not(:first-child) { margin-top: 16px; }
    }

    &__header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    &__title {
        font-size: 18px;
        font-weight: 600;
        letter-spacing: -0.025em;
        line-height: 1;
    }

    &__close {
        position: absolute;
        right: 16px;
        top: 16px;
    }

    &__body {
        padding: 24px 0;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: flex-end;

            :deep(> *) {
                flex-grow: 1;
                flex-basis: 0;

                &:not(:last-child) {
                    margin-right: 12px;
                }
            }
    }
}

</style>