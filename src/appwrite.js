import { Account, Client, Databases, Storage } from "appwrite";

export const client = new Client();

client.setEndpoint('http://localhost/v1').setProject('66f116e1002746e9beb0');

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
