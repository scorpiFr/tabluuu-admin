import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function Moncompte({ session }) {
  // verify session
  console.log("moncompte -session : ", session);
  let navigate = useNavigate();

  // verify session
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session, navigate]); // dépendances obligatoires

  return (
    <div className="centerDiv">
      <Header />
      <p>test</p>
    </div>
  );
}
