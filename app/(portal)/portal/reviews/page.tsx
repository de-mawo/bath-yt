import Container from "@/components/Common/Container";
import ContentWrapper from "@/components/Common/ContentWrapper";
import { ReviewSelector } from "./ReviewSelector";
import { getProjectTaskData } from "@/lib/data/getTasks";
import { getOneProjectMarksData } from "@/lib/data/getMarks";
import { ProjectMarks, User } from "@prisma/client";
import { getUserInfo } from "@/lib/data/getUsers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { FaUserCheck } from "react-icons/fa";

export default async function SingleProjectPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await getUserInfo();

  const { id: LoggedInUserId } = user as User;

  const userId = searchParams.userId as string;
  const projectId = searchParams.proId as string;
  const courseCode = searchParams.course as string;
  const tasks = await getProjectTaskData(projectId);
  const projectmarks = await getOneProjectMarksData({ projectId, userId });

  if (userId === LoggedInUserId) {
    redirect(`/portal`);
  }



  return (
    <Container>
      <div className="flex flex-col space-y-4 my-6 ">
        <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
          Reviews
        </h2>
      </div>

      <ContentWrapper>
        <div>
          <h4 className="font-semibold">Award Marks and Review</h4>
          <p className="inline-flex items-center space-x-2 "> <FaUserCheck /> <span>{projectmarks?.user.name} </span> </p>
          <h4 className="font-semibold mt-4">Completed Work links:</h4>
          <ul className="list-disc">
            {projectmarks?.links.map((link, i) => (
              <li key={i}>
                <Link href={link} target="_blank" className="text-rose-700 underline">
                  {link}
                </Link>{" "}
              </li>
            ))}
          </ul>
        </div>
        <ReviewSelector
          tasks={tasks}
          projectmarks={projectmarks as ProjectMarks}
          courseCode={courseCode}
          userId={userId}
          projectId={projectId}
        />
      </ContentWrapper>
    </Container>
  );
}
