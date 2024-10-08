import HomeCard from "../home/home_card/HomeCard";
import { UserData } from "../../../utils/Types";
import { useEffect, useState } from "react";

interface Props {
  userName: string;
  update: (trackName: string) => void;
}

const PlayerProfile = ({ userName, update }: Props) => {
  const [userData, setUserData] = useState<UserData>({ username: "", pp: 0, uuid: "", records: [] });

  useEffect(() => {
    fetch("https://fhex-data.nopey.online/users/" + userName + ".json")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, [userName]);

  const server_records: number = userData.records.reduce((a, c) => (c.position === 1 ? ++a : a), 0);
  const top10s: number = userData.records.reduce((a, c) => (c.position <= 10 ? ++a : a), 0);

  const sortedRecords = Object.values(userData.records).sort((a, b) => a.position - b.position);
  const record_list = [];
  for (const record of sortedRecords) {
    record_list.push(
      <a className="d-flex list-group-item" href="#" key={record.track_name} onClick={() => update(record.command_name)}>
        <span className="badge bg-body-secondary text-body-secondary me-2 px-3 py-2">#{record.position}</span>
        <span className="text-truncate fw-bold">{record.track_name}</span>
        <span className="ms-auto fst-italic">{record.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
      </a>
    );
    if (record_list.length >= 1000) break;
  }

  return (
    <div className="container p-2 pb-3 mt-1">
      <h3 className="text-center">{userName}'s Profile</h3>
      <div className="card shadow mb-4">
        <h5 className="card-header text-center border-warning shadow-sm">{userData.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</h5>
        <div className="d-flex">
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Server Records</li>
            <li className="list-group-item h-100">{server_records}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Top 10 Records</li>
            <li className="list-group-item h-100">{top10s}</li>
          </ul>
          <ul className="list-group list-group w-100 text-center">
            <li className="list-group-item fw-bold">Total Records</li>
            <li className="list-group-item h-100">{userData.records.length}</li>
          </ul>
        </div>
      </div>
      <HomeCard content={record_list}>Records</HomeCard>
    </div>
  );
};

export default PlayerProfile;
