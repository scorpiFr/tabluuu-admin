import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import Header from "../components/Header";
import styles from "./Login.module.css";
import { checkPaypalOrderByPaypalId } from "../components/BillApiRequest";

export default function PaypalSuccess({ session, dispatchSession }) {
  const [isLoading, setIsLoading] = useState(true);
  const [success, setSuccess] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const paypalOrderId = searchParams.get("token");
  let navigate = useNavigate();

  // verify paypal order
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleCheckPaypalOrder();
    }
  }, [session]);

  async function handleCheckPaypalOrder() {
    setIsLoading(true);
    // fetch data
    const { status, data } = await checkPaypalOrderByPaypalId(
      session.token,
      paypalOrderId
    );
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    if (data.status == "paid") {
      setSuccess(true);
    } else {
      navigate("/mesfactures");
    }
    // return
    setIsLoading(false);
    return false;
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/mesfactures");
    return false;
  }

  if (isLoading) {
    return (
      <center>
        <HashLoader color={"#000000"} size="200px" />
      </center>
    );
  }

  if (success) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Mon paiement</h1>
        <p>&nbsp;</p>
        <h2>Votre paiement a été réalisé avec succès</h2>
        <p>Un recu vous a été envoyé par mail</p>
        <p>&nbsp;</p>
        <p>
          <button className={styles.ctabutton} onClick={(e) => HandleBack(e)}>
            &lt;- Retour
          </button>
        </p>
      </div>
    );
  }

  return "";
}
