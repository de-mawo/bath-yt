import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type TaskObject = {
  taskId: string;
  value: number;
};

interface MarksObject {
  marks: number;
  projectId: string;
}

// function to calculate total points per project
export async function calculateTotal(array: TaskObject[]) {
  let total = 0;
  for (const item of array) {
    total += item.value;
  }
  return total;
}

export function calculateTotalMarks(data: MarksObject[]): number {
  let totalMarks: number = 0;
  for (const item of data) {
    totalMarks += item.marks;
  }
  return totalMarks;
}

export function filterItemsByDateRange<
  T extends { startDate: Date; endDate: Date }
>(items: T[], today: Date, tomorrow: Date): T[] {
  const filteredItems = items?.filter((item) => {
    // Convert startDate and endDate strings to Date objects
    const itemStartDate = new Date(item.startDate);
    const itemEndDate = new Date(item.endDate);
    // Check if startDate is equal to or after the given startDate
    // and if endDate is before the given endDate
    return itemStartDate >= today || itemEndDate > tomorrow;
  });

  return filteredItems;
}


export const categoryType = [
  { label: "Web Development", value: "webdev" },
  { label: "Engineering", value: "engineering" },
  { label: "Data Science", value: "datascience" },
  { label: "Machine Learning", value: "machinelearning" },
  { label: "Game Development", value: "gamedev" },
  { label: "Mobile Development", value: "mobiledev" },
];
