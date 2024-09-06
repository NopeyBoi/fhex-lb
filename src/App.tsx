import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import PlayerLeaderboards from "./components/content/player_leaderboards/PlayerLeaderboards";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/content/home/Home";
import TrackList from "./components/content/track_list/TrackList";
import TrackProfile from "./components/content/track_profile/TrackProfile";
import PlayerProfile from "./components/content/player_profile/PlayerProfile";

function App() {
  // Light mode settings
  const [cookies, setCookie] = useCookies(["light_mode"]);
  if (cookies.light_mode) document.body.setAttribute("data-bs-theme", "light");
  else document.body.setAttribute("data-bs-theme", "dark");
  const changeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setCookie("light_mode", event.target.checked, { path: "/" });
  };

  // Menu settings
  const [currentMenu, setCurrentMenu] = useState("home");
  const showMenu = (menu: string) => {
    setCurrentMenu(menu);
  };

  const [currentTrack, setCurrentTrack] = useState("");
  const updateTrack = (trackName: string) => {
    setCurrentTrack(trackName);
    showMenu("tpf");
  };

  const [currentPlayer, setCurrentPlayer] = useState("");
  const updatePlayer = (userName: string) => {
    setCurrentPlayer(userName);
    showMenu("ppf");
  };

  return (
    <>
      <Navigation onChangeMode={changeMode} onChangeMenu={showMenu}>
        Nopeys Frosthex Tools
      </Navigation>
      {currentMenu === "home" && <Home updateTrack={updateTrack} updateUser={updatePlayer} />}
      {currentMenu === "plb" && <PlayerLeaderboards update={updatePlayer} />}
      {currentMenu === "trl" && <TrackList update={updateTrack} />}
      {currentMenu === "tpf" && <TrackProfile trackName={currentTrack} update={updatePlayer} />}
      {currentMenu === "ppf" && <PlayerProfile userName={currentPlayer} update={updateTrack} />}
    </>
  );
}

export default App;
