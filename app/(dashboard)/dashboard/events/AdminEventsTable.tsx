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
import { Events } from "@prisma/client";
import dayjs from "dayjs";
import { FaRegTrashCan } from "react-icons/fa6";
import DeleteEvent from "./DeleteEvent";

type Props = {
  events: Events[];
};

const AdminEventsTable = ({ events }: Props) => {
  return (
    <TableWrapper title="All Events">
      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Course</TableHead>
              <TableHead>Venue</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead>Event Start Date</TableHead>
              <TableHead>Event End Date</TableHead>
              <TableHead className="">Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {events.map((event) => (
              <TableRow key={event.id}>
                <TableCell className="font-medium">
                  {" "}
                  <Badge> {event.course}</Badge>{" "}
                </TableCell>
                <TableCell className="font-medium capitalize">
                  {event.venue}
                </TableCell>
                <TableCell className="font-medium">{event.title}</TableCell>
                <TableCell>{event.description}</TableCell>
                <TableCell>{event.cohort}</TableCell>
                <TableCell>
                  {dayjs(event.startDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell>
                  {dayjs(event.endDate).format("DD/MM/YYYY")}
                </TableCell>
                <TableCell className="">
                  <DeleteEvent id={event.id}/>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
};

export default AdminEventsTable;
