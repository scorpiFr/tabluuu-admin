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

import { fetchEtablissement } from "../components/EtablissementApiRequests";

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
      handleFetchEtablissement();
      handleFetchDynamicMenus();
    }
  }, [session]);

  async function handleFetchEtablissement() {
    // fetch data
    const { status, data } = await fetchEtablissement(
      session.etablissement_id,
      session.token
    );
    // error management
    if (status == 401) {
      navigate("/login");
      return false;
    }
    // type_contrat
    if (data.type_contrat === "image") {
      navigate("/mescartesstatic");
      return false;
    }
    return false;
  }

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

  async function mooveMenu(direction, id) {
    // move in db
    const { status, data } =
      direction === "up"
        ? await moveupDynamicMenu(session.token, id)
        : await movedownDynamicMenu(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // verifs
    if (status != 200) {
      return;
    }
    const [menu1, menu2] = data;
    if (!menu1 || !menu2) {
      return;
    }
    // update in local
    let res = dynamicMenus.map(function (menu) {
      if (menu.id === menu1.id) return menu1;
      if (menu.id === menu2.id) return menu2;
      return menu;
    });
    // sorting
    res = res.sort((a, b) => b.position - a.position);
    // update
    setDynamicMenus(res);
  }

  function HandleMoveUp(e, id) {
    // inits
    e.preventDefault();
    // action
    mooveMenu("up", id);
    // return
    setError("");
  }

  function HandleMoveDown(e, id) {
    // inits
    e.preventDefault();
    // action
    mooveMenu("down", id);
    // return
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
