import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { createSection } from "../components/SectionApiRequest";

export default function SectionNew({ session, dispatchSession }) {
  const [nom, setNom] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { dynamicmenuid } = useParams();

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    }
  }, [session]);

  async function HandleSubmit(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // verif des parametres
    if (!nom.length) {
      setIsLoading(false);
      setError("Veuillez entrer le nom de la nouvelle section");
      return false;
    }
    // data transmit
    // eslint-disable-next-line no-unused-vars
    const { status, data } = await createSection(
      session.token,
      dynamicmenuid,
      nom
    );
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
    navigate("/dynamicmenu/read/" + dynamicmenuid);
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/dynamicmenu/read/" + dynamicmenuid);
  }

  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="nom">Nom de la nouvelle section</label>
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
