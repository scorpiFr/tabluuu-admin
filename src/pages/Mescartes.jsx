import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import {
  fetchDynamicMenus,
  setDynamicMenuSelected,
} from "../components/DynamicMenusApiRequest";

export default function Mescartes({ session, dispatchSession }) {
  const [dynamicMenus, setDynamicMenus] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchDynamicMenus();
    }
  }, [session]);

  async function handleFetchDynamicMenus() {
    // inits
    setIsLoading(true);
    setError("");

    // fetch data
    const { status, data } = await fetchDynamicMenus(
      session.etablissement_id,
      session.token
    );

    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // set data
    setDynamicMenus(data);

    // return
    setIsLoading(false);
    setError("");
  }
  async function handleChangeSelected(e, id) {
    // inits
    e.preventDefault();
    setIsLoading(true);
    // set status action
    const { status } = await setDynamicMenuSelected(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload list
    await handleFetchDynamicMenus();
    // return
    setIsLoading(false);
    setError("");
  }

  function HandleNewDynamicMenu() {
    navigate("/newDynamicMenu");
  }

  if (isLoading) {
    return (
      <center>
        <HashLoader color={"#000"} size="200px" />
      </center>
    );
  }
  if (!dynamicMenus.length) {
    return (
      <div className="centerDiv">
        <Header />
        <p>&nbsp;</p>
        <button
          className={styles.ctabutton}
          onClick={(e) => HandleNewDynamicMenu(e)}
        >
          + Ajouter une carte
        </button>
        <p>&nbsp;</p>
        <ul>
          <li className="tab">
            <p>Aucune carte trouvée</p>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="centerDiv">
      <Header />
      <p>&nbsp;</p>
      <button
        className={styles.ctabutton}
        onClick={(e) => HandleNewDynamicMenu(e)}
      >
        + Ajouter une carte
      </button>
      <p>&nbsp;</p>
      <ul>
        {dynamicMenus.map((menu) => {
          return (
            <li className="tab" key={menu.id}>
              <p>
                <input
                  type="radio"
                  checked={menu.is_active == 1 ? "checked" : ""}
                  onChange={(e) => handleChangeSelected(e, menu.id)}
                />
                &nbsp;{menu.nom}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
