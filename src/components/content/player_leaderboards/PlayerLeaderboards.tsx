import { ChangeEvent, useState } from "react";
import LeaderboardEntry from "./leaderboard_entry/LeaderboardEntry";
import userData from "../../../assets/fhex_data/user_data.json";

const PlayerLeaderboards = () => {
  const [inputText, setInputText] = useState("");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const sortedData = Object.values(userData).sort((a, b) => b.pp - a.pp);

  const entries = [];
  for (let i = 0; i < 1000; i++) {
    if (sortedData[i].username.toLowerCase().includes(inputText)) {
      entries.push(<LeaderboardEntry key={sortedData[i].uuid} position={i + 1} username={sortedData[i].username} pp={sortedData[i].pp}></LeaderboardEntry>);
    }
  }

  return (
    <>
      <div className="container p-2 pb-3 mt-1">
        <h3 className="text-center">Player Leaderboards</h3>
        <input className="mx-auto text-center w-50 h-50 form-control mb-2" type="search" placeholder="Search User" onChange={handleSearchInput} />
        {entries.length === 0 && <h5 className="text-center mt-3">No user found</h5>}
        {entries}
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default PlayerLeaderboards;
