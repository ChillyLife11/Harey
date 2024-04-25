<script setup>
import { ref } from "vue";
import UiMenu from '@/components/ui/UiMenu.vue';
import UiButton from "@/components/ui/UiButton.vue";

const $emit = defineEmits(['editCategory']);

const $props = defineProps({
    id: String,
    name: String,
    icon: String
});

const openedMenu = ref(false);

</script>

<template>
    <div
        class="relative aspect-[4/3] text-lg text-secondary-400 flex flex-col justify-center items-center rounded-md font-semibold border border-secondary-200"
    >
        <div v-if="$props.name" class="absolute right-2 top-2 flex items-center">
            {{ openedMenu }}
            <UiMenu v-model="openedMenu">
                <template #trigger>
                    <UiButton variant="ghost"  icon="asi-menu-dots" />
                </template>

                asdasassasad
            </UiMenu>
<!--            <Button v-wave="{ color: 'black' }" :variant="openedMenu ? 'secondary' : 'ghost'" size="icon"><i class="asi asi-menu-dots"></i></Button>-->
            <div @click="$emit('editCategory')">Редактировать</div>
            <div class="text-danger-600">Удалить</div>
        </div>
        {{ $props.name }}
        <template v-if="$props.icon"><i :class="[$props.icon, $props.name ? 'mt-2' : '']"></i></template>
    </div>
</template>