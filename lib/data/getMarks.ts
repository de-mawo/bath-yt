import { getCurrentUser } from "@/lib/session";
import prisma from "../prisma";
import { User } from "@prisma/client";

type Args = {
  userId: string;
  projectId: string;
};

export async function getOneProjectMarksData({ userId, projectId }: Args) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return null;
  }

  try {
    const marks = await prisma.projectMarks.findFirst({
      where: {
        userId: {
          equals: userId,
        },
        projectId: {
          equals: projectId,
        },
      },
      include: {
        user: true,
      },
    });

    return marks;
  } catch (error) {
    console.error("Error fetching Project Marks info:", error);
    return null;
  }
}

export async function getUserModuleMarksData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }

  try {
    const email = loggedInUser.email;
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    const { id: userId } = user as User;
    const marks = await prisma.moduleMarks.findMany({
      where: {
        userId: {
          equals: userId,
        },
      },
    });

    return [...marks];
  } catch (error) {
    console.error("Error fetching Module Marks info:", error);
    return [];
  }
}

export async function getMarksToMarkData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }

  try {
    const marks = await prisma.projectMarks.findMany({
      include: {
        user: true,
      },
      orderBy: {
        isCompleted: "asc",
      },
    });

    return [...marks];
  } catch (error) {
    console.error("Error fetching Module Marks info:", error);
    return [];
  }
}
