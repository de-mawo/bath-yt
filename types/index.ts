import {
  $Enums,
  Prisma,
  Project,
  ProjectMarks,
  Task,
  User,
} from "@prisma/client";

export type CombinedType = Project & Task;

export type ProjectMarksUserType = {
  id: string;
  tasks: Prisma.JsonValue[];
  averagePoints: number;
  projectTitle: string;
  projectId: string;
  links: string[];
  isCompleted: boolean;
  userId: string;
  user: {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
    role: $Enums.Role;
    phone: string | null;
    github: string | null;
    linkedIn: string | null;
    discord: string | null;
    employment: $Enums.EmploymentStatus;
    course: string;
  };
};
