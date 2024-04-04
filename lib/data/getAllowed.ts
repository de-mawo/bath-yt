import prisma from "../prisma";

export async function getAllowedEmails() {
  try {
    const allowed = await prisma.allowedEmails.findMany({});
    const emails = allowed[0].emails;
    return emails;
  } catch (error) {
    console.error("Error Allowed emails", error);
    throw new Error("Error fetching allowed emails");
  }
}
