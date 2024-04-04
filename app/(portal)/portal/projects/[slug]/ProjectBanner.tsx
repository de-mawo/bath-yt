import { Badge } from "@/components/ui/badge";
import { Project } from "@prisma/client";

type Props = {
  project: Project;
};

const ProjectBanner = ({ project }: Props) => {
  return (
    <div className="flex flex-col space-y-4 my-6 ">
      {/* LEFT SIDE */}
      <div className="flex  items-center space-x-2">
        <Badge>{project.code}</Badge>
        <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
          {project.title}
        </h2>
      </div>
      <div className="flex  items-center space-x-2">
        {project.tags.map((tag, i) => (
          <Badge variant="destructive" key={i}>
            {tag}{" "}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default ProjectBanner;
