"use client";
import { useTheme } from "next-themes";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import { useEffect, useState } from "react";

const DarkLightToggler = () => {
    const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();



  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  return (
    <div className="w-12 h-12"> 
    <TooltipProvider >
      <Tooltip>
        <TooltipTrigger asChild>
          {currentTheme === "dark" ? (
            <button
              className=" bg-slate-50 p-2  rounded-full dark:bg-black"
              onClick={() => setTheme("light")}
            >
              <IoSunnyOutline size={24} />
            </button>
          ) : (
            <button
              className=" bg-slate-50 p-2  rounded-full dark:bg-black"
              onClick={() => setTheme("dark")}
            >
              <IoMoonOutline size={24} />
            </button>
          )}
        </TooltipTrigger>
        <TooltipContent>
        {currentTheme === "dark" &&  <p>Turn Light </p> }
        {currentTheme === "light" &&  <p>Turn Dark </p> }
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </div>
  );
};

export default DarkLightToggler;
