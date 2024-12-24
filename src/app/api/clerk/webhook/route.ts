import { db } from "~/server/db";
import { User } from "@prisma/client";

export const POST = async (req: Request) => {
  const { data } = await req.json();

  const id = data.id;
  const emailAddress = data.email_addresses[0].email_address;
  const firstName = data.first_name || "";
  const lastName = data.last_name || "";
  const imageUrl = data.image_url || "";

  const toBeCreatedUserData: User = {
    email: emailAddress,
    firstName,
    lastName,
    id,
    imageUrl,
  };

  try {
    await db.user.create({
      data: { ...toBeCreatedUserData },
    });
  } catch (error) {
    console.log(
      "Could not create user.",
      `Error: ${error}, User Data: ${toBeCreatedUserData}`,
    );
  }

  return new Response("Webhook received", { status: 200 });
};
