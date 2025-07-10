import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { fetchEtablissement } from "../components/EtablissementApiRequests";
import { createBill } from "../components/BillApiRequest";
import ToggleSwitch from "../components/ToggleSwitch";

export default function BillNew({ session, dispatchSession }) {
  const { etablissementId } = useParams();
  const [etablissement, setEtablissement] = useState(null);
  const [monthBill, setMonthBill] = useState(true);
  const [month, setMonth] = useState(0);
  const [year, setYear] = useState(0);
  const [monthAmount, setMonthAmount] = useState(0);
  const [qrCodeBill, setQrCodeBill] = useState(true);
  const [qrBoardQuantity, setQrBoardQuantity] = useState(1);
  const [qrBoardUnitPrice, setQrBoardUnitPrice] = useState(25);
  const [menuBill, setMenuBill] = useState(true);
  const [menuEditAmount, setMenuEditAmount] = useState(100);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else if (session.role != "commercial") {
      navigate("/");
    } else {
      handleFetchEtablissement();
    }
  }, [session]);

  async function handleFetchEtablissement() {
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchEtablissement(
      etablissementId,
      session.token
    );
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // set data
    setEtablissement(data);
    initMonthBill(data.type_contrat);
    // return
    setIsLoading(false);
    return false;
  }

  async function HandleSubmit(e) {
    // initialisation
    e.preventDefault();
    setIsLoading(true);
    setError("");
    // verif des parametres
    // data transmit
    // eslint-disable-next-line no-unused-vars
    const { status, data } = await createBill(
      session.token,
      etablissementId,
      month,
      year,
      monthAmount,
      qrBoardQuantity,
      qrBoardUnitPrice,
      menuEditAmount
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
    navigate("/etablissementbills/" + etablissementId);
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/etablissementbills/" + etablissementId);
    return false;
  }

  function initMonthBill(type_contrat = "") {
    if (!type_contrat) {
      type_contrat = etablissement.type_contrat;
    }
    const today = new Date();
    setMonth(today.getMonth() + 1);
    setYear(today.getUTCFullYear());
    if (type_contrat === "commande") {
      setMonthAmount(80);
    } else if (type_contrat === "menu") {
      setMonthAmount(60);
    } else if (type_contrat === "image") {
      setMonthAmount(50);
    } else {
      setMonthAmount(0);
    }
  }
  function handleToggleMonthBill() {
    const newMonthBill = !monthBill;
    setMonthBill(newMonthBill);

    if (!newMonthBill) {
      setMonth(0);
      setYear(0);
      setMonthAmount(0);
      return false;
    }
    initMonthBill();
  }

  function handleToggleQrCodeBill() {
    const newQrCodeBill = !qrCodeBill;
    setQrCodeBill(newQrCodeBill);

    if (!newQrCodeBill) {
      setQrBoardQuantity(0);
      setQrBoardUnitPrice(0);
      return false;
    }
    setQrBoardQuantity(1);
    setQrBoardUnitPrice(25);
  }

  function handleToggleMenuBill() {
    const newMenuCodeBill = !menuBill;
    setMenuBill(newMenuCodeBill);

    if (!newMenuCodeBill) {
      setMenuEditAmount(0);
      return false;
    }
    setMenuEditAmount(100);
  }

  return (
    <div className="centerDiv">
      <Header />
      <h1>Créer une facture</h1>
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="monthBill">Facturer un mois</label>
          <center>
            <ToggleSwitch
              initial={monthBill}
              onToggle={handleToggleMonthBill}
            />
          </center>
        </div>
        {monthBill && (
          <>
            <div className={styles.row}>
              <label htmlFor="month">Mois *</label>
              <select
                id="month"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              >
                <option value="1">Janvier</option>
                <option value="2">Fevrier</option>
                <option value="3">Mars</option>
                <option value="4">Avril</option>
                <option value="5">Mai</option>
                <option value="6">Juin</option>
                <option value="7">Juillet</option>
                <option value="8">Aout</option>
                <option value="9">Septembre</option>
                <option value="10">Octobre</option>
                <option value="11">Novembre</option>
                <option value="12">Decembre</option>
              </select>
            </div>
            <div className={styles.row}>
              <label htmlFor="year">Année *</label>
              <input
                type="text"
                id="year"
                onChange={(e) => setYear(e.target.value)}
                value={year}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="monthAmount">Prix du mois en cours *</label>
              <input
                type="text"
                id="monthAmount"
                onChange={(e) => setMonthAmount(parseInt(e.target.value))}
                value={monthAmount}
              />
            </div>
          </>
        )}
        <div className={styles.row}>
          <label htmlFor="qrCodeBill">
            Facturer des planches de 16 qr-codes
          </label>
          <center>
            <ToggleSwitch
              initial={qrCodeBill}
              onToggle={handleToggleQrCodeBill}
            />
          </center>
        </div>
        {qrCodeBill && (
          <>
            <div className={styles.row}>
              <label htmlFor="qrBoardQuantity">
                Nombre de planches de 16 qr-codes *
              </label>
              <input
                type="text"
                id="qrBoardQuantity"
                onChange={(e) => setQrBoardQuantity(parseInt(e.target.value))}
                value={qrBoardQuantity}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="qrBoardUnitPrice">
                Prix unitaire des planches de 16 qr-codes *
              </label>
              <input
                type="text"
                id="qrBoardUnitPrice"
                onChange={(e) => setQrBoardUnitPrice(parseInt(e.target.value))}
                value={qrBoardUnitPrice}
              />
            </div>
          </>
        )}
        <div className={styles.row}>
          <label htmlFor="menuBill">Facturer la redaction de la carte</label>
          <center>
            <ToggleSwitch initial={menuBill} onToggle={handleToggleMenuBill} />
          </center>
        </div>
        {menuBill && (
          <div className={styles.row}>
            <label htmlFor="menuEditAmount">Rédaction de la carte *</label>
            <input
              type="text"
              id="menuEditAmount"
              onChange={(e) => setMenuEditAmount(parseInt(e.target.value))}
              value={menuEditAmount}
            />
          </div>
        )}
        <div className={styles.row}>
          <label>
            Total :{" "}
            {monthAmount + menuEditAmount + qrBoardQuantity * qrBoardUnitPrice}{" "}
            €
          </label>
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
