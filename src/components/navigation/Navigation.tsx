import { ReactNode } from "react";
import "./Navigation.css";

interface Props {
  children: ReactNode;
}

const Navigation = ({ children }: Props) => {
  return (
    <nav className="navbar sticky-top bg-body border-bottom border-body">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          {children}
        </a>
      </div>
    </nav>
  );
};

export default Navigation;
