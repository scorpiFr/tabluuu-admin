import { NavLink, useNavigate } from "react-router-dom";
import { useEffect } from "react";

import Header from "../components/Header";

export default function HomepageCommercial({ session }) {
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
          <NavLink to="/etablissementlist">Etablissements</NavLink>
        </li>
        <li className="tab">
          <NavLink to="/logout">Logout</NavLink>
        </li>
      </ul>
    </div>
  );
}
