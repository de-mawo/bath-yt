import { getCurrentUser } from "@/lib/session";
import { EmploymentStatus } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedEmployment = {
  email: string;
  employmentStatus: EmploymentStatus;
};

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedEmployment = await req.json();

    const { email, employmentStatus } = body;

    await prisma.user.update({
      where: { email: email },
      data: {
        employment: employmentStatus,
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
