import { getCurrentUser } from "@/lib/session";
import prisma from "../prisma";

export async function getTasksData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const tasksData = await prisma.task.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return [...tasksData];
  } catch (error) {
    console.error("Error fetching tasks info:", error);
    throw new Error("Error fetching tasks info");
  }
}

export async function getProjectTaskData(id: string) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }

  try {
    const tasks = await prisma.task.findMany({
      where: {
        projectId: id,
      },
      orderBy: {
        number: "asc",
      },
    });

    return [...tasks];
  } catch (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
}
