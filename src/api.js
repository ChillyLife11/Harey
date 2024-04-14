import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import db from '@/firebase.js';


export const create = async (table, fields) => {
    const colRef = collection(db, table);
    try {
        let res = await addDoc(colRef, fields);
        console.log(res.id)
        return res.id;
    } catch (e) {
        console.error(e);
    }
}