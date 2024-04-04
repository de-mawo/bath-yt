import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type CurrentProject = {
  projectId: string;
  projectTitle: string;
  projectCode: string;
  url: string;
  cohort: string;
  course: string;
  startDate: string;
  endDate: string;

};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: CurrentProject = await req.json();

    const {
      projectCode,
      projectId,
      projectTitle,
      cohort,
      course,
      startDate,
      endDate,
      url
    } = body;

    await prisma.currentProject.create({
      data: {
        projectCode,
        projectId,
        projectTitle,
        cohort,
        course,
        startDate,
        endDate,
        url
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
