import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import prisma from "@/lib/prisma";

type SubmittedModule = {
  title: string;
  code: string;
  category: string;
  courseId: string
  tags: string[];
  courseCode: string
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedModule = await req.json();

   
    const slug = slugify(body.title, { lower: true });
    const { title, category, code, tags, courseId , courseCode} = body;

    await prisma.module.create({
      data: {
        title,
        slug,
        category,
        courseId,
        code,
        tags,
        courseCode
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
