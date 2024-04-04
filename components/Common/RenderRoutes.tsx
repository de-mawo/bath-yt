import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import React from "react";

type Props = {
  routes: { url: string; title: string; icon: React.ElementType }[];
};

export function IconRoutes({ routes }: Props) {
  return (
    <>
      {routes.map((route, index) => (
        <Link href={route.url} key={index} className="my-3 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button className=" bg-slate-50 p-2  rounded-full dark:bg-black">
                  {React.createElement(route.icon, {
                    size: 24,
                  })}
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{route.title} </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </>
  );
}

export  function FullRoutes({ routes }: Props) {
  return (
    <>
      {routes.map((route, index) => (
        <Link href={route.url} key={index} className="my-4  rounded-md">
          <div className="grid grid-cols-3  ">
            <div className="px-3">
              {React.createElement(route.icon, {
                size: 24,
              })}
            </div>
            <div className="col-span-2">
              <p>{route.title}</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}