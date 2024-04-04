import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


type SubmittedCourse = {
  email: string;
};

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedCourse = await req.json();
    const { email} = body;

    const allowed = await prisma.allowedEmails.findMany({});
    const emails = allowed[0].emails;
    const allowedId = allowed[0].id

    if (emails.includes(email)) {
      return NextResponse.json({ message: "Email Already Exist" }, { status: 409 });
    }
    let updatetryEntry = [...(emails || [])];

    updatetryEntry.push(email);

    await prisma.allowedEmails.update({
      where: { id: allowedId },
      data: {
        emails: updatetryEntry
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
