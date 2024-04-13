<script lang="ts" setup>
import ShopItem from "@/components/shop/ShopItem.vue";
import { IShopItem } from "@/types/shop";

interface IProps {
    items: IShopItem[];
}

const $emit = defineEmits(["openDialogAdd"]);

const $props = defineProps<IProps>();
</script>

<template>
    <div class="grid grid-cols-2 gap-2">
        <ShopItem
            v-for="(item, i) in $props.items"
            :key="i"
            :name="item.name"
        />
        <ShopItem
            icon="asi-plus-circle"
            @click="$emit('openDialogAdd')"
        />
    </div>
</template>
