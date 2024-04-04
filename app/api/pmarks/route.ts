import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedLinks = {
  links: string[];
  projectTitle: string;
  projectId: string;
  userId: string;
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedLinks = await req.json();

    const { links, projectTitle, projectId, userId } = body;

    await prisma.projectMarks.create({
      data: {
        links,
        projectTitle,
        projectId,
        userId,
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
