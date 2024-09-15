import { ChangeEvent, useEffect, useState } from "react";
import LeaderboardEntry from "./leaderboard_entry/LeaderboardEntry";
import { UserOverviewData } from "../../../utils/Types";

interface Props {
  update: (userName: string) => void;
}

const PlayerLeaderboards = ({ update }: Props) => {
  const [userData, setUserData] = useState<UserOverviewData[]>([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    fetch("https://45.131.66.225/user_overview.json")
      .then((res) => res.json())
      .then((data) => setUserData(data));
  }, []);

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const entries = [];
  const sortedData = Object.values(userData).sort((a, b) => b.pp - a.pp);
  let count = 1;
  for (const user of sortedData) {
    if (entries.length >= 1000) break;
    if (user.username.toLowerCase().includes(inputText)) {
      entries.push(<LeaderboardEntry key={user.uuid} position={count} username={user.username} pp={user.pp} onClick={() => update(user.username)} />);
    }
    count++;
  }

  return (
    <>
      <div className="container p-2 pb-3 mt-1">
        <h3 className="text-center">Player Leaderboards</h3>
        <input className="mx-auto text-center w-50 h-50 form-control mb-2" type="search" placeholder="Search User" onChange={handleSearchInput} />
        {entries.length === 0 ? <h5 className="text-center pt-2">No player found.</h5> : entries}
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default PlayerLeaderboards;
