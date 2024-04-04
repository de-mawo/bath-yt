import { getCurrentUser } from "@/lib/session";
import prisma from "../prisma";
import { User } from "@prisma/client";

export async function getUserEventsData() {
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
    const eventsData = await prisma.events.findMany({
      where: {
        course,
        cohort,
      },
      orderBy: {
        startDate: "asc",
      },
    });

    return [...eventsData];
  } catch (error) {
    console.error("Error fetching user info:", error);

    return [];
  }
}

export async function getAllEventsData() {
  const loggedInUser = await getCurrentUser();
  if (!loggedInUser) {
    return [];
  }
  const isAdmin = loggedInUser.role === "ADMIN";

  if (!isAdmin) {
    return [];
  }
  try {
    const eventsData = await prisma.events.findMany({
      orderBy: {
        startDate: "asc",
      },
    });

    return [...eventsData];
  } catch (error) {
    console.error("Error fetching events info:", error);
    return [];
  }
}
