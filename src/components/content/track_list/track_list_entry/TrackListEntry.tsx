import { MouseEvent } from "react";
import "./TrackListEntry.css";

interface Props {
  date: number;
  trackname: string;
  records: number;
  onClick: (event: MouseEvent<HTMLAnchorElement>) => void;
}

const TrackListEntry = ({ date, trackname, records, onClick }: Props) => {
  return (
    <div className="bg-body rounded mx-2">
      <a className="nav-link" href="#" onClick={onClick}>
        <div className="btn d-flex btn-outline-secondary rounded p-0 mt-1 text-body overflow-hidden">
          <span className="shadow border-end border-warning rounded-start text-center fw-bold" id="date">
            {new Date(date * 1000).toLocaleDateString()}
          </span>
          <span className="mx-3 fw-semibold text-truncate" id="trackname">
            {trackname}
          </span>
          <span className="ms-auto shadow border-start border-warning rounded-end px-3 fw-bold text-end" id="records">
            {records.toLocaleString("en-US", { maximumFractionDigits: 0 })} records
          </span>
        </div>
      </a>
    </div>
  );
};

export default TrackListEntry;
