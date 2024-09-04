import { ChangeEvent, useState } from "react";
import { useCookies } from "react-cookie";
import "./App.css";
import PlayerLeaderboards from "./components/content/player_leaderboards/PlayerLeaderboards";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/content/home/Home";

function App() {
  const [cookies, setCookie] = useCookies(["light_mode"]);
  if (cookies.light_mode) document.body.setAttribute("data-bs-theme", "light");
  else document.body.setAttribute("data-bs-theme", "dark");

  const [homeVisible, setHomeVisibility] = useState(true);
  const showHome = () => {
    setHomeVisibility(true);
    setPlbVisibility(false);
  };

  const [plbVisible, setPlbVisibility] = useState(false);
  const showPlb = () => {
    setPlbVisibility(true);
    setHomeVisibility(false);
  };

  const changeMode = (event: ChangeEvent<HTMLInputElement>) => {
    setCookie("light_mode", event.target.checked, { path: "/" });
  };

  return (
    <>
      <Navigation showHome={showHome} showPlb={showPlb} onChange={changeMode}>
        Nopeys Frosthex Tools
      </Navigation>
      {homeVisible && <Home></Home>}
      {plbVisible && <PlayerLeaderboards></PlayerLeaderboards>}
    </>
  );
}

export default App;
