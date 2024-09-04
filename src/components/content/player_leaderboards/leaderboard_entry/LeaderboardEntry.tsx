import "./LeaderboardEntry.css";

interface Props {
  position: number;
  username: string;
  pp: number;
}

const LeaderboardEntry = ({ position, username, pp }: Props) => {
  return (
    <div className="bg-body rounded mx-2">
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
    </div>
  );
};

export default LeaderboardEntry;
