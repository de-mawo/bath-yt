
import TableWrapper from "@/components/Common/TableWarapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import AdminEditUser from "./AdminEditUser";

type Props = {
  users: User[];
};

const AdminUsersTable = ({ users }: Props) => {
  return (
    <TableWrapper title="All Users">
      <div className="relative overflow-x-auto  ">
        <Table>
          <TableHeader className="whitespace-nowrap">
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Cohort</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Edit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="whitespace-nowrap">
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">
                <Avatar>
              <AvatarImage src={user?.image as string} alt={user?.name as string} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
                    </TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell className="font-medium ">{user.email}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.course}</TableCell>
                <TableCell>{user.cohort}</TableCell>
                <TableCell> <Badge variant='secondary'> {user.role} </Badge> </TableCell>
                <TableCell> <AdminEditUser user={user} /> </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TableWrapper>
  );
};

export default AdminUsersTable;
