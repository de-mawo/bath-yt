import { getCurrentUser } from "../session";
import prisma from "../prisma";

type CurrentProjectArgs = {
  course: string;
  cohort: string;
  projectId?: string
};

export async function getCurrentProjectsData({
  cohort,
  course,
}: CurrentProjectArgs) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }

  try {
    const current = await prisma.currentProject.findMany({
      where: {
        course,
        cohort,
      },
    });

    return [...current];
  } catch (error) {
    console.error("Error Current Projects:", error);
    return [];
  }
}


export async function getCurrentProject({
  cohort,
  course,
  projectId
}: CurrentProjectArgs) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return null;
  }

  try {
    const current = await prisma.currentProject.findFirst({
      where: {
        course,
        cohort,
        projectId
      },
    });

    return current;
  } catch (error) {
    console.error("Error Current Projects:", error);
    return null;
  }
}
