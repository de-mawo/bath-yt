import TableWrapper from "@/components/Common/TableWarapper";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Task } from "@prisma/client";

type Props = {
  tasks: Task[];
};

const AdminTasksTable = ({ tasks }: Props) => {
  return (
    <TableWrapper title="All tasks">
      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Number</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Question</TableHead>
              <TableHead>Score</TableHead>
              <TableHead>Project ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {tasks.map((task) => (
              <TableRow key={task.id}>
                <TableCell className="font-medium">{task.number}</TableCell>
                <TableCell className="font-medium">{task.title}</TableCell>
                <TableCell className="font-medium ">{task.question}</TableCell>
                <TableCell>{task.possiblePoint}</TableCell>
                <TableCell>{task.projectId}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
};

export default AdminTasksTable;
