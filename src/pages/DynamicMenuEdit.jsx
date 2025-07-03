import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import {
  fetchDynamicMenu,
  updateDynamicMenu,
} from "../components/DynamicMenusApiRequest";

export default function DynamicMenuEdit({ session, dispatchSession }) {
  const [nom, setNom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      HandleFetchDynamicMenu();
    }
  }, [session]);

  async function HandleFetchDynamicMenu() {
    // initialisation
    setIsLoading(true);
    setError("");
    // get data
    const { status, data } = await fetchDynamicMenu(id, session.token);
    if (status == 401) {
      setIsLoading(false);
      setError("");
      dispatchSession({ type: "reset" });
      navigate("/login");
      return false;
    }
    setNom(data.nom);
    // retour
    setIsLoading(false);
    setError("");
    return false;
  }

  async function HandleSubmit(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // verif des parametres
    if (!nom.length) {
      setIsLoading(false);
      setError("Veuillez entrer le nom de la carte");
      return false;
    }
    // data transmit
    const { status } = await updateDynamicMenu(session.token, id, nom);
    if (status == 401) {
      setIsLoading(false);
      setError("");
      dispatchSession({ type: "reset" });
      navigate("/login");
      return false;
    }
    // retour
    setIsLoading(false);
    setError("");
    navigate("/mescartes");
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/mescartes");
  }

  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="nom">Nom de la carte</label>
          <input
            type="text"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div>
          {error && <p>{error}</p>}
          {isLoading && (
            <center>
              <HashLoader color={"#ffffff"} size="50px" />
            </center>
          )}
          {!isLoading && (
            <>
              <button
                className={styles.backbutton}
                onClick={(e) => HandleBack(e)}
              >
                &lt;- Retour
              </button>
              <button
                className={styles.ctabutton}
                onClick={(e) => HandleSubmit(e)}
              >
                Envoyer
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
