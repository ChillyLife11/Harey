import { Account, Client, Databases, Storage } from "appwrite";
import { APPWRITE } from "@/config.js";

export const client = new Client();

client.setEndpoint(APPWRITE.ENDPOINT).setProject(APPWRITE.ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
