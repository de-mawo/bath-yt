import * as React from "react";
import Image from "next/image";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./routes";
import { IconRoutes } from "./RenderRoutes";
import LogOutBtn from "./LogOutBtn";
import DarkLightToggler from "./DarkLightToggler";
import { User } from "@prisma/client";

type Props = {
  user: User
}

const SideBar = ({user}: Props) => {

  const adminIconsRoutes = () => {
    return <>{IconRoutes({ routes: AdminRoutes })}</>;
  };

  const userIconsRoutes = () => {
    return <>{IconRoutes({ routes: UserRoutes })}</>;
  };

  const moderatorIconsRoutes = () => {
    return <>{IconRoutes({ routes: ModeratorRoutes })}</>;
  };


  return (
    <div className="hidden fixed  inset-y-0 left-0 sm:block w-[5rem] bg-white rounded-lg overflow-hidden dark:bg-black dark:border-r">
      <div className="flex flex-col items-center justify-between h-full">
        {/* TOP PART  */}
        <div>
          <div className="my-8">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </div>

          <nav className="flex flex-col items-center px-3 overflow-y-auto">
          {user?.role === "ADMIN" && adminIconsRoutes()}
            {user?.role === "USER" && userIconsRoutes()}
         
            {user?.role === "MODERATOR" && moderatorIconsRoutes()}
          </nav>
        </div>
        {/* BOTTOM PART  */}
        <div className="flex flex-col items-center space-y-6 my-8">
          <DarkLightToggler/>
          <LogOutBtn/>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
