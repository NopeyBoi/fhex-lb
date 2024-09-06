import userData from "../../../assets/fhex_data/user_data.json";
import trackData from "../../../assets/fhex_data/track_data.json";
import HomeCard from "./home_card/HomeCard";

interface Props {
  updateTrack: (trackName: string) => void;
  updateUser: (userName: string) => void;
}

const Home = ({ updateTrack, updateUser }: Props) => {
  const sortedUserData = Object.values(userData)
    .sort((a, b) => b.pp - a.pp)
    .slice(0, 10);
  const sortedTrackData = Object.values(trackData)
    .sort((a, b) => b.date_created - a.date_created)
    .slice(0, 10);

  const user_list = [];
  for (const user of sortedUserData) {
    user_list.push(
      <a className="d-flex list-group-item" href="#" key={user.uuid} onClick={() => updateUser(user.username)}>
        <span className="text-truncate fw-bold">{user.username}</span>
        <span className="ms-auto fst-italic">{user.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
      </a>
    );
  }

  const track_list = [];
  for (const track of sortedTrackData) {
    track_list.push(
      <a className="d-flex list-group-item" href="#" key={track.command_name} onClick={() => updateTrack(track.command_name)}>
        <span className="text-truncate fw-bold">{track.display_name}</span>
        <span className="ms-auto fst-italic">{new Date(track.date_created * 1000).toLocaleDateString()}</span>
      </a>
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
