import { CopyToClipBoard } from "@/components/Common/CopyToClipBoard";
import TableWrapper from "@/components/Common/TableWarapper";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Course } from "@prisma/client";


type Props = {
  courses: Course[];
};

const AdminCoursesTable = ({ courses }: Props) => {
  return (
    <TableWrapper title="All Courses">
      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Course Code</TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Tags</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {courses.map((course) => (
              <TableRow key={course.id}>
                <TableCell className="font-medium">
                  {" "}
                  <Badge> {course.code}</Badge>{" "}
                </TableCell>
                <TableCell className="font-medium  relative  group">
                  <Badge
                    variant="outline"
                    className="hover:bg-slate-100  group-hover:opacity-25"
                  >
                    {course.id}
                  </Badge>
                  <CopyToClipBoard
                    text={course.id}
                    className="absolute text-rose-600 right-48 top-2 cursor-pointer invisible group-hover:visible  "
                  />
                </TableCell>
                <TableCell className="font-medium">{course.title}</TableCell>
                <TableCell>{course.slug}</TableCell>
                <TableCell>
                  <ul className="list-none flex flex-wrap space-x-2">
                    {course.tags.map((value, index) => {
                      return (
                        <li key={index} className="">
                          <Badge>{value}</Badge>
                        </li>
                      );
                    })}
                  </ul>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
};

export default AdminCoursesTable;
