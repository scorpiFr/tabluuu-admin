import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { HashLoader } from "react-spinners";
import Config from "../components/Config.jsx";
import Header from "../components/Header";
import styles from "./Login.module.css";

export default function Moncompte({ session, dispatchSession }) {
  const [emailFacturation, setEmailFacturation] = useState("");
  const [emailCommandes, setEmailCommandes] = useState("");
  const [nomEtablissement, setNomEtablissement] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [tel, setTel] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [typeContrat, setTypeContrat] = useState("");
  const [prix, setPrix] = useState(0);

  // verify session
  let navigate = useNavigate();

  async function fetchEtablissement(id, token) {
    try {
      const url = Config.tabluuu_server_url + "/etablissement/" + id;
      console.log(url);

      const response = await axios.get(url, {
        headers: {
          Authorization: token,
        },
      });
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: 500, data: {} };
    }
  }

  async function handleFetchEtalissement() {
    // inits
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchEtablissement(
      session.etablissement_id,
      session.token
    );
    // error management
    if (status != 200) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // set data
    setEmailFacturation(data.email_facturation);
    setEmailCommandes(data.email_commandes);
    setNomEtablissement(data.nom_etablissement);
    setNom(data.nom);
    setPrenom(data.prenom);
    setAdresse(data.adresse);
    setTel(data.tel);
    setTypeContrat(data.type_contrat);
    setPrix(data.prix);
    // return
    setIsLoading(false);
  }

  // verify session & get etablissement
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchEtalissement();
    }
  }, [session]);

  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
            autoComplete="nom"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="prenom">Prénom</label>
          <input
            type="text"
            id="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
            autoComplete="prenom"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="nomEtablissement">Nom de votre établissement</label>
          <input
            type="text"
            id="nomEtablissement"
            onChange={(e) => setNomEtablissement(e.target.value)}
            value={nomEtablissement}
            autoComplete="nomEtablissement"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="adresse">Adresse + cp + ville</label>
          <input
            type="text"
            id="adresse"
            onChange={(e) => setAdresse(e.target.value)}
            value={adresse}
            autoComplete="adresse"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="tel">Téléphone</label>
          <input
            type="text"
            id="tel"
            onChange={(e) => setTel(e.target.value)}
            value={tel}
            autoComplete="tel"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="emailFacturation">Votre email</label>
          <input
            type="text"
            id="emailFacturation"
            onChange={(e) => setEmailFacturation(e.target.value)}
            value={emailFacturation}
            autoComplete="emailFacturation"
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
            autoComplete="emailCommandes"
          />
        </div>
        <div className={styles.row}>
          <label>Type de contrat : {typeContrat}</label>
        </div>
        <div className={styles.row}>
          <label>Prix : {prix} € par mois</label>
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
              onClick={(e) => HandleSubmit(e)}
            >
              Envoyer
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
