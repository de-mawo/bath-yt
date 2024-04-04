"use client";
import { cn } from "@/lib/utils";
import toast from "react-hot-toast";
import { RiFileCopyFill } from "react-icons/ri";

type Props = {
    text: string
    className: string
}

export const CopyToClipBoard = ({text, className}: Props) => {
  const copyToClipboard = (text: string) => {
    try {
      navigator.clipboard.writeText(text);
      toast.success(`ID ${text} Copied`, { duration: 4000 });
    } catch (error) {
      toast.success("Ooop an error occured", { duration: 4000 });
    }
  };
  return (
    <RiFileCopyFill
      className={cn(className)}
      size={28}
      onClick={() => copyToClipboard(text)}
    />
  );
};
