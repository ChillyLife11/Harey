import { create } from "@/api.js";
import { DocumentReference } from "firebase/firestore";

export default class Category {
    id = null;
    name = null;
    default_cost = null;
    dt = null;

    constructor(id, name, default_cost) {
        this.id = id;
        this.name = name;
        this.default_cost = default_cost;
    }

    setFields(name, default_cost, dt) {
        this.name = name;
        this.default_cost = default_cost;
        this.dt = dt;
    }
    
    static create(name, default_cost) {
        const category = new this();
        console.log(name, default_cost)
        
        category.setFields(name, default_cost);

        let res = create('categories', {
            name: category.name,
            default_cost: category.default_cost,
            dt: (new Date())
        });

        category.id = res.id;
    }

    static read() {}

    static update() {}

    static delete() {}
}