import { ChangeEvent, useEffect, useState } from "react";
import LeaderboardEntry from "./leaderboard_entry/LeaderboardEntry";
import { UserData } from "../../../utils/Types";

interface Props {
  update: (userName: string) => void;
}

const PlayerLeaderboards = ({ update }: Props) => {
  const [inputText, setInputText] = useState("");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const [entries, setEntries] = useState<JSX.Element[]>([]);
  if (entries.length == 0 && inputText === "") {
    for (let i = 0; i < 50; i++) {
      entries.push(
        <span className="placeholder rounded w-100 mb-1" key={"player" + i}>
          -
        </span>
      );
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const ent: JSX.Element[] = [];
    fetch("src/assets/fhex_data/user_data.json")
      .then((res) => res.json())
      .then((data: UserData[]) => {
        const sortedData = Object.values(data).sort((a, b) => b.pp - a.pp);
        for (let i = 0; i < 1000; i++) {
          if (sortedData[i].username.toLowerCase().includes(inputText)) {
            ent.push(<LeaderboardEntry key={sortedData[i].uuid} position={i + 1} username={sortedData[i].username} pp={sortedData[i].pp} onClick={() => update(sortedData[i].username)} />);
          }
        }
        setEntries(ent);
      });
    return () => controller.abort();
  }, [inputText, update]);

  return (
    <>
      <div className="container p-2 pb-3 mt-1">
        <h3 className="text-center">Player Leaderboards</h3>
        <input className="mx-auto text-center w-50 h-50 form-control mb-2" type="search" placeholder="Search User" onChange={handleSearchInput} />
        <div className="placeholder-glow">{entries}</div>
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default PlayerLeaderboards;
