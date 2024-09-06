<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed, reactive, ref, watch } from "vue";
import CategoryDialogEdit from "@/components/category/CategoryDialogEdit.vue";

const MODALS_MAP = new Map([
    [
        '#category.edit',
        { component: CategoryDialogEdit, events: { closed: () => onClosed() } }
    ]
]);

const $route  = useRoute();
const $router = useRouter();

const dialog     = ref(null);
const hash       = ref(null);
const hashParams = ref(null);

const activeDialog = computed(() => hash.value ? MODALS_MAP.get(hash.value) : null);

watch(
    () => $route.hash,
    value => {
        dialog.value     = false;
        hash.value       = null;
        hashParams.value = null;
        if (value.includes('#')) {
            const a = value.split('?');
            const urlHash = a[0];
            if (MODALS_MAP.has(urlHash)) {
                console.log(urlHash);
                hash.value = urlHash;
            //     if (a[1]) {
            //         hashParams.value = Object.fromEntries((new URLSearchParams(a[1])).entries());
            //     }
                setTimeout(() => {
                    dialog.value = true;
                }, 1);
            }
        }
    },
    {
        immediate: true,
    }
)

function onClosed() {
    console.log(22222222222222);

    hash.value       = null;
    dialog.value     = null;
    hashParams.value = null;

    const pathWithoutHash = $router.currentRoute.value.path.split('#')[0];
    console.log(pathWithoutHash)
    $router.replace(pathWithoutHash);
    // $router.go(-1);
}
</script>
<template>
    <component
        v-if="hash"
        :is="activeDialog.component"
        v-model="dialog"
        v-bind="hashParams"
        v-on="activeDialog.events"
    ></component>
<!--        @cancel="onCancel"-->
<!--        v-on="activeDialog.events"-->
</template>
<style scoped>

</style>
