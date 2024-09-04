import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import PlayerLeaderboards from "./components/content/player_leaderboards/PlayerLeaderboards";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/content/home/Home";
import TrackList from "./components/content/track_list/TrackList";
import TrackProfile from "./components/content/track_profile/TrackProfile";

function App() {
  const [cookies, setCookie] = useCookies(["light_mode"]);
  if (cookies.light_mode) document.body.setAttribute("data-bs-theme", "light");
  else document.body.setAttribute("data-bs-theme", "dark");

  const [homeVisible, setHomeVisibility] = useState(true);
  const showHome = () => {
    setHomeVisibility(true);
    setPlbVisibility(false);
    setTrlVisibility(false);
    setTpfVisibility(false);
  };

  const [plbVisible, setPlbVisibility] = useState(false);
  const showPlb = () => {
    setHomeVisibility(false);
    setPlbVisibility(true);
    setTrlVisibility(false);
    setTpfVisibility(false);
  };

  const [trlVisible, setTrlVisibility] = useState(false);
  const showTrl = () => {
    setHomeVisibility(false);
    setPlbVisibility(false);
    setTrlVisibility(true);
    setTpfVisibility(false);
  };

  const [tpfVisible, setTpfVisibility] = useState(false);
  const [currentTrack, setCurrentTrack] = useState("");
  const showTpf = () => {
    setHomeVisibility(false);
    setPlbVisibility(false);
    setTrlVisibility(false);
    setTpfVisibility(true);
  };

  const changeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setCookie("light_mode", event.target.checked, { path: "/" });
  };

  const updateTrack = (trackName: string) => {
    setCurrentTrack(trackName);
    showTpf();
  };

  return (
    <>
      <Navigation onChange={changeMode} showHome={showHome} showPlb={showPlb} showTrl={showTrl}>
        Nopeys Frosthex Tools
      </Navigation>
      {homeVisible && <Home />}
      {plbVisible && <PlayerLeaderboards />}
      {trlVisible && <TrackList update={updateTrack} />}
      {tpfVisible && <TrackProfile trackName={currentTrack} />}
    </>
  );
}

export default App;
