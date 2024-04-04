import { getCurrentUser } from "@/lib/session";
import { getCurrentProjectsData } from "./getCurrentProjects";
import { User } from "@prisma/client";
import prisma from "../prisma";

export async function getProjectsData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const projectsData = await prisma.project.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return [...projectsData];
  } catch (error) {
    console.error("Error fetching projects info:", error);
    throw new Error("Error fetching projects info");
  }
}

export async function getUserProjectsData() {
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
    const { cohort, course } = user as User;

    const todoProjects = await getCurrentProjectsData({ cohort, course });

    return [...todoProjects];
  } catch (error) {
    console.error("Error fetching user info:", error);
    return [];
  }
}

export async function getProjectData(id: string) {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return {};
  }

  try {
    const project = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    return project;
  } catch (error) {
    console.error("Error fetching user info:", error);
    return {};
  }
}
