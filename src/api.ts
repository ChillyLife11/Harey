import { collection, addDoc, setDoc, doc } from 'firebase/firestore';
import db                     from '@/firebase.ts';


export const create = async (table: string, fields: object) => {
    const colRef = collection(db, table);
    try {
        const a = await addDoc(colRef, fields);
        console.log(a);
    } catch (e) {
        console.error(e);
    }
}