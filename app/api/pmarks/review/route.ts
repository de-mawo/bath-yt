import { getCurrentUser } from "@/lib/session";
import { TaskObject, calculateTotal, calculateTotalMarks } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";


type SubmittedProjectmarks = {
  projectmarksId: string;
  jsonToSend: TaskObject[];
  courseCode: string;
  userId: string;
  projectId: string;
};


export async function PATCH(req: NextRequest) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    throw new Error("You are not permitted to perfom this action");
  }

  try {
    const body: SubmittedProjectmarks = await req.json();
    const { jsonToSend, projectmarksId, courseCode, userId, projectId } = body;
    const isCompleted = true;
    const averagePoints = await calculateTotal(jsonToSend);

    //Check if module exist for this use , based on courseCode received from the front end where the Student is registered
    const getModule = await prisma.module.findFirst({
      where: {
        courseCode,
      },
    });

    if (!getModule) {
      throw new Error("Module not found");
    }

    const moduleId = getModule?.id as string;
    const moduleTitle = getModule?.title as string;
    const averageMarks = getModule?.possibleMarks as number;

    const newEntryProjectTotal = { marks: averagePoints, projectId: projectId };

    const getModuleMarks = await prisma.moduleMarks.findFirst({
      where: {
        moduleId: {
          equals: moduleId,
        },
        userId: {
          equals: userId,
        },
      },
    });

    if(!getModuleMarks) {
      // Otherwise create a new module marks entry
      await prisma.moduleMarks.create({
        data: {
          averageMarks,
          moduleTitle,
          moduleId,
          userId,
          projects: [newEntryProjectTotal],
        },
      });
    }

   

    // If there is already  mark for this module , update the project marks by inserting a new entry
    //  like this {"marks":26.8,"projectId":"13d85a39-212c-4b56-b46f-3097ae8877da"} into the projects json column
    if (getModuleMarks) {

      const moduleMarksId = getModuleMarks?.id;

      // let projects: any[] = [];
      let projects = getModuleMarks?.projects as any;
  
      // Add the new entry to the projects array
      projects.push(newEntryProjectTotal);
  
      const totalModuleMarks: number = calculateTotalMarks(projects);

      
      await prisma.moduleMarks.update({
        where: { id: moduleMarksId },
        data: {
          projects,
          averageMarks: totalModuleMarks,
        },
      });
    } 

    // Then simply update project marks
    await prisma.projectMarks.update({
      where: {
        id: projectmarksId,
      },
      data: {
        tasks: jsonToSend,
        isCompleted,
        averagePoints,
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
