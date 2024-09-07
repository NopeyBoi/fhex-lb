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
  const [render, rerender] = useState(false);
  const searchParams = new URLSearchParams(window.location.search);
  // Light mode settings
  const [cookies, setCookie] = useCookies(["light_mode"]);
  if (cookies.light_mode) document.body.setAttribute("data-bs-theme", "light");
  else document.body.setAttribute("data-bs-theme", "dark");
  const changeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setCookie("light_mode", event.target.checked, { path: "/" });
  };

  const showMenu = (menu: string) => {
    searchParams.set("menu", menu);
    if (menu != "tpf" && menu != "ppf") searchParams.delete("info");
    window.history.pushState(null, "", "?" + searchParams.toString());
  };

  const updateTrack = (trackName: string) => {
    searchParams.set("info", trackName);
    showMenu("tpf");
  };

  const updatePlayer = (userName: string) => {
    searchParams.set("info", userName);
    showMenu("ppf");
  };

  window.onpopstate = () => {
    rerender(!render);
  };

  return (
    <>
      <Navigation onChangeMode={changeMode} onChangeMenu={showMenu}>
        Nopeys Frosthex Tools
      </Navigation>
      {(searchParams.get("menu") === "home" || searchParams.get("menu") === null) && <Home updateTrack={updateTrack} updateUser={updatePlayer} />}
      {searchParams.get("menu") === "plb" && <PlayerLeaderboards update={updatePlayer} />}
      {searchParams.get("menu") === "trl" && <TrackList update={updateTrack} />}
      {searchParams.get("menu") === "tpf" && <TrackProfile trackName={searchParams.get("info") ?? ""} update={updatePlayer} />}
      {searchParams.get("menu") === "ppf" && <PlayerProfile userName={searchParams.get("info") ?? ""} update={updateTrack} />}
    </>
  );
}

export default App;
