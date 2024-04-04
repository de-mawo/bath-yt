import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Events } from "@prisma/client";

type Props = {
  event: Events;
  date: number;
};

export default function EventPopOver({ event, date }: Props) {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>
            <h1
              className={cn(
                "bg-blue-600 text-white border",
                "h-8 w-8 p-1 grid place-content-center  rounded-full cursor-pointer"
              )}
            >
              {date}{" "}
            </h1>
          </NavigationMenuTrigger>
          <NavigationMenuContent className=" shadow-lg">
            <div className=" flex flex-col w-64 p-3  space-y-3">
              <h2 className="text-sm font-extrabold leading-tight underline underline-offset-2  ">
                {event?.title}
              </h2>

              <p className="text-sm">{event?.description}</p>
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
