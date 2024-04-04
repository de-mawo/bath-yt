import { getCurrentUser } from "@/lib/session";
import { NextRequest, NextResponse } from "next/server";
import slugify from "slugify";
import prisma from "@/lib/prisma";

type SubmittedProject = {
  title: string;
  code: string;
  category: string;
  moduleId: string;
  tags: string[];
  description: string;
  requirements: string[];
  resources: string[];
  objectives: string[];
  courseCode: string
};

export async function POST(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (loggedInUser?.role !== "ADMIN") {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedProject = await req.json();

    const slug = slugify(body.title, { lower: true });
    const {
      title,
      category,
      code,
      tags,
      moduleId,
      description,
      requirements,
      resources,
      objectives,
      courseCode
    } = body;

    await prisma.project.create({
      data: {
        title,
        slug,
        category,
        moduleId,
        description,
        code,
        tags,
        requirements,
        resources,
        objectives,
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
