import userData from "../../../assets/fhex_data/user_data.json";
import trackData from "../../../assets/fhex_data/track_data.json";
import HomeCard from "./home_card/HomeCard";

const Home = () => {
  const sortedUserData = Object.values(userData)
    .sort((a, b) => b.pp - a.pp)
    .slice(0, 10);
  const sortedTrackData = Object.values(trackData)
    .sort((a, b) => b.date_created - a.date_created)
    .slice(0, 10);

  const user_list = [];
  for (const user of sortedUserData) {
    user_list.push(
      <li className="d-flex list-group-item" key={user.uuid}>
        <span className="text-truncate fw-bold">{user.username}</span>
        <span className="ms-auto fst-italic">{user.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
      </li>
    );
  }

  const track_list = [];
  for (const track of sortedTrackData) {
    track_list.push(
      <li className="d-flex list-group-item" key={track.command_name}>
        <span className="text-truncate fw-bold">{track.display_name}</span>
        <span className="ms-auto fst-italic">{new Date(track.date_created * 1000).toLocaleDateString()}</span>
      </li>
    );
  }

  return (
    <>
      <div className="container p-2">
        <div className="px-2">
          <h3 className="text-center">Home</h3>
        </div>
        <div className="row">
          <div className="col-sm mb-4">
            <HomeCard content={user_list}>Top 10 Players</HomeCard>
          </div>
          <div className="col-sm mb-4">
            <HomeCard content={track_list}>Newest Tracks</HomeCard>
          </div>
        </div>
        <HomeCard
          content={[
            <li key="none" className="list-group-item">
              Maybe sometime in the future. ;)
            </li>,
          ]}
        >
          Recent Activity
        </HomeCard>
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default Home;
