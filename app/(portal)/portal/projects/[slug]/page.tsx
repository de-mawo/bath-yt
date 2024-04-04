import Container from "@/components/Common/Container";
import ContentWrapper from "@/components/Common/ContentWrapper";
import TaskComponent from "./TaskComponent";
import { getProjectData } from "@/lib/data/getProjects";
import ProjectBanner from "./ProjectBanner";
import { Project, Task, User } from "@prisma/client";
import ProjectReqs from "./ProjectReqs";
import RequestMarking from "./RequestMarking";
import { getProjectTaskData } from "@/lib/data/getTasks";
import AddProjectWorkLinks from "./AddProjectWorkLinks";
import { getUserInfo } from "@/lib/data/getUsers";
import { getOneProjectMarksData } from "@/lib/data/getMarks";
import { getCurrentProject } from "@/lib/data/getCurrentProjects";

export default async function SingleProjectPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserInfo();

  const { id: userId, course, cohort } = user as User;

  const projectId = searchParams.id as string;

  // Get today's date
  const today = new Date();

  const currentProject = await getCurrentProject({ course, cohort, projectId });

  const project = await getProjectData(projectId as string);
  const tasks = await getProjectTaskData(projectId as string);
  const getIsMarked = await getOneProjectMarksData({ userId, projectId });
  const markLinks = getIsMarked?.links;

  let isCompleted: boolean = false;
  if (getIsMarked) {
    isCompleted = getIsMarked.isCompleted;
  }

  return (
    <Container>
      {(currentProject?.startDate as Date) > today ? (
        <div className="p-5 mt-3 bg-rose-200 text-rose-600">
          {" "}
          <p className="font-bold">Project Has Not Started Yet 😎 </p>{" "}
        </div>
      ) : (
        <>
          <ProjectBanner project={project as Project} />
          <ContentWrapper>
            <ProjectReqs project={project as Project} />
            <h3 className="mb-2 text-lg font-extrabold leading-tight  lg:text-2xl">
              Tasks
            </h3>
            <TaskComponent tasks={tasks as Task[]} />
            {!isCompleted ? (
              <>
                {(markLinks ?? []).length > 0 ? (
                  <p>Links Already added </p>
                ) : (
                  <AddProjectWorkLinks
                    project={project as Project}
                    userId={userId}
                  />
                )}
                {/* <RequestMarking
                  projectId={projectId as string}
                  userId={userId}
                  course={course as string}
                /> */}
              </>
            ) : (
              <p className="my-6 text-lg text-rose-700 font-extrabold leading-tight  lg:text-2xl">
                This Project Has been graded !!
              </p>
            )}
          </ContentWrapper>
        </>
      )}
    </Container>
  );
}
