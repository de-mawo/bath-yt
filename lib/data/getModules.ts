import { getCurrentUser } from "@/lib/session";
import prisma from "../prisma";


export async function getModulesData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const modulesData = await prisma.module.findMany({
      orderBy: {
        title: "asc",
      },
    });

    return [...modulesData];
  } catch (error) {
    console.error("Error fetching modules info:", error);
    throw new Error("Error fetching modules info");
  }
}
