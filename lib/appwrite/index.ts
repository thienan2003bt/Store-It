"use server";

import { Account, Avatars, Client, Storage, TablesDB } from "appwrite";
import { AppwriteConfig } from "./config";
import { cookies } from "next/headers";

export const createSessionClient = async () => {
  const client = new Client()
    .setEndpoint(AppwriteConfig.endpointUrl)
    .setProject(AppwriteConfig.projectId)
    ;
  const session = (await cookies()).get('appwrite-session');
  if (!session || !session.value) { 
    throw new Error('No session');
  }
  client.setSession(session.value);
  return {
    get account() {
      return new Account(client);
      },
    get tables() {
      return new TablesDB(client);
    }
  };
};

export const createAdminClient = async () => {
  const client = new Client()
    .setEndpoint(AppwriteConfig.endpointUrl)
    .setProject(AppwriteConfig.projectId)
  
  return {
    get account() {
      return new Account(client);
    },
    get tables() {
      return new TablesDB(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    }
  };
};
