import "./App.css";
import Content from "./components/content/Content";
import Navigation from "./components/navigation/Navigation";

function App() {
  document.body.setAttribute("data-bs-theme", "dark");
  document.body.classList.add("bg-secondary-subtle");

  return (
    <>
      <Navigation>Frosthex Leaderboards</Navigation>
      <Content></Content>
    </>
  );
}

export default App;
