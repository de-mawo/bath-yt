import Container from "@/components/Common/Container";
import ContentWrapper from "@/components/Common/ContentWrapper";
import ProjectsContent from "./ProjectsContent";
import { CurrentProject } from "@prisma/client";
import { getUserProjectsData } from "@/lib/data/getProjects";

const UserProjectsPage = async () => {
  const projects = await getUserProjectsData();

  // Filter past projects based on startDate and endDate
  const currentDate = new Date();
  const filteredProjects = projects.filter(
    (project) =>
      project.startDate <= currentDate || project.endDate <= currentDate
  );

  return (
    <>
      <Container>
        <div className="flex flex-wrap justify-between items-center my-6 ">
          {/* LEFT SIDE */}
          <div className="flex justify-start items-center">
            <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
              My Projects
            </h2>
          </div>
        </div>
        <ContentWrapper>
          <div className="flex items-center justify-start p-3   ">
            <h3 className="text-lg font-semibold tracking-tight">
              All Projects
            </h3>
          </div>
          <hr />
          <ProjectsContent projects={filteredProjects as CurrentProject[]} />
        </ContentWrapper>
      </Container>
    </>
  );
};

export default UserProjectsPage;
