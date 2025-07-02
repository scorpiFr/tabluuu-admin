import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { logout } from "../components/EtablissementApiRequests";

export default function Logout({ session, dispatchSession }) {
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();

  function HandleLogin(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);

    navigate("/login");
    return false;
  }

  async function HandleLogout(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);
    // payload
    await logout(session.token);
    dispatchSession({ type: "reset" });
    // retour
    setIsLoading(false);
    return false;
  }

  if (!session || !session.token || !session.token.length) {
    return (
      <div className="centerDiv">
        <Header />
        <form className={styles.form}>
          <div className={styles.row}>
            <p>
              <span className="checkmark"></span>&nbsp;&nbsp;Vous etes
              déconnecté.
            </p>
            <button
              className={styles.ctabutton}
              onClick={(e) => HandleLogin(e)}
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <p>Vous etes Connecté.</p>
        </div>
        <div>
          {isLoading && (
            <center>
              <HashLoader color={"#ffffff"} size="50px" />
            </center>
          )}
          {!isLoading && (
            <button
              className={styles.ctabutton}
              onClick={(e) => HandleLogout(e)}
            >
              Se déconnecter
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
