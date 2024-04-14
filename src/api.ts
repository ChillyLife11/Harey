import { collection, addDoc, setDoc, doc, DocumentReference } from 'firebase/firestore';
import db                     from '@/firebase.ts';


export const create = async (table: string, fields: object): DocumentReference => {
    const colRef = collection(db, table);
    try {
        let res = await addDoc(colRef, fields);
        return res;
    } catch (e) {
        console.error(e);
    }
}