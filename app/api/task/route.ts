import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedTask = {
    title: string
    requirements: string[]
    number: number
    question: string
    demo: string
    projectId: string
    possiblePoint: number
    progLang: string
    markingScheme: string
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedTask = await req.json();

  
    const {
      title,
      requirements,
      number,
      question,
      demo,
      projectId,
      possiblePoint,
      progLang,
      markingScheme
    } = body;

    await prisma.task.create({
      data: {
        title,
        requirements,
        number,
        question,
        demo,
        projectId,
        possiblePoint,
        progLang,
        markingScheme
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
