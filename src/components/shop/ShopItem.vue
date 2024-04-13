<script lang="ts" setup>
interface IProps {
	name?: string | null,
	icon?: string | null
}

const props = defineProps<IProps>();

</script>

<template>
    <div class="aspect-[4/3] text-xl text-slate-400 flex flex-col justify-center items-center rounded-md font-semibold border border-slate-200">
        {{ props.name }}
        <template v-if="props.icon"><i :class="[props.icon, props.name ? 'mt-2' : '']"></i></template>
    </div>
</template>