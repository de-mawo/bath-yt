import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedEvent = {
  title: string;
  course: string;
  cohort: string;
  url: string;
  venue: string;
  description: string;
  startDate: string;
  endDate: string;
};

type DeleteEvent = {
  id: string;
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedEvent = await req.json();

    const {
      title,
      description,
      startDate,
      course,
      url,
      endDate,
      venue,
      cohort,
    } = body;
    await prisma.events.create({
      data: {
        startDate,
        title,
        description,
        course,
        venue,
        url,
        endDate,
        cohort,
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

export async function DELETE(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: DeleteEvent = await req.json();

    const { id } = body;
    await prisma.events.delete({
      where: { id },
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
