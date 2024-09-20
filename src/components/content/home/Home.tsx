import { CheatSuspicionData, TrackOverviewData, UserOverviewData } from "../../../utils/Types";
import HomeCard from "./home_card/HomeCard";
import { useState, useEffect } from "react";

interface Props {
  updateTrack: (trackName: string) => void;
  updateUser: (userName: string) => void;
}

const Home = ({ updateTrack, updateUser }: Props) => {
  const [userData, setUserData] = useState<UserOverviewData[]>([]);
  const [userLoading, setUserLoading] = useState(true);
  const [trackData, setTrackData] = useState<TrackOverviewData[]>([]);
  const [trackLoading, setTrackLoading] = useState(true);
  const [cheatData, setCheatData] = useState<CheatSuspicionData[]>([]);
  const [cheatLoading, setCheatLoading] = useState(true);
  const [cheatVisible, setCheatVisible] = useState(true);

  useEffect(() => {
    document.addEventListener("keydown", keyPressHandler, true);
    fetch("https://fhex-data.nopey.online/track_overview.json")
      .then((res) => res.json())
      .then((data) => {
        setTrackData(data);
        setTrackLoading(false);
      });
    fetch("https://fhex-data.nopey.online/user_overview.json")
      .then((res) => res.json())
      .then((data) => {
        setUserData(data);
        setUserLoading(false);
      });
    fetch("https://fhex-data.nopey.online/cheat_suspicions.json")
      .then((res) => res.json())
      .then((data) => {
        setCheatData(data);
        setCheatLoading(false);
      });
  }, []);

  const sortedUserData = Object.values(userData)
    .sort((a, b) => b.pp - a.pp)
    .slice(0, 1000);
  const sortedTrackData = Object.values(trackData).sort((a, b) => b.date_created - a.date_created);
  const sortedCheatData = Object.values(cheatData).sort((a, b) => a.username.localeCompare(b.username));

  const user_list = [];
  for (const user of sortedUserData) {
    if (user_list.length < 10) {
      user_list.push(
        <a className="d-flex list-group-item" href="#" key={user.uuid} onClick={() => updateUser(user.username)}>
          <span className="text-truncate fw-bold">{user.username}</span>
          <span className="ms-auto fst-italic">{user.pp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}pp</span>
        </a>
      );
    }
  }

  const track_list = [];
  for (const track of sortedTrackData) {
    if (track_list.length < 10) {
      track_list.push(
        <a className="d-flex list-group-item" href="#" key={track.command_name} onClick={() => updateTrack(track.command_name)}>
          <span className="text-truncate fw-bold">{track.display_name}</span>
          <span className="ms-auto fst-italic">{new Date(track.date_created * 1000).toLocaleDateString()}</span>
        </a>
      );
    }
  }

  const cheater_list = [];
  for (const cheat of sortedCheatData) {
    if (cheat.reason == "HIGH_AVERAGE") {
      cheater_list.push(
        <a className="d-flex list-group-item" href="#" key={cheat.username} onClick={() => updateUser(cheat.username)}>
          <span className="text-truncate fw-bold">{cheat.username}</span>
          <span className="ms-auto fst-italic">Very high average pp</span>
        </a>
      );
    }
    if (cheat.reason == "SERVER_RECORD") {
      cheater_list.push(
        <a className="d-flex list-group-item" href="#" key={cheat.username} onClick={() => updateTrack(cheat.track_name)}>
          <span className="text-truncate fw-bold">{cheat.username}</span>
          <span className="ms-auto fst-italic">Potentially cheated server record</span>
        </a>
      );
    }
  }

  const keyPressHandler = (e: KeyboardEvent) => {
    if (e.key == "F9") {
      setCheatVisible((c) => !c);
    }
  };

  return (
    <>
      <div className="container p-2">
        <div className="px-2">
          <h3 className="text-center">Home</h3>
        </div>
        <div className="row">
          <div className="col-sm mb-4">
            <HomeCard content={userLoading ? [<span className="text-center">Loading players...</span>] : user_list}>Top 10 Players</HomeCard>
          </div>
          <div className="col-sm mb-4">
            <HomeCard content={trackLoading ? [<span className="text-center">Loading tracks...</span>] : track_list}>Newest Tracks</HomeCard>
          </div>
        </div>
        <div className="col-sm mb-4">
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
        <div className="col-sm">
          {cheatVisible && (
            <HomeCard content={cheatLoading ? [<span className="text-center">Loading suspisions...</span>] : cheater_list}>
              Cheater Suspicion <span className="fs-6 fw-light">(not necessarily hacking)</span>
            </HomeCard>
          )}
        </div>
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default Home;
