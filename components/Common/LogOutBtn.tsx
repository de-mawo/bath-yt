'use client'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'
import { CiLogout } from "react-icons/ci";
import { signOut } from "next-auth/react";

const LogOutBtn = () => {
  return (
    <div className="w-12 h-12"> 
    <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button className=" bg-slate-50 p-2  rounded-full dark:bg-black"
        onClick={(e) => {
          e.preventDefault();
          signOut({ callbackUrl: `/` });
        }}
        >
        <CiLogout size={24} />
        </button>
      </TooltipTrigger>
      <TooltipContent>
        <p>LogOut </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
  </div>
  )
}

export default LogOutBtn