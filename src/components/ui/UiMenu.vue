<script setup>
import { onMounted, onUpdated, ref, watch } from "vue";
import { generateRandomString } from "@/utils/helpers.js";
import { computePosition, offset, autoUpdate } from "@floating-ui/dom";

const open = defineModel({ type: Boolean, default: false });

const $props = defineProps({
    placement: {
        type   : String,
        default: 'bottom',
        validator(v) {
            return ['top', 'top-start', 'top-end', 'right', 'right-start', 'right-end', 'bottom', 'bottom-start', 'bottom-end', 'left', 'left-start', 'left-end'].includes(v);
        }
    },
    closeOnContentClick: {
        type   : Boolean,
        default: true
    }
})

const id = ref(generateRandomString(5));

function toggleMenu() { open.value = !open.value; }

watch(open, newVal => {
    if (newVal) document.addEventListener(   "click", listener);
    else        document.removeEventListener("click", listener);

    function listener(e) {
        const trigger  = document.querySelector(`[data-menu-target="${id.value}"]`);
        const floating = document.querySelector(`[data-menu="${id.value}"]`);

        if (
            e.target === trigger ||
            e.composedPath().includes(trigger) ||
            (
                $props.closeOnContentClick ? false : (e.target === floating || e.composedPath().includes(floating))
            )
        ) return;

        open.value = false;
    }
});

onUpdated(() => {
    const trigger  = document.querySelector(`[data-menu-target="${id.value}"]`);
    const floating = document.querySelector(`[data-menu="${id.value}"]`);

    autoUpdate(trigger, floating, () => {
        computePosition(
            trigger,
            floating,
            {
                placement: $props.placement,
            }
        ).then(({ x, y }) => {
            Object.assign(floating.style, {
                left: `${ x }px`,
                top:  `${ y }px`,
            })
        })
    })
});

</script>

<template>
    <slot name="trigger" :props="{ 'data-menu-target': id, onclick: toggleMenu }" />
    <Transition
        enter-active-class="animate__animated animate__fadeIn animate__faster"
        leave-active-class="animate__animated animate__fadeOut animate__faster"
    >
        <div v-if="open" :data-menu="id" class="floating">
            <slot :active="!!open" />
        </div>
    </Transition>
</template>

<style lang="scss">
.floating {
    isolation: isolate;
    width: max-content;
    position: absolute;
    background-color: white;
    border: 1px solid $secondary-50;
    z-index: 2;
    padding: 4px;
    border-radius: 8px;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1);
}
</style>