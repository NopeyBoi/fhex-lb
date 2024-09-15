import HomeCard from "../home/home_card/HomeCard";
import { convertTime } from "../../../utils/Utils";
import { useEffect, useState } from "react";
import { TrackData } from "../../../utils/Types";

interface Props {
  trackName: string;
  update: (userName: string) => void;
}

const TrackProfile = ({ trackName, update }: Props) => {
  const [trackData, setTrackData] = useState<TrackData>({ command_name: "", display_name: "", date_created: 0, type: "", open: false, owner: "", tags: [], records: [] });
  const [author, setAuthor] = useState("");

  useEffect(() => {
    fetch("https://fhex-data.nopey.online/tracks/" + trackName + ".json")
      .then((res) => res.json())
      .then((data) => setTrackData(data));
    fetch("https://api.minetools.eu/uuid/" + trackData.owner)
      .then((res) => res.json())
      .then((data) => setAuthor(data.name));
  }, [trackName, trackData]);

  const sortedRecords = Object.values(trackData.records).sort((a, b) => b.pp - a.pp);
  const record_list = [];
  for (const record of sortedRecords) {
    record_list.push(
      <a className="d-flex list-group-item" href="#" key={record.uuid} onClick={() => update(record.username)}>
        <span className="badge bg-body-secondary text-body-secondary me-2 px-3 py-2">#{record_list.length + 1}</span>
        <span className="text-truncate fw-bold">{record.username}</span>
        <span className="ms-auto fst-italic">{record.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
        <span className="badge bg-body-secondary text-body-secondary ms-2 px-3 py-2">{convertTime(record.time)}</span>
      </a>
    );
    if (record_list.length >= 1000) break;
  }

  return (
    <div className="container p-2 pb-3 mt-1">
      <h3 className="text-center">{trackName} Track Info</h3>
      <div className="card shadow mb-4">
        <h5 className="card-header text-center border-warning shadow-sm">Made by {author}</h5>
        <div className="d-flex">
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Created on</li>
            <li className="list-group-item h-100">{new Date(trackData.date_created * 1000).toLocaleDateString()}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Record count</li>
            <li className="list-group-item h-100">{trackData.records.length.toLocaleString("en-US")}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Tags</li>
            <li className="list-group-item h-100">{trackData.tags.length > 0 ? trackData.tags.join(" - ") : "NONE"}</li>
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
