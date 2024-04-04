import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { CurrentProject,  } from "@prisma/client";
import dayjs from "dayjs";
import Link from "next/link";

type Props = {
  projects: CurrentProject[];
};

const ProjectsContent = ({ projects }: Props) => {
  return (
    <>
      {projects.map((project) => (
        <Accordion
          type="single"
          collapsible
          className="w-full"
          key={project.id}
        >
          <AccordionItem value="item-1">
            <AccordionTrigger>{project.projectTitle}</AccordionTrigger>
            <AccordionContent className="flex flex-col items-center  md:flex-row md:justify-between ">
              <div className="flex flex-col p-3">
                <div className="flex items-center space-x-2">
                  <Badge variant="outline">{project.projectCode}</Badge>{" "}
                  <Link
                    href={project.url}
                    className="text-lg font-semibold tracking-tight"
                  >
                    {project.projectTitle}
                  </Link>
                </div>
                <p className="inline-flex items-center text-xs sm:text-base">
                  started on{" "}
                  <span className="mx-1">
                    {dayjs(project.startDate).format("MMM")}{" "}
                    {dayjs(project.startDate).format("DD")},{" "}
                    {dayjs(project.startDate).format("YYYY")}
                  </span>{" "}
                  ending on{" "}
                  <span className="mx-1">
                    {dayjs(project.endDate).format("MMM")}{" "}
                    {dayjs(project.endDate).format("DD")},{" "}
                    {dayjs(project.endDate).format("YYYY")}
                  </span>{" "}
                </p>
              </div>
              {/* <Badge variant="outline">Completed</Badge>{" "} */}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </>
  );
};

export default ProjectsContent;
