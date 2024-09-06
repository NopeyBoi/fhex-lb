import HomeCard from "../home/home_card/HomeCard";
import trackData from "../../../assets/fhex_data/track_data.json";
import { convertTime } from "../../../utils/Utils";

interface Props {
  trackName: string;
}

interface RecordData {
  pp: number;
  uuid: string;
  username: string;
  time: number;
}

interface TrackData {
  command_name: string;
  display_name: string;
  date_created: number;
  type: string;
  open: boolean;
  owner: string;
  tags: string[];
  records: RecordData[];
}

const TrackProfile = ({ trackName }: Props) => {
  const track: TrackData = trackData[trackName as keyof typeof trackData];
  const sortedRecords = Object.values(track.records).sort((a, b) => b.pp - a.pp);
  const record_list = [];
  for (const record of sortedRecords) {
    record_list.push(
      <li className="d-flex list-group-item" key={record.uuid}>
        <span className="badge bg-body-secondary text-body-secondary me-2 px-3 py-2">#{record_list.length + 1}</span>
        <span className="text-truncate fw-bold">{record.username}</span>
        <span className="ms-auto fst-italic">{record.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
        <span className="badge bg-body-secondary text-body-secondary ms-2 px-3 py-2">{convertTime(record.time)}</span>
      </li>
    );
    if (record_list.length >= 1000) break;
  }

  return (
    <div className="container p-2 pb-3 mt-1">
      <h3 className="text-center">{trackName} Track Info</h3>
      <div className="card shadow mb-4">
        <h5 className="card-header text-center border-warning shadow-sm">Made by {track.owner}</h5>
        <div className="d-flex">
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Created on</li>
            <li className="list-group-item h-100">{new Date(track.date_created * 1000).toLocaleDateString()}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Record count</li>
            <li className="list-group-item h-100">{track.records.length.toLocaleString("en-US")}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Tags</li>
            <li className="list-group-item h-100">{track.tags.join(" - ")}</li>
          </ul>
        </div>
      </div>
      <HomeCard content={record_list}>
        Records <span className="d-block fs-6">(limited to 1000)</span>
      </HomeCard>
    </div>
  );
};

export default TrackProfile;
