import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  content: JSX.Element[];
}

const HomeCard = ({ children, content }: Props) => {
  return (
    <div className="card shadow trans">
      <h5 className="card-header text-center border-warning shadow-sm">{children}</h5>
      <div className="card-body">
        <ul className="list-group list-group-flush">{content}</ul>
      </div>
    </div>
  );
};

export default HomeCard;
