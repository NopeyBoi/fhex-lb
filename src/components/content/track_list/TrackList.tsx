import { ChangeEvent, useEffect, useState } from "react";
import TrackListEntry from "./track_list_entry/TrackListEntry";
import { TrackData } from "../../../utils/Types";

interface Props {
  update: (trackName: string) => void;
}

const TrackList = ({ update }: Props) => {
  const [inputText, setInputText] = useState("");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const [entries, setEntries] = useState<JSX.Element[]>([]);
  if (entries.length == 0 && inputText === "") {
    for (let i = 0; i < 50; i++) {
      entries.push(
        <span className="placeholder rounded w-100 mb-1" key={"track" + i}>
          -
        </span>
      );
    }
  }

  useEffect(() => {
    const controller = new AbortController();
    const ent: JSX.Element[] = [];
    fetch("public/fhex_data/track_data.json")
      .then((res) => res.json())
      .then((data: TrackData[]) => {
        const sortedData = Object.values(data).sort((a, b) => b.records.length - a.records.length);
        for (const track of sortedData) {
          if (track.display_name.toLowerCase().includes(inputText)) {
            ent.push(<TrackListEntry key={track.command_name} date={track.date_created} trackname={track.display_name} records={track.records.length} onClick={() => update(track.command_name)}></TrackListEntry>);
          }
        }
        setEntries(ent);
      });
    return () => controller.abort();
  }, [inputText, update]);

  return (
    <>
      <div className="container p-2 pb-3 mt-1">
        <h3 className="text-center">Track List</h3>
        <input className="mx-auto text-center w-50 h-50 form-control mb-2" type="search" placeholder="Search Track" onChange={handleSearchInput} />
        <div className="placeholder-glow">{entries}</div>
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default TrackList;
