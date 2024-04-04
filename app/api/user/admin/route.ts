import { getCurrentUser } from "@/lib/session";
import { Role } from "@prisma/client";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type EditUserBody = {
  id: string;
  course: string;
  role: Role;
  cohort: string
};

export async function PATCH(req: Request) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: EditUserBody = await req.json();

    const { id, role, course,cohort } = body;

    await prisma.user.update({
      where: { id },
      data: { role, course, cohort },
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
