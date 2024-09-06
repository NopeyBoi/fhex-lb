import HomeCard from "../home/home_card/HomeCard";
import userData from "../../../assets/fhex_data/user_data.json";

interface Props {
  userName: string;
}

interface RecordData {
  track_name: string;
  position: number;
  pp: number;
}

interface UserData {
  username: string;
  pp: number;
  uuid: string;
  records: RecordData[];
}

const PlayerProfile = ({ userName }: Props) => {
  const user: UserData = userData[userName as keyof typeof userData];
  const server_records: number = user.records.reduce((a, c) => (c.position === 1 ? ++a : a), 0);
  const top10s: number = user.records.reduce((a, c) => (c.position <= 10 ? ++a : a), 0);

  const sortedRecords = Object.values(user.records).sort((a, b) => a.position - b.position);
  const record_list = [];
  for (const record of sortedRecords) {
    record_list.push(
      <li className="d-flex list-group-item" key={record.track_name}>
        <span className="badge bg-body-secondary text-body-secondary me-2 px-3 py-2">#{record.position}</span>
        <span className="text-truncate fw-bold">{record.track_name}</span>
        <span className="ms-auto fst-italic">{record.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
      </li>
    );
    if (record_list.length >= 1000) break;
  }

  return (
    <div className="container p-2 pb-3 mt-1">
      <h3 className="text-center">Player Profile</h3>
      <div className="card shadow mb-4">
        <h5 className="card-header text-center border-warning shadow-sm">{userName}'s Info</h5>
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
            <li className="list-group-item h-100">{user.records.length}</li>
          </ul>
        </div>
      </div>
      <HomeCard content={record_list}>Records</HomeCard>
    </div>
  );
};

export default PlayerProfile;
