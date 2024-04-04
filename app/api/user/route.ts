import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedUserEdits = {
  email: string;
  phone: string;
  github: string;
  linkedIn: string;
  discord: string;
};

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedUserEdits = await req.json();
    const { email, phone, github, linkedIn, discord } = body;

    await prisma.user.update({
      where: { email: email },
      data: {
        phone,
        github,
        linkedIn,
        discord,
      },
    });

    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
