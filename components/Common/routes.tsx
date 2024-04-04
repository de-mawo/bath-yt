import {
    HiOutlineUserGroup,
    HiOutlineCog6Tooth,
    HiOutlineSquares2X2,
    HiMiniComputerDesktop,
  } from "react-icons/hi2";
  import { TbListCheck, TbBrandDiscord } from "react-icons/tb";
  import { LiaProjectDiagramSolid } from "react-icons/lia";
  import { IoVideocamOutline, IoSchoolOutline} from "react-icons/io5";
  import { VscFileSubmodule } from "react-icons/vsc";
  import { CiCalendarDate, CiDesktop } from "react-icons/ci";
  import { BsFillPersonLinesFill } from "react-icons/bs";
  import { MdOutlineBalance } from "react-icons/md";
  import { CiUser } from "react-icons/ci";
  import { MdEventRepeat } from "react-icons/md";
  import { IoCheckmarkSharp } from "react-icons/io5";
  
  export const AdminRoutes = [
    { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
    { title: "Dashboard", url: "/dashboard/", icon: HiOutlineSquares2X2 },
    { title: "Courses", url: "/dashboard/courses", icon: BsFillPersonLinesFill },
    { title: "Modules", url: "/dashboard/modules", icon: VscFileSubmodule },
    { title: "Projects", url: "/dashboard/projects", icon: LiaProjectDiagramSolid },
    { title: "Tasks", url: "/dashboard/tasks", icon: TbListCheck },
    { title: "Marking", url: "/dashboard/marking", icon: IoCheckmarkSharp },
    { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
    { title: "Events", url: "/dashboard/events", icon: MdEventRepeat },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: HiOutlineCog6Tooth,
    },
  ];
  
  export const UserRoutes = [
    { title: "Portal", url: "/portal", icon: CiDesktop },
    { title: "Calendar", url: "/portal/calendar", icon: CiCalendarDate },
    { title: "Projects", url: "/portal/projects", icon: LiaProjectDiagramSolid },
    { title: "Curriculum", url: "/portal/curriculum", icon: IoSchoolOutline },
    { title: "On-Demand Videos", url: "/portal/videos", icon: IoVideocamOutline },
    { title: "Account", url: "/portal/account", icon: CiUser },
  ];
  
  
  export const ModeratorRoutes = [
    { title: "Portal", url: "/portal", icon: HiMiniComputerDesktop },
    { title: "Dashboard", url: "/dashboard/", icon: HiOutlineSquares2X2 },
    { title: "Balances", url: "/dashboard/balances", icon: MdOutlineBalance },
    { title: "Leaves", url: "/dashboard/leaves", icon: TbListCheck },
    { title: "Users", url: "/dashboard/users", icon: HiOutlineUserGroup },
    {
      title: "Settings",
      url: "/dashboard/settings",
      icon: HiOutlineCog6Tooth,
    },
  ];