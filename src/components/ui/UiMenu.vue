<script setup>
import { onMounted, ref } from "vue";
import { useFloating } from "@floating-ui/vue";

const open = defineModel({ type: Boolean, default: false });

const reference = ref(null);
const floating = ref(null);

const { floatingStyles } = useFloating(reference, floating);

function toggleMenu() {
    console.log(1111);
    open.value = !open.value;
}

onMounted(() => {
    document.addEventListener('click', e => {
        if (
            e.target !== reference.value
            && e.composedPath().includes(reference.value)
            && e.target !== floating.value
            && e.composedPath().includes(floating.value)
        ) return;

        open.value = false;
    });
});

</script>

<template>
    {{ open }}
    <slot name="trigger" ref="reference" @click="toggleMenu" />
<!--    <Transition-->
<!--        enter-active-class="animate__animated animate__flipX"-->
<!--        leave-active-class="animate__animated animate__flipOut"-->
<!--    >-->
<!--        <slot v-if="open" ref="floating" :style="floatingStyles" />-->
<!--    </Transition>-->
</template>