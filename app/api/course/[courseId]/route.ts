import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type SubmittedCourse = {
  courseId: string;
  studentEmail: string;
};

export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedCourse = await req.json();
    const { courseId, studentEmail } = body;

    const course = await prisma.course.findFirst({
      where: { id: courseId },
    });

    if (course?.students.includes(studentEmail)) {
      return NextResponse.json({ message: "Already Exist" }, { status: 409 });
    }
    let students = [...(course?.students || [])];

    students.push(studentEmail);

    await prisma.course.update({
      where: { id: courseId },
      data: {
        students
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
