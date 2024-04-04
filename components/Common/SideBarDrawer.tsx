"use client";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CgMenuLeft } from "react-icons/cg";
import Image from "next/image";
import LogOutBtn from "./LogOutBtn";
import DarkLightToggler from "./DarkLightToggler";
import { FullRoutes } from "./RenderRoutes";
import { AdminRoutes, ModeratorRoutes, UserRoutes } from "./routes";
import { User } from "@prisma/client";

type Props = {
  user: User;
};

const SideDrawer = ({ user }: Props) => {
  const userRoutes = () => {
    return <>{FullRoutes({ routes: UserRoutes })}</>;
  };
  const adminRoutes = () => {
    return <>{FullRoutes({ routes: AdminRoutes })}</>;
  };
  const moderatorRoutes = () => {
    return <>{FullRoutes({ routes: ModeratorRoutes })}</>;
  };
  return (
    <Drawer>
      <DrawerTrigger className="p-2  bg-rose-100 rounded-full text-rose-500 ">
        <CgMenuLeft size={24} />
      </DrawerTrigger>
      <DrawerContent className="fixed inset-0 h-screen mt-0 w-64 ">
        <DrawerHeader>
          <div className="flex justify-center">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </div>
        </DrawerHeader>

        <nav className="flex flex-col  px-3 overflow-y-auto">
          {user?.role === "ADMIN" && adminRoutes()}
          {user?.role === "USER" && userRoutes()}

          {user?.role === "MODERATOR" && moderatorRoutes()}
        </nav>

        <DrawerFooter>
          <DarkLightToggler />
          <LogOutBtn />
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default SideDrawer;
