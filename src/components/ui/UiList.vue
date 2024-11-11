<script setup>

const $props = defineProps({
    items: Array /* [{ title: string, prepend_icon?: string, append_icon?: string, color?: string, show_cond?: boolean }] */
})

</script>

<template>
    <ul :class="'list'">
        <template v-for="item in $props.items">
            <li
                v-if="item.show_cond != false"
                v-bind="item"
                class="item"
                :class="[
                    `item--color-${ item.color ? item.color : 'default' }`,
                    { 'item--clickable': item.onclick || item.to }
                ]"
                v-wave
            >
                <router-link
                    v-if="item.to"
                    :to="item.to"
                >
                    <span class="item__prepend">
                        <i v-if="item.prepend_icon" :class="['har prepend-icon', item.prepend_icon]"></i>
                        <slot name="prepend" />
                    </span>
                    <div class="item__title">{{ item.title }}</div>
                    <span class="item__append">
                        <slot name="append" />
                        <i v-if="item.append_icon" :class="['har append-icon', item.append_icon]"></i>
                    </span>
                </router-link>
                <template v-else>
                    <span class="item__prepend">
                        <i v-if="item.prepend_icon" :class="['har prepend-icon', item.prepend_icon]"></i>
                        <slot name="prepend" />
                    </span>
                    <div class="item__title">{{ item.title }}</div>
                    <span class="item__append">
                        <slot name="append" />
                        <i v-if="item.append_icon" :class="['har append-icon', item.append_icon]"></i>
                    </span>
                </template>
            </li>
        </template>
    </ul>
</template>

<style lang="scss" scoped>

.list {
    display: flex;
    flex-direction: column;

}
.item {
    &:not(:has(> a)) {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .25s;
        padding: 6px 8px;
        font-size: 12px;
        border-radius: 4px;
    }

    > a {
        display: flex;
        align-items: center;
        cursor: pointer;
        transition: .25s;
        padding: 6px 8px;
        font-size: 12px;
        border-radius: 4px;
    }

    &--color {
        &-default { color: $secondary-400; }
        &-danger  { color: $danger-400;    }
    }
    &--clickable {
        &.item--color-default:hover,
        &.item--color-default:focus { background-color: $secondary-50; }
        &.item--color-danger:hover,
        &.item--color-danger:focus { background-color: $danger-50; }
    }


    &__prepend, &__append { flex-shrink: 0; }

    &__title { flex-grow: 1; margin-left: 8px; margin-right: 8px }
}

</style>