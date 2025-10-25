"use server";

// Docs: https://appwrite.io/docs
import {ID, Models, Query} from "appwrite";
import {createAdminClient} from "../appwrite";
import {AppwriteConfig} from "../appwrite/config";
import {parseStringify} from "../utils";

const getUserByEmail = async (email: string) => {
  const {tables} = await createAdminClient();
  const results: Models.RowList = await tables.listRows({
    databaseId: AppwriteConfig.databaseId,
    tableId: AppwriteConfig.userTable,
    queries: [Query.equal("email", email)],
  });
  return results.total > 0 ? results.rows[0] : null;
};

const handleError = (error: unknown, message: string) => {
  console.log("Error:", message);
  throw error;
};

const sendEmailOTP = async ({email}: {email: string}) => {
  const {account} = await createAdminClient();
  try {
    const session = await account.createEmailToken(ID.unique(), email);
    return session.userId;
  } catch (error) {
    handleError(error, "Failed to send email OTP");
  }
};

export const createAccount = async ({fullName, email}: {fullName: string; email: string}) => {
  const existingUser = await getUserByEmail(email);
  const accountId = await sendEmailOTP({email});
  if (!accountId) {
    throw new Error("Failed to send an OTP for creating new account");
  }

  if (!existingUser) {
    const {tables} = await createAdminClient();
    await tables.createRow({
      databaseId: AppwriteConfig.databaseId,
      tableId: AppwriteConfig.userTable,
      rowId: ID.unique(),
      data: {
        fullName,
        email,
        accountId,
        avatar:
          "https://media.istockphoto.com/id/2151669184/vector/vector-flat-illustration-in-grayscale-avatar-user-profile-person-icon-gender-neutral.jpg?s=612x612&w=0&k=20&c=UEa7oHoOL30ynvmJzSCIPrwwopJdfqzBs0q69ezQoM8=",
      },
    });
    return parseStringify<{accountId: string}>({accountId});
  }
  return null;
};
