import { ChangeEvent, ReactNode } from "react";
import { useCookies } from "react-cookie";
import "./Navigation.css";

interface Props {
  children: ReactNode;
  showHome: () => void;
  showPlb: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Navigation = ({ children, showHome, showPlb, onChange }: Props) => {
  const [cookies] = useCookies(["light_mode"]);

  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-body border-bottom border-body">
      <div className="container-fluid">
        <a className="navbar-brand">{children}</a>
        <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav">
            <a className="nav-link" href="#" onClick={showHome}>
              Home
            </a>
            <a className="nav-link" href="#" onClick={showPlb}>
              Player Leaderboards
            </a>
          </div>
          <form className="d-flex ms-auto" role="search">
            <div className="form-check form-check-reverse form-switch me-2">
              <input className="form-check-input" type="checkbox" role="switch" id="switchLightMode" defaultChecked={cookies.light_mode} onChange={onChange}></input>
              <label className="form-check-label" htmlFor="switchLightMode">
                Light Mode
              </label>
            </div>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
