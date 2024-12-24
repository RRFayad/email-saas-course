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
    return new Response("User created successfully", { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: "Failed to create user",
        message: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500 },
    );
  }
};
