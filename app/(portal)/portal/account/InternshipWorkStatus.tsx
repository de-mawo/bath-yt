"use client";

import { Button } from "@/components/ui/button";
import { PiConfettiThin } from "react-icons/pi";
import { FaRegSadTear } from "react-icons/fa";
import { User } from "@prisma/client";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

const InternshipWorkStatus = ({ user }: Props) => {
  const router = useRouter();

  const email = user.email

  async function updateEmploymentStatus(newStatus: string) {
    try {
      const res = await fetch("/api/user/employment", {
        method: "PATCH",
        body: JSON.stringify({ employmentStatus: newStatus, email }), // Send the new employment status
      });

      if (res.ok) {
        toast.success("Employment Status Updated", { duration: 4000 });
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
    <div className="my-8 ">
      <h2 className="p-4 text-2xl font-semibold tracking-tight">
        Placement Status
      </h2>
      <div className="flex items-center space-x-4">
        <h3 className="font-semibold">Inform Staff</h3>
        {user.employment === "EMPLOYED" ? (
          <Button onClick={() => updateEmploymentStatus("SEARCHING")}>
            I am no longer employed <FaRegSadTear size={20} />
          </Button>
        ) : (
          <Button onClick={() => updateEmploymentStatus("EMPLOYED")} variant="destructive">
            I Got a job/internship <PiConfettiThin size={20} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default InternshipWorkStatus;

