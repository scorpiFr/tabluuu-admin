import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";

import { fetchBills, setBillPaid } from "../components/BillApiRequest";
import config from "../components/Config";

export default function MesFactures({ session, dispatchSession }) {
  const [bills, setBills] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else if (session.role === "commercial") {
      navigate("/homepagecommercial");
    } else {
      handleFetchBills();
    }
  }, [session]);

  async function handleFetchBills() {
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchBills(
      session.token,
      session.etablissement_id
    );
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

  if (isLoading) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Mes factures</h1>
        <p>&nbsp;</p>
        <center>
          <HashLoader color={"#000"} size="200px" />
        </center>
      </div>
    );
  }

  return (
    <div className="centerDiv">
      <Header />
      <h1>Mes factures</h1>
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
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
