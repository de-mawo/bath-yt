"use client";

import * as React from "react";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ProjectMarks, Task } from "@prisma/client";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IoCheckmarkDoneSharp } from "react-icons/io5";

type Props = {
  tasks: Task[];
  projectmarks: ProjectMarks;
  courseCode: string;
  userId: string;
  projectId: string;
};

interface TaskValues {
  [taskId: string]: number;
}

export function ReviewSelector({
  tasks,
  projectmarks,
  courseCode,
  userId,
  projectId,
}: Props) {
  const router = useRouter();

  const projectmarksId = projectmarks?.id;

  // Initialize state for each task
  const [taskValues, setTaskValues] = React.useState<TaskValues>(() =>
    tasks.reduce((acc, task) => {
      acc[task.id] = 0;
      return acc;
    }, {} as TaskValues)
  );

  // Handler to update value for a specific task
  const handleValueChange = (taskId: string, newValue: number) => {
    setTaskValues((prevTaskValues) => ({
      ...prevTaskValues,
      [taskId]: newValue,
    }));
  };

  // Convert taskValues into the desired JSON format
  const jsonToSend = Object.entries(taskValues).map(([taskId, value]) => ({
    taskId,
    value,
  }));

  async function SubmitReview() {
    const formattedValues = {
      jsonToSend,
      projectmarksId,
      courseCode,
      userId,
      projectId,
    };

    try {
      const res = await fetch("/api/pmarks/review", {
        method: "PATCH",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Review Submitted", { duration: 4000 });
        router.refresh();
      } else {
        const errorMessage = await res.text();
        toast.error(`An error occurred: ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An unexpected error occurred");
    }
  }

  return (
    <div className="pt-2 m-4">
      {projectmarks && projectmarks.isCompleted === true ? (
        <div className="flex items-center space-x-2 ">
          {" "}
          <p className="font-bold">Project Already Marked </p>{" "}
          <IoCheckmarkDoneSharp className="text-rose-500" size={24} />{" "}
        </div>
      ) : (
        <>
          {tasks.map((task) => (
            <div className="py-8" key={task.id}>
              <div className="flex items-center justify-between">
                <Label
                  htmlFor={`task-${task.id}`}
                  className="flex flex-col space-y-3 "
                >
                  <p className="flex items-center space-x-2">
                    {" "}
                    <span>{task.number}.</span>{" "}
                    <span> {task.markingScheme}</span>{" "}
                  </p>

                  <p className="font-bold text-rose-500">Award  up to {task.possiblePoint} marks </p>
                </Label>
                <span className="w-12 rounded-md border border-transparent px-2 py-0.5 text-right text-sm font-semibold hover:border-border">
                  {taskValues[task.id]}
                </span>
              </div>
              <Slider
                id={`marks-${task.id}`}
                max={task.possiblePoint}
                defaultValue={[1]}
                step={0.1}
                onValueChange={(newValue) =>
                  handleValueChange(task.id, newValue[0])
                }
                className="[&_[role=slider]]:h-8 [&_[role=slider]]:w-8 py-2"
                aria-label={`marks-${task.id}`}
              />
            </div>
          ))}
          {/* Add a button to send the JSON to the database */}
          <div className="text-center my-3">
            <Button onClick={SubmitReview}>Submit Review</Button>
          </div>
        </>
      )}
    </div>
  );
}
