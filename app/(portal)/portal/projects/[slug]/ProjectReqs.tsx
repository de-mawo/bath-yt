import { Project } from "@prisma/client";
import Link from "next/link";

type Props = {
  project: Project;
};

const ProjectReqs = ({ project }: Props) => {
  return (
    <>
      <div className="py-5">
        <h3 className="mb-2 text-lg font-extrabold leading-tight  lg:text-2xl">
          Project Description
        </h3>
        <p>{project.description}</p>
      </div>
      <div className="py-5">
        <h3 className="mb-2 text-lg font-extrabold leading-tight  lg:text-2xl">
          Resources
        </h3>
        <ul className=" space-y-1 text-gray-500 list-disc list-inside ">
          {project.resources.map((res, i) => (
            <li key={i}>
              <Link href={res} target="_blank">
                {res}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-5">
        <h3 className="mb-2 text-lg font-extrabold leading-tight  lg:text-2xl">
          Requirements
        </h3>
        <ul className=" space-y-1 text-gray-500 list-disc list-inside ">
          {project.requirements.map((res, i) => (
            <li key={i}>{res}</li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ProjectReqs;
