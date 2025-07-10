import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Header from "../components/Header";

export default function Homepage({ session }) {
  // verify session
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else if (session.role === "commercial") {
      navigate("/homepagecommercial");
    }
  }, [session]);

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
          <NavLink to="/mesqrcodes">Mes qr-codes</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/mesfactures">Mes factures</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}
