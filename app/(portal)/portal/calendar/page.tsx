import Container from "@/components/Common/Container";
import CustomCalendar from "./CustomCalendar";
import { getUserInfo } from "@/lib/data/getUsers";
import { getUserEventsData } from "@/lib/data/getEvents";
import { User } from "@prisma/client";

const CalendarPage = async () => {
  const user = await getUserInfo();
  // Check if user is null before destructure
  if (!user) {
    // Handle the case where user is null, for example, redirect to login page or display an error message
    return <div>User info not available</div>;
  }

  const { course, cohort } = user as User;

  const events = await getUserEventsData();

  return (
    <>
      <Container>
        <div className="flex flex-wrap justify-between items-center my-6 ">
          {/* LEFT SIDE */}
          <div className="flex justify-start items-center">
            <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
              My Planning
            </h2>
          </div>

          {/* RIGHT SIDE  */}

          <div className="flex items-center space-x-3 md:space-x-6"></div>
        </div>
      </Container>
      <CustomCalendar events={events} />
    </>
  );
};

export default CalendarPage;
