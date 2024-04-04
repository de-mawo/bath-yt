import React from "react";

type Props = {
  children: React.ReactNode;
};

const ContentWrapper = ({ children }: Props) => {
  return (
    <div className="  rounded-lg shadow-md px-6 py-8 my-12 max-h-[80vh] overflow-y-auto bg-white dark:bg-black">
      <div className="relative overflow-x-auto  ">{children}</div>
    </div>
  );
};

export default ContentWrapper;
