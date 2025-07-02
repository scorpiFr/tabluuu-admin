import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { HashLoader } from "react-spinners";
import Header from "../components/Header";
import Config from "../components/Config.jsx";
import styles from "./Login.module.css";

export default function Login({ session, dispatchSession }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function login(email, password) {
    try {
      const response = await axios.post(
        Config.tabluuu_server_url + "/admin/login",
        {
          email: email,
          password: password,
        }
      );
      // console.log(response.status, response.data);
      return { status: response.status, data: response.data };
    } catch (error) {
      console.log(error);
      return { status: 500, data: {} };
    }
  }

  async function HandleSubmit(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // verif des parametres
    if (!email.length || !password.length) {
      setIsLoading(false);
      setError("Veuillez entrer votre login et mot de passe");
      return false;
    }

    // transmition des crédentiels
    const { status, data } = await login(email, password);
    if (status !== 200) {
      setIsLoading(false);
      setError("Mauvais login ou mot de passe");
      return false;
    }
    // session save
    session = {
      id: data.session.id,
      etablissement_id: data.session.etablissement_id,
      nom: data.session.nom,
      nom_etablissement: data.session.nom_etablissement,
      prenom: data.session.prenom,
      role: data.session.role,
      token: data.token,
      user_id: data.session.user_id,
    };
    dispatchSession({ type: "set", payload: session });

    // retour
    setIsLoading(false);
    setError("");
    navigate("/");
    return false;
  }

  return (
    <div className="centerDiv">
      <form className={styles.form}>
        <Header />
        <div className={styles.row}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            autoComplete="email"
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="password"
          />
        </div>

        {error && <p>{error}</p>}

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
