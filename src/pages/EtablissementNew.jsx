import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { createEtablissement } from "../components/EtablissementApiRequests";
import ToggleSwitch from "../components/ToggleSwitch";

export default function EtablissementNew({ session, dispatchSession }) {
  const [isAllocated, setIsAllocated] = useState(true);
  const [nomEtablissement, setNomEtablissement] = useState("");
  const [type, setType] = useState("bar");
  const [typeContrat, setTypeContrat] = useState("commande");
  const [prix, setPrix] = useState(80);
  const [emailFacturation, setEmailFacturation] = useState("");
  const [emailCommandes, setEmailCommandes] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (
      !nomEtablissement.length ||
      !type.length ||
      !typeContrat.length ||
      !emailFacturation.length
    ) {
      setIsLoading(false);
      setError("Tous les champs étoilés sont obligatoirs");
      return false;
    }
    // data transmit
    const isAllocated2 = isAllocated ? 1 : 0;
    // eslint-disable-next-line no-unused-vars
    const { status, data } = await createEtablissement(
      session.token,
      emailFacturation,
      emailCommandes,
      nomEtablissement,
      type,
      nom,
      prenom,
      adresse,
      tel,
      typeContrat,
      prix,
      isAllocated2
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
    navigate("/etablissementlist");
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/etablissementlist");
    return false;
  }

  function onToggleIsAllocated(newState) {
    setIsAllocated(newState);
    return false;
  }

  function handleSetTypeContrat(newValue) {
    setTypeContrat(newValue);
    switch (newValue) {
      case "commande":
        setPrix(80);
        return;
      case "menu":
        setPrix(60);
        return;
      case "image":
        setPrix(50);
        return;
      default:
        setPrix(0);
        return;
    }
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
          <label htmlFor="isAllocated">C'est un établissement réel</label>
          <center>
            <ToggleSwitch
              initial={isAllocated}
              onToggle={onToggleIsAllocated}
            />
          </center>
        </div>
        <div className={styles.row}>
          <label htmlFor="nomEtablissement">Nom de l'etablissement *</label>
          <input
            type="text"
            id="nomEtablissement"
            onChange={(e) => setNomEtablissement(e.target.value)}
            value={nomEtablissement}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="type">Type d'établissement *</label>
          <select
            id="type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="bar">bar</option>
            <option value="kebab">kebab</option>
            <option value="restaurant">restaurant</option>
          </select>
        </div>
        <div className={styles.row}>
          <label htmlFor="typeContrat">Type de contrat *</label>
          <select
            id="typeContrat"
            value={typeContrat}
            onChange={(e) => handleSetTypeContrat(e.target.value)}
          >
            <option value="">-- Choisir --</option>
            <option value="commande">Commande</option>
            <option value="menu">Menu</option>
            <option value="image">Image</option>
          </select>
        </div>
        <div className={styles.row}>
          <label htmlFor="prix">Prix *</label>
          <input
            type="text"
            id="prix"
            onChange={(e) => handlePrix(e.target.value)}
            value={prix}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="emailFacturation">Email de facturation *</label>
          <input
            type="text"
            id="emailFacturation"
            onChange={(e) => setEmailFacturation(e.target.value)}
            value={emailFacturation}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="emailCommandes">
            Email de reception des commandes
          </label>
          <input
            type="text"
            id="emailCommandes"
            onChange={(e) => setEmailCommandes(e.target.value)}
            value={emailCommandes}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="prenom">Prenom</label>
          <input
            type="text"
            id="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="adresse">Adresse + cp + ville</label>
          <input
            type="text"
            id="adresse"
            onChange={(e) => setAdresse(e.target.value)}
            value={adresse}
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="tel">Téléphone</label>
          <input
            type="text"
            id="tel"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
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
