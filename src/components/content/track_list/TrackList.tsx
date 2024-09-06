import { ChangeEvent, useState } from "react";
import TrackListEntry from "./track_list_entry/TrackListEntry";
import trackData from "../../../assets/fhex_data/track_data.json";

interface Props {
  update: (trackName: string) => void;
}

const TrackList = ({ update }: Props) => {
  const [inputText, setInputText] = useState("");
  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value.toLowerCase());
  };

  const entries = [];
  const sortedData = Object.values(trackData).sort((a, b) => b.records.length - a.records.length);
  for (const track of sortedData) {
    if (track.display_name.toLowerCase().includes(inputText)) {
      entries.push(<TrackListEntry key={track.command_name} date={track.date_created} trackname={track.display_name} records={track.records.length} onClick={() => update(track.command_name)}></TrackListEntry>);
    }
  }

  return (
    <>
      <div className="container p-2 pb-3 mt-1">
        <h3 className="text-center">Track List</h3>
        <input className="mx-auto text-center w-50 h-50 form-control mb-2" type="search" placeholder="Search Track" onChange={handleSearchInput} />
        {entries.length === 0 ? <h5 className="text-center pt-2">No track found.</h5> : entries}
      </div>
      <p className="text-center my-2">Made by Nopey</p>
    </>
  );
};

export default TrackList;
