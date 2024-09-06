import { defineStore } from "pinia";
import { nhost } from "@/nhost.js";

export const useCategoryStore = defineStore('category', {
    state: () => ({
        list: []
    }),
    actions: {
        async add(title, default_price = '') {
            !default_price && (default_price = '');

            const create_category_gql = `
                mutation($title: String!, $default_price: String!) {
                    insert_categories_one(object: {title: $title, default_price: $default_price}) {
                        id
                    }
                }
            `;

            const category = { title, default_price };

            const { error, data } = await nhost.graphql.request(create_category_gql, category);
            this.list.push({ id: data.insert_categories_one.id, title, default_price });

            if (error) throw new Error('Неизвестная ошибка, попробуйте позже');
        },
        async getList() {
            const get_categories_gql = `
                query {
                    categories {
                        id
                        title
                        default_price
                    }
                }
            `;

            const { data, error } = await nhost.graphql.request(get_categories_gql);
            if (error) throw new Error('Неизвестная ошибка, попробуйте позже');

            this.list = data.categories;
        },
        async delete(id) {
            const delete_category_gql = `
                mutation($id: uuid!) {
                    delete_categories_by_pk(id: $id) {
                        id
                    }
                }
            `;

            const { error } = await nhost.graphql.request(delete_category_gql, { id });
            if (error) throw new Error('Неизвестная ошибка, попробуйте позже');

            this.getList();
        },

        async edit(id, title, default_price = '') {
            !default_price && (default_price = '');

            const edit_category_gql = `
                mutation($id: uuid!, $title: String!, $default_price: String) {
                    update_categories_by_pk(pk_columns: {id: $id}, _set: { title: $title, default_price: $default_price }) {
                        id
                        title
                        default_price                
                    }
                }
            `;

            const { error } = await nhost.graphql.request(edit_category_gql, { id, title, default_price })

            console.log(error);
            if (error) throw new Error('Неизвестная ошибка, попробуйте позже');

            const curr_category         = this.list.find(c=>c.id===id);
            curr_category.title         = title;
            curr_category.default_price = default_price;

        }
    }
});