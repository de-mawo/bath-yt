"use client";

import DialogWrapper from "@/components/Common/DialogWrapper";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashCan } from "react-icons/fa6";

type Props = {
  id: string;
};

const DeleteEvent = ({ id }: Props) => {
  async function onDelete(
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    event.preventDefault();
    try {
      const formattedValues = {
        id,
      };

      const res = await fetch("/api/event", {
        method: "DELETE",
        body: JSON.stringify(formattedValues),
      });

      if (res.ok) {
        toast.success("Event Deleted", { duration: 4000 });

        setOpen(false);
        router.refresh();
      } else {
        const errorMessage = await res.text();

        toast.error(`An error occured ${errorMessage}`, { duration: 6000 });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      toast.error("An Unexpected error occured");
    }
  }

  const [open, setOpen] = useState(false);
  const router = useRouter();
  return (
    <DialogWrapper
      isBtn={false}
      icon={FaRegTrashCan}
      title="Delete Event"
      open={open}
      setOpen={() => setOpen(!open)}
    >
      <p>Are you sure you want to Delete this Event?</p>
      <div className="flex justify-between mt-8 ">
        <Button onClick={onDelete}>Yes ,Delete</Button>
        <Button onClick={() => setOpen(false)}>No, Cancel</Button>
      </div>
    </DialogWrapper>
  );
};

export default DeleteEvent;
