import { PiBellRingingDuotone } from "react-icons/pi";
import { BiSolidChevronDown } from "react-icons/bi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import SideBarDrawer from "./SideBarDrawer";
import Link from "next/link";
import DarkLightToggler from "./DarkLightToggler";
import LogOutBtn from "./LogOutBtn";
import { User } from "@prisma/client";

type Props = {
  user: User
}

const Header = ({user}: Props) => {
  return (
    <header
      className="
     z-10 bg-white
      rounded-md 
      shadow-sm dark:bg-black 
      "
    >
      <nav className="p-4 transition-all ">
        <div className="flex flex-wrap justify-between items-center mx-8 ">
          {/* LEFT SIDE */}
          <div className="flex justify-start items-center">
            <SideBarDrawer user={user}  />
          </div>

          {/* RIGHT SIDE  */}

          <div className="flex items-center space-x-3 md:space-x-6">
            {/* <button className="p-2 bg-rose-100 rounded-full text-rose-500">
              <PiBellRingingDuotone size={28} />
            </button> */}
            <Avatar>
              <AvatarImage src={user?.image as string} alt={user?.name as string} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className=" text-slate-500 dark:text-slate-300">
                  <BiSolidChevronDown size={22} />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>{user?.name} </DropdownMenuLabel>
                <div className="flex flex-col  space-y-4 m-3">
                  <Link href="/portal/account">Profile</Link>
                  <DarkLightToggler />
                  <LogOutBtn />
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
