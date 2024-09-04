import "./LeaderboardEntry.css";

interface Props {
  position: number;
  username: string;
  pp: number;
}

const LeaderboardEntry = ({ position, username, pp }: Props) => {
  return (
    <div className="btn d-flex btn-outline-secondary rounded p-0 mt-1 mx-2 text-body">
      <span className="shadow border-end border-secondary-subtle rounded-start text-center fw-bold" id="position">
        #{position}
      </span>
      <span className="mx-3 fw-semibold" id="username">
        {username}
      </span>
      <span className="ms-auto shadow border-start border-secondary-subtle rounded-end px-3 fw-bold text-end" id="pp">
        {pp.toFixed(2)}pp
      </span>
    </div>
  );
};

export default LeaderboardEntry;
