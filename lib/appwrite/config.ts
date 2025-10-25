export const AppwriteConfig = {
  endpointUrl: process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!,
  projectId: process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!,
  databaseId: process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!,
  userTable: process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION!,
  fileTable: process.env.NEXT_PUBLIC_APPWRITE_FILES_COLLECTION!,
  bucketId: process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID!,
  // secretKey should only be used in server-side environments
  secretKey: process.env.NEXT_APPWRITE_KEY!,
};