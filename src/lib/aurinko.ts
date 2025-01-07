"use server";

import { auth } from "@clerk/nextjs/server";

export const getAurinkoAuthUrl = async (
  serviceType: "Google" | "Office365",
) => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const params = new URLSearchParams({
    clientId: process.env.AURINKO_CLIENT_ID as string,
    serviceType,
    scope:
      "Calendar.Read Calendar.ReadWrite Mail.Read Mail.ReadWrite Mail.Send Mail.Drafts Mail.All Contacts.Read Contacts.ReadWrite Tasks.Read Tasks.Readrite",
    responseType: "code",
    returnUrl: `${process.env.NEXT_PUBLIC_URL}`,
  });

  return `https://api.aurinko.io/v1/auth/authorize?${params.toString()}`;
};
