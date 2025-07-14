import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";

import {
  fetchBills,
  setBillPaid,
  checkPaypalOrder,
} from "../components/BillApiRequest";
import config from "../components/Config";

export default function EtablissementBills({ session, dispatchSession }) {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { etablissementId } = useParams();

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else if (session.role != "commercial") {
      navigate("/");
    } else {
      handleFetchBills();
    }
  }, [session]);

  async function handleFetchBills() {
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchBills(session.token, etablissementId);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // set data
    setBills(data);
    // return
    setIsLoading(false);
    return false;
  }

  async function HandleSetPaid(e, id) {
    e.preventDefault();
    setIsLoading(true);
    // fetch data
    const status = await setBillPaid(session.token, id);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // refresh data
    await handleFetchBills();
    setIsLoading(false);
    // return
    return false;
  }

  async function HandleCheckPaypalOrder(e, id) {
    e.preventDefault();
    setIsLoading(true);
    // fetch data
    const status = await checkPaypalOrder(session.token, id);
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // refresh data
    await handleFetchBills();
    setIsLoading(false);
    // return
    return false;
  }

  function HandleNewBill(e) {
    e.preventDefault();
    navigate("/billnew/" + etablissementId);
    return false;
  }

  if (isLoading) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Factures de l'établissement {etablissementId}</h1>
        <p>&nbsp;</p>
        <button className={styles.ctabutton} onClick={(e) => HandleNewBill(e)}>
          + Ajouter une facture
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
      <h1>Factures de l'établissement {etablissementId}</h1>
      <p>&nbsp;</p>
      <button className={styles.ctabutton} onClick={(e) => HandleNewBill(e)}>
        + Ajouter une facture
      </button>
      <p>&nbsp;</p>
      <table className="bills">
        <thead>
          <tr>
            <th>Numéro</th>
            <th>Date</th>
            <th>Montant</th>
            <th>Statut</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bills.map(function (bill) {
            if (bill.status === "pending") {
              return "";
            }
            let billStatus = "";
            if (bill.status === "created") billStatus = "Créee";
            else if (bill.status === "paid") billStatus = "Payée";
            else if (bill.status === "inactive") billStatus = "Expirée";
            const dateCreation = bill.createdAt.slice(0, 10);
            return (
              <tr key={bill.id}>
                <td>{bill.id}</td>
                <td>{dateCreation}</td>
                <td>{bill.amount} €</td>
                <td>{billStatus}</td>
                <td>
                  <a
                    href={`${config.tabluuu_server_url}/admin/bill/download/${bill.id}/${session.token}`}
                    target="_blank"
                  >
                    <button className={styles.minibutton}>
                      <i className="fa-solid fa-download"></i>
                    </button>
                  </a>
                  {bill.status === "created" && (
                    <>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className={styles.minibutton}
                        onClick={(e) => HandleCheckPaypalOrder(e, bill.id)}
                      >
                        Vérifier le paiement
                      </button>
                      &nbsp;&nbsp;&nbsp;
                      <button
                        className={styles.minibutton}
                        onClick={(e) => HandleSetPaid(e, bill.id)}
                      >
                        Valider le paiement
                      </button>
                    </>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
