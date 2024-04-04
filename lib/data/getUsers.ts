import { getCurrentUser } from "../session";
import prisma from "../prisma";

export async function getAdminUsersData() {
    const loggedInUser = await getCurrentUser();
    if (!loggedInUser) {
      return [];
    }
    const isAdmin = loggedInUser.role === "ADMIN";
  
    if (!isAdmin) {
      return [];
    }
    try {
      const usersData = await prisma.user.findMany({
        orderBy: [{ name: "desc" }],
      });
  
      return [...usersData];
    } catch (error: any) {
      console.error("Error fetching all users:", error);
      throw new Error("Error fetching all users");
    }
  }


  export async function getUserInfo() {
    const loggedInUser = await getCurrentUser();
    if (!loggedInUser) {
      return {};
    }
  const email = loggedInUser.email
    try {
      const userInfo = await prisma.user.findFirst({
        where: {
            email
        }
      })
  
      return userInfo
    } catch (error) {
      console.error("Error fetching user info:", error);
      return {}
    }
  }