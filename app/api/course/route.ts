import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import prisma from "@/lib/prisma";

type SubmittedCourse = {
  title: string;
  code: string;
  category: string;
  tags: string[];
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedCourse = await req.json();

    const students = ["demostudent@bath.com"];
    const slug = slugify(body.title, { lower: true });
    const { title, category, code, tags } = body;

    await prisma.course.create({
      data: {
        title,
        students,
        slug,
        category,
        code,
        tags
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
