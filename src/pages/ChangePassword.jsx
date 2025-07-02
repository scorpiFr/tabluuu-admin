import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { updatePassword } from "../components/EtablissementApiRequests";
export default function ChangePassword({ session, dispatchSession }) {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
    if (!password.length || !password2.length) {
      setIsLoading(false);
      setError("Veuillez entrer votre mot de passe");
      return false;
    }
    if (password !== password2) {
      setIsLoading(false);
      setError("Vos mots de passe ne correspondent pas");
      return false;
    }

    // data transmit
    // eslint-disable-next-line no-unused-vars
    const { status, data } = await updatePassword(
      session.etablissement_id,
      session.token,
      password
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
    setSuccess(true);
    return false;
  }
  function HandleBack(e) {
    e.preventDefault();
    navigate("/");
  }

  return (
    <div className="centerDiv">
      <Header />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="password">Nouveau mot de passe</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            autoComplete="password"
          />
        </div>
        <div className={styles.row}>
          <label htmlFor="password2">Confirmez votre mot de passe</label>
          <input
            type="password"
            id="password2"
            onChange={(e) => setPassword2(e.target.value)}
            value={password2}
            autoComplete="password2"
          />
        </div>
        <div>
          {error && <p>{error}</p>}
          {isLoading && (
            <center>
              <HashLoader color={"#ffffff"} size="50px" />
            </center>
          )}
          {!isLoading && !success && (
            <button
              className={styles.ctabutton}
              onClick={(e) => HandleSubmit(e)}
            >
              Envoyer
            </button>
          )}
          {!isLoading && success && (
            <>
              <p>
                <span class="checkmark"></span>&nbsp;&nbsp;Enregistré avec
                succès
              </p>
              <button
                className={styles.backbutton}
                onClick={(e) => HandleBack(e)}
              >
                Retour
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
