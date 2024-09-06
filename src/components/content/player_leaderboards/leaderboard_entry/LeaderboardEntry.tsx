import { MouseEvent } from "react";
import "./LeaderboardEntry.css";

interface Props {
  position: number;
  username: string;
  pp: number;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const LeaderboardEntry = ({ position, username, pp, onClick }: Props) => {
  return (
    <div className="bg-body rounded mx-2">
      <a className="nav-link" href="#" onClick={onClick}>
        <div className="btn d-flex btn-outline-secondary rounded p-0 mt-1 text-body overflow-hidden">
          <span className="shadow border-end border-warning rounded-start text-center fw-bold" id="position">
            #{position}
          </span>
          <span className="mx-3 fw-semibold text-truncate" id="username">
            {username}
          </span>
          <span className="ms-auto shadow border-start border-warning rounded-end px-3 fw-bold text-end" id="pp">
            {pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp
          </span>
        </div>
      </a>
    </div>
  );
};

export default LeaderboardEntry;
