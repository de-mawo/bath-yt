import { getCurrentUser } from "@/lib/session";
import prisma from "../prisma";



export async function getCoursesData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const coursesData = await prisma.course.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return [...coursesData];
  } catch (error) {
    console.error("Error fetching courses info:", error);
    throw new Error("Error fetching courses info");
  }
}
