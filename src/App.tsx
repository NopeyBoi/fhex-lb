import { useState } from "react";
import "./App.css";
import PlayerLeaderboards from "./components/content/player_leaderboards/PlayerLeaderboards";
import Navigation from "./components/navigation/Navigation";
import Home from "./components/content/home/Home";

function App() {
  document.body.setAttribute("data-bs-theme", "dark");
  document.body.classList.add("bg-secondary-subtle");

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

  return (
    <>
      <Navigation showHome={showHome} showPlb={showPlb}>
        Frosthex Leaderboards
      </Navigation>
      {homeVisible && <Home></Home>}
      {plbVisible && <PlayerLeaderboards></PlayerLeaderboards>}
    </>
  );
}

export default App;
