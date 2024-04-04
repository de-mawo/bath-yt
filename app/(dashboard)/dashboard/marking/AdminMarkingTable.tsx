import TableWrapper from "@/components/Common/TableWarapper";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProjectMarksUserType } from "@/types";
import Link from "next/link";
import { IoCheckmarkSharp, IoCloseSharp } from "react-icons/io5";

type Props = {
  marking: ProjectMarksUserType[];
};

const AdminMarkingTable = ({ marking }: Props) => {
  return (
    <TableWrapper title="All Markings">
      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Marks ID</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Project</TableHead>
              <TableHead>Average Points</TableHead>
              <TableHead>isMarked</TableHead>
              <TableHead>Mark/Review</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {marking.map((mark) => (
              <TableRow key={mark.id}>
                <TableCell className="font-medium">{mark.id}</TableCell>
                <TableCell className="font-medium">
                  {" "}
                  <Badge> {mark.user.name}</Badge>{" "}
                </TableCell>
                <TableCell className="font-medium">
                  {mark.projectTitle}
                </TableCell>
                <TableCell className="font-medium">
                  {mark.averagePoints}
                </TableCell>
                <TableCell className="font-medium">
                {mark.isCompleted ? <IoCheckmarkSharp /> : <IoCloseSharp />}
                </TableCell>
                <TableCell className="font-medium">
                  {mark.projectTitle}
                </TableCell>

                <TableCell className="font-medium">
                  <Link
                    href={`${process.env.NEXT_PUBLIC_APP_URL}/portal/reviews?proId=${mark.projectId}&userId=${mark.user.id}&course=${mark.user.course}`}
                    target="_blank"
                  >
                    <Button>View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
};

export default AdminMarkingTable;
