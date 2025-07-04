import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { createItem } from "../components/ItemApiRequest";

export default function ItemNew({ session, dispatchSession }) {
  const [nom, setNom] = useState("");
  const [prix, setPrix] = useState(0);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { iddynamicmenu, idsection } = useParams();

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
      setError("Veuillez entrer le nom du produit");
      return false;
    }
    // data transmit
    // eslint-disable-next-line no-unused-vars
    const { status, data } = await createItem(
      session.token,
      idsection,
      nom,
      prix,
      description
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
    navigate("/dynamicmenu/read/" + iddynamicmenu);
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/dynamicmenu/read/" + iddynamicmenu);
    return false;
  }
  function handlePrix(value) {
    value = value.trim().replace(",", ".");
    setPrix(value);
  }
  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="nom">Nom du produit</label>
          <input
            type="text"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="nom">Description</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Description"
          />
        </div>
        <div
          className={styles.row}
          style={{ display: "inline", fontSize: "16px" }}
        >
          <label htmlFor="prix">Prix</label>&nbsp;&nbsp;
          <input
            type="text"
            id="prix"
            onChange={(e) => handlePrix(e.target.value)}
            value={prix}
            placeholder="0.00"
            style={{ width: "75px" }}
          />
          &nbsp;€
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
