import Container from "@/components/Common/Container";
import React from "react";
import AddCourses from "./AddCourses";
import AdminCoursesTable from "./AdminCoursesTable";
import { Course } from "@prisma/client";
import { getCoursesData } from "@/lib/data/getCourses";
import AddStudentToCourse from "./AddStudentToCourse";

const CoursesPage = async () => {
  const courses = await getCoursesData();
  return (
    <>
      <Container>
        <div className="flex flex-wrap justify-between items-center my-6 ">
          {/* LEFT SIDE */}
          <div className="flex justify-start items-center">
            <h2 className="text-xl font-extrabold leading-tight  lg:text-2xl">
              Courses
            </h2>
          </div>

          {/* RIGHT SIDE  */}

          <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-6 ">
            <AddStudentToCourse/>
            <AddCourses />
          </div>
        </div>
        <AdminCoursesTable courses={courses as Course[]} />
      </Container>
    </>
  );
};

export default CoursesPage;
