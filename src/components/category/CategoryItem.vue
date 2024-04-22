<script setup>
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { ref } from "vue";

const $emit = defineEmits(['editCategory']);

const $props = defineProps({
    id: String,
    name: String,
    icon: String
});

const openedMenu      = ref(false);

</script>

<template>
    <div
        class="relative aspect-[4/3] text-lg text-slate-400 flex flex-col justify-center items-center rounded-md font-semibold border border-slate-200"
    >
        <div v-if="$props.name" class="absolute right-2 top-2 flex items-center">
            <DropdownMenu v-model:open="openedMenu">
                <DropdownMenuTrigger>
                    <Button v-wave="{ color: 'black' }" :variant="openedMenu ? 'secondary' : 'ghost'" size="icon"><i class="asi asi-menu-dots"></i></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem @click="$emit('editCategory')">Редактировать</DropdownMenuItem>
                    <DropdownMenuItem class="data-[highlighted]:bg-rose-50"><div class="text-rose-600">Удалить</div></DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        {{ $props.name }}
        <template v-if="$props.icon"><i :class="[$props.icon, $props.name ? 'mt-2' : '']"></i></template>
    </div>
</template>