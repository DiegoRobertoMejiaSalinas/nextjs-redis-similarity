import { FC, ReactNode } from "react";

interface layoutProps {
  children: ReactNode;
}

const layout: FC<layoutProps> = ({ children }: layoutProps) => {
  return <div className="pt-20">{children}</div>;
};

export default layout;
