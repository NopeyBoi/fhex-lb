import { ReactNode } from "react";
import "./Navigation.css";

interface Props {
  children: ReactNode;
  showHome: () => void;
  showPlb: () => void;
}

const Navigation = ({ children, showHome, showPlb }: Props) => {
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
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
