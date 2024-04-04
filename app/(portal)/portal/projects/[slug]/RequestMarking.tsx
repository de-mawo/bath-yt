"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegCopy } from "react-icons/fa";

type Props = {
  projectId: string;
  userId: string;
  course: string;
};

const RequestMarking = ({ projectId, userId, course }: Props) => {
  const [show, setShow] = useState(false);

  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success(`Review link copied to clipboard`, { duration: 4000 });
    } catch (error) {
      toast.success("Ooop an error occured", { duration: 4000 });
    }
  };

  const reviewLink = `${process.env.NEXT_PUBLIC_APP_URL}/portal/reviews?proId=${projectId}&userId=${userId}&course=${course}`;

  return (
    <div className="my-4">
      {show ? (
        <div className="text-center my-3">
          <Button onClick={() => copyToClipboard(reviewLink)}>
            Ask for a Review <FaRegCopy className="ml-3" size={20} />
          </Button>
        </div>
      ) : (
        <div className="text-center my-3">
          <Button onClick={() => setShow(!show)}>Request a Review</Button>
        </div>
      )}
    </div>
  );
};

export default RequestMarking;
