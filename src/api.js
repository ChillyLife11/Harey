import { collection, addDoc, getDocs, query } from 'firebase/firestore';
import db from '@/firebase.js';


export const create = async (table, fields) => {
    const colRef = collection(db, table);
    try {
        let res = await addDoc(colRef, fields);
        return res.id;
    } catch (e) {
        console.error(e);
    }
}
export const readAll = async (table) => {
    const q = query(collection(db, table));

    try {
        let res = await getDocs(q);

        return res.length === 0 ? [] : res.docs.map(doc => {
            let { name, default_cost, dt } = doc.data();
            return {
                name,
                default_cost,
                dt: dt?.seconds ?? null
            }
        });
    } catch (e) { console.log(e); }
}