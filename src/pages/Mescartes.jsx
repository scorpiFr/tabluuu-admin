import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import {
  fetchDynamicMenus,
  setDynamicMenuSelected,
  moveupDynamicMenu,
  movedownDynamicMenu,
  deleteDynamicMenu,
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

  async function handleFetchDynamicMenus(changeReload = true) {
    // inits
    if (changeReload) {
      setIsLoading(true);
    }
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
    if (changeReload) {
      setIsLoading(false);
    }
    setError("");
  }
  async function handleChangeSelected(e, id) {
    // inits
    e.preventDefault();
    // setIsLoading(true);
    // set status action
    const { status } = await setDynamicMenuSelected(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload list
    await handleFetchDynamicMenus(false);
    // return
    // setIsLoading(false);
    setError("");
  }

  async function HandleRemove(e, id) {
    // inits
    e.preventDefault();
    // setIsLoading(true);
    // set status action
    const { status } = await deleteDynamicMenu(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload list
    await handleFetchDynamicMenus(false);
    // return
    // setIsLoading(false);
    setError("");
  }

  async function HandleMoveUp(e, id) {
    // inits
    e.preventDefault();
    // setIsLoading(true);
    // set status action
    const { status } = await moveupDynamicMenu(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload list
    await handleFetchDynamicMenus(false);
    // return
    // setIsLoading(false);
    setError("");
  }

  async function HandleMoveDown(e, id) {
    // inits
    e.preventDefault();
    // setIsLoading(true);
    // set status action
    const { status } = await movedownDynamicMenu(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload list
    await handleFetchDynamicMenus(false);
    // return
    // setIsLoading(false);
    setError("");
  }

  function HandleNewDynamicMenu() {
    navigate("/dynamicmenu/new");
  }

  function HandleGotoEdit(e, id) {
    e.preventDefault();
    navigate("/dynamicmenu/edit/" + id);
  }

  if (isLoading) {
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
        <center>
          <HashLoader color={"#000"} size="200px" />
        </center>
      </div>
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
                &nbsp;
                <NavLink to={`/dynamicmenu/read/${menu.id}`}>
                  {menu.nom}
                </NavLink>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton}
                  onClick={(e) => HandleGotoEdit(e, menu.id)}
                >
                  <i className="fas fa-edit" alt="Modifier"></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton}
                  onClick={(e) => HandleMoveUp(e, menu.id)}
                >
                  <i className="fas fa-arrow-up" alt="Monter"></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton}
                  onClick={(e) => HandleMoveDown(e, menu.id)}
                >
                  <i className="fas fa-arrow-down" alt="Descendre"></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton_red}
                  onClick={(e) => HandleRemove(e, menu.id)}
                >
                  <i className="fas fa-remove" alt="Supprimer"></i>
                </button>
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
