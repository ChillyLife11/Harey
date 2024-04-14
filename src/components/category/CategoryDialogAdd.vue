<script setup>
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Category from "@/models/Category";

import { toTypedSchema } from "@vee-validate/zod";
import * as z            from "zod";

const $props = defineProps({
    title: String
});

const open = defineModel();

const formSchema = toTypedSchema(z.object({
    name: z.string({
        required_error: 'Обязательное поле',
        invalid_type_error: 'Введите корректное значение'
    }).min(2, { message: 'Минимум 2 символа' }).max(100, { message: 'Максимум 100 символов' }),
    default_cost: z.optional(z.number())
}));

function onSubmit(values) {
    Category.create(values.name, values.default_cost);
}
</script>

<template>
    <Dialog v-model:open="open">
        <DialogContent class="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>{{ $props.title }}</DialogTitle>
            </DialogHeader>
            <Form :validation-schema="formSchema" @submit="onSubmit" class="flex flex-col space-y-4">
                <FormField v-slot="{ componentField }" name="name">
                    <FormItem>
                        <FormLabel>Название</FormLabel>
                        <FormControl>
                            <Input type="text" placeholder="Шоколадная Фантазия" v-bind="componentField" />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <FormField v-slot="{ componentField }" name="default_cost">
                    <FormItem>
                        <FormLabel>Цена по умолчанию</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="2000 ₽" v-bind="componentField" />
                        </FormControl>
                        <FormDescription>Необязательно</FormDescription>
                        <FormMessage />
                    </FormItem>
                </FormField>
                <DialogFooter>
                    <Button type="submit"> Добавить </Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    </Dialog>
</template>
