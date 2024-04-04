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
import { Module } from "@prisma/client";

type Props = {
    modules: Module[];
  };

const AdminModulesTable = ({ modules }: Props) => {
  return (
    <TableWrapper title="All Modules">
    <div className="relative overflow-x-auto  ">
      <Table>
        <TableHeader className="whitespace-nowrap">
          <TableRow>
            <TableHead>Module Code</TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Tags</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="whitespace-nowrap">
          {modules.map((moduler) => (
            <TableRow key={moduler.id}>
              <TableCell className="font-medium">
                {" "}
                <Badge> {moduler.code}</Badge>{" "}
              </TableCell>
              <TableCell className="font-medium  relative  group">
                <Badge
                  variant="outline"
                  className="hover:bg-slate-100  group-hover:opacity-25"
                >
                  {moduler.id}
                </Badge>
                <CopyToClipBoard
                  text={moduler.id}
                  className="absolute text-rose-600 right-48 top-2 cursor-pointer invisible group-hover:visible  "
                />
              </TableCell>
              <TableCell className="font-medium">{moduler.title}</TableCell>
              <TableCell>{moduler.slug}</TableCell>
              <TableCell>
                <ul className="list-none flex flex-wrap space-x-2">
                  {moduler.tags.map((value, index) => {
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
  )
}

export default AdminModulesTable