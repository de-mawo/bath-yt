import { ModuleMarks } from "@prisma/client";
import { TbTallymarks } from "react-icons/tb";

type Props = {
  moduleMarks: ModuleMarks[];
};

const ProgressMarks = ({ moduleMarks }: Props) => {
  return (
    <>
      <div className="flex items-center justify-between p-3   ">
        <div className="flex items-center space-x-3">
          <TbTallymarks />
          <h3 className="text-lg font-semibold tracking-tight">
            Progress Marks
          </h3>
        </div>

        <button className="  text-rose-600 p-2">
          {/* <h3 className="text-lg font-semibold tracking-tight">98%</h3> */}
        </button>
      </div>
      <hr />
      {moduleMarks.map((mark) => (
        <div className="flex items-center justify-between p-3" key={mark.id}>
          <h3 className=" tracking-tight">{mark.moduleTitle}</h3>
          <h3 className="text-lg  tracking-tight">{mark.averageMarks.toFixed(2)}</h3>
        </div>
      ))}
    </>
  );
};

export default ProgressMarks;
