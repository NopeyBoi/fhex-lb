import { ChangeEvent, useState } from "react";
import LeaderboardEntry from "./leaderboard_entry/LeaderboardEntry";
import user_data from "../../../assets/user_data.json";

const PlayerLeaderboards = () => {
  const [inputText, setInputText] = useState("");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const sortedData = user_data.sort((a, b) => b.pp - a.pp);

  const entries = [];
  for (let i = 0; i < 1000; i++) {
    if (sortedData[i].username.toLowerCase().includes(inputText)) {
      entries.push(<LeaderboardEntry key={sortedData[i].uuid} position={i + 1} username={sortedData[i].username} pp={sortedData[i].pp}></LeaderboardEntry>);
    }
  }

  return (
    <>
      <div className="container p-2 pb-3 bg-body text-body rounded-bottom border border-top-0">
        <div className="d-flex px-2">
          <h3 className="">Player Leaderboards</h3>
          <input className="ms-auto w-50 form-control" type="search" placeholder="Search Username" onChange={handleSearchInput} />
        </div>
        {entries}
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default PlayerLeaderboards;
