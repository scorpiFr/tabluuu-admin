import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";

import {
  fetchEtablissements,
  sendWelcomeMail,
  sudo,
} from "../components/EtablissementApiRequests";

export default function EtablissementList({ session, dispatchSession }) {
  const [etablissements, setEtablissements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else if (session.role != "commercial") {
      navigate("/");
    } else {
      handleFetchEtablissements();
    }
  }, [session]);

  async function handleFetchEtablissements() {
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchEtablissements(session.token);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // set data
    setEtablissements(data);
    // return
    setIsLoading(false);
    return false;
  }

  function HandleNewEtablissement(e) {
    e.preventDefault();
    navigate("/etablissementnew");
    return false;
  }

  function handleGotoEdit(e, id) {
    e.preventDefault();
    navigate("/etablissementupdate/" + id);
    return false;
  }

  function handleGotoBillList(e, id) {
    e.preventDefault();
    navigate("/etablissementbills/" + id);
    return false;
  }

  async function handleSayHello(e, id) {
    e.preventDefault();
    setIsLoading(true);
    // fetch satus
    const { status } = await sendWelcomeMail(session.token, id);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // refresh
    await handleFetchEtablissements();
    // return
    setIsLoading(false);
    return false;
  }

  async function handleSudo(e, id) {
    e.preventDefault();
    const { status, data } = await sudo(session.token, id);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    } else if (status != 200) {
      return false;
    }
    dispatchSession({ type: "set", payload: data });
    navigate("/");
    // return
    return false;
  }

  if (isLoading) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Liste des établissements</h1>
        <p>&nbsp;</p>
        <button
          className={styles.ctabutton}
          onClick={(e) => HandleNewEtablissement(e)}
        >
          + Ajouter un etablissement
        </button>
        <center>
          <HashLoader color={"#000"} size="200px" />
        </center>
      </div>
    );
  }

  return (
    <div className="centerDiv">
      <Header />
      <h1>Liste des établissements</h1>
      <p>&nbsp;</p>
      <button
        className={styles.ctabutton}
        onClick={(e) => HandleNewEtablissement(e)}
      >
        + Ajouter un etablissement
      </button>
      <p>&nbsp;</p>
      <ul>
        {etablissements.map((etablissement) => {
          return (
            <Etablissement
              etablissement={etablissement}
              handleGotoEdit={handleGotoEdit}
              handleGotoBillList={handleGotoBillList}
              handleSayHello={handleSayHello}
              handleSudo={handleSudo}
              key={etablissement.id}
            />
          );
        })}
      </ul>
    </div>
  );
}

function Etablissement({
  etablissement,
  handleGotoEdit,
  handleGotoBillList,
  handleSayHello,
  handleSudo,
}) {
  const [seeAll, setSeeAll] = useState(false);

  if (seeAll) {
    return (
      <li className="tab2">
        <p>
          {etablissement.type} {etablissement.id} -{" "}
          {etablissement.nom_etablissement}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton}
            onClick={() => setSeeAll((value) => !value)}
          >
            <i className="fas fa-eye" alt="Modifier"></i>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton}
            onClick={(e) => handleGotoEdit(e, etablissement.id)}
          >
            <i className="fas fa-edit" alt="Modifier"></i>
          </button>
        </p>
        <p>
          {etablissement.nom} {etablissement.prenom}
        </p>
        {etablissement.is_allocated == 0 && <p>non-alloué</p>}
        {!etablissement.is_available && (
          <p style={{ color: "red" }}>désactivé</p>
        )}
        <p>
          {etablissement.type_contrat} {etablissement.prix} €
        </p>
        {etablissement.adresse && <p>{etablissement.adresse}</p>}
        {!etablissement.adresse && <p>pas d'adresse</p>}
        {etablissement.tel && <p>{etablissement.tel}</p>}
        {!etablissement.tel && <p>pas de téléphone</p>}
        <p>{etablissement.email}</p>
        {etablissement.type_contrat === "commande" &&
          etablissement.email_commandes && (
            <p>email des commandes : {etablissement.email_commandes}</p>
          )}
        {etablissement.type_contrat === "commande" &&
          !etablissement.email_commandes && <p>pas d'email des commandes</p>}
      </li>
    );
  }

  return (
    <li className="tab2">
      <p>
        {etablissement.type} {etablissement.id} -
        {etablissement.nom_etablissement}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={styles.minibutton}
          onClick={() => setSeeAll((value) => !value)}
        >
          <i className="fas fa-eye" alt="Modifier"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={styles.minibutton}
          onClick={(e) => handleGotoEdit(e, etablissement.id)}
        >
          <i className="fas fa-edit" alt="Modifier"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={styles.minibutton}
          onClick={(e) => handleSayHello(e, etablissement.id)}
        >
          Envoyer le mot de passe
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={styles.minibutton}
          onClick={(e) => handleGotoBillList(e, etablissement.id)}
        >
          <i className="fas fa-credit-card" alt="Modifier"></i>
        </button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button
          className={styles.minibutton}
          onClick={(e) => handleSudo(e, etablissement.id)}
        >
          Sudo
        </button>
      </p>
      {etablissement.is_allocated == 0 && <p>non-alloué</p>}
      {!etablissement.is_available && <p style={{ color: "red" }}>désactivé</p>}
    </li>
  );
}
