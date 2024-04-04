import Container from "@/components/Common/Container";
import WelcomeBanner from "./WelcomeBanner";
import UpcomingEvents from "./UpcomingEvents";
import CurrentProjects from "./CurrentProjects";
import ProgressMarks from "./ProgressMarks";
import { CurrentProject, Events } from "@prisma/client";
import { getUserEventsData } from "@/lib/data/getEvents";
import { getUserModuleMarksData } from "@/lib/data/getMarks";
import { filterItemsByDateRange } from "@/lib/utils";
import { getUserProjectsData } from "@/lib/data/getProjects";
import { getCurrentUser } from "@/lib/session";

const PortalPage = async () => {
  const user = await getCurrentUser();
  const events = await getUserEventsData();
  const projects = await getUserProjectsData();
  const moduleMarks = await getUserModuleMarksData();

  // Get today's date
  const today = new Date();
  // Get the date after today
  const tomorrow  = new Date(today);
  tomorrow.setDate(tomorrow .getDate() + 1);
  // Filter events to get those that are starting today and  ends with a day greater than today
  const filteredEvents = filterItemsByDateRange<Events>(events, today, tomorrow );
  // Filter projects to get those that are starting today and ends with a day greater than today
  const currentProjects = filterItemsByDateRange<CurrentProject>(projects, today, tomorrow );


  return (
    <>
      <Container>
        <WelcomeBanner name={user?.name as string} />
        <div className="  rounded-lg shadow-md px-6  max-h-[80vh] overflow-y-auto bg-white dark:bg-black">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className="flex-flex-col">
              <UpcomingEvents events={filteredEvents as Events[]} />
              <CurrentProjects projects={currentProjects as CurrentProject[]} />
            </div>
            <div className="flex flex-col">
              <ProgressMarks moduleMarks={moduleMarks} />
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default PortalPage;
