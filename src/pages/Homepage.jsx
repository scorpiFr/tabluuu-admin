import { NavLink } from "react-router-dom";

import Header from "../components/Header";

export default function Homepage() {
  return (
    <div className="centerDiv">
      <Header />
      <ul>
        <li className="tab">
          <NavLink to="/moncompte" className="">
            Mon compte
          </NavLink>
        </li>
        <li className="tab">
          <NavLink to="/motdepasse">Mon mot de passe</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/mescartes">Mes cartes</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}
