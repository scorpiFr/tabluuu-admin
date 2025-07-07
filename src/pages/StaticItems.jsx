import { useEffect, useState, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { fetchStaticMenu } from "../components/StaticMenusApiRequest";
import {
  fetchStaticItems,
  createStaticItem,
  deleteStaticItem,
  moveupStaticItem,
  movedownStaticItem,
} from "../components/StaticItemsApiRequest";
import StaticItem from "../components/StaticItem";

export default function StaticItems({ session, dispatchSession }) {
  const [items, itemDispatcher] = useReducer(staticItemReducer, []);
  const [staticMenu, setStaticMenu] = useState(null);
  const [image, setImage] = useState(null);
  const [isNewImageForm, setIsNewImageForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { staticMenuId } = useParams();

  async function handleFetchStaticMenu() {
    // initialisation
    // get data
    const { status, data } = await fetchStaticMenu(staticMenuId, session.token);
    if (status == 401) {
      dispatchSession({ type: "reset" });
      navigate("/login");
      return false;
    }
    setStaticMenu(data);
    // retour
    return false;
  }

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchStaticItems();
      handleFetchStaticMenu();
    }
  }, [session]);

  function staticItemReducer(currState, action) {
    switch (action.type) {
      case "addOne":
        return handleAddItem(currState, action.payload);
      case "set":
        return action.payload;
      case "moveup":
        handleMoveup(currState, action.payload);
        return currState;
      case "movedown":
        handleMovedown(currState, action.payload);
        return currState;
      case "remove":
        return handleRemoveItem(currState, action.payload);
      default:
        return currState;
    }
  }

  async function handleFetchStaticItems() {
    // initialisation
    setIsLoading(true);
    setError("");
    // get data
    const { status, data } = await fetchStaticItems(
      session.token,
      staticMenuId
    );
    if (status == 401) {
      setIsLoading(false);
      setError("");
      dispatchSession({ type: "reset" });
      navigate("/login");
      return false;
    }
    itemDispatcher({ type: "set", payload: data });
    // retour
    setIsLoading(false);
    setError("");
    return false;
  }

  function handleRemoveItem(currState, itemId) {
    // delete in db
    deleteStaticItem(session.token, itemId);
    // delete in local
    if (!currState || currState.length <= 0) {
      return currState;
    }
    const res = currState.filter((myitem) => myitem.id != itemId);
    // return
    return res;
  }

  function handleAddItem(currState, item) {
    // already added in db
    // add in local
    let res = [...currState, item];
    // sorting
    res = res.sort((a, b) => a.position - b.position);
    // return
    return res;
  }

  async function handleMoveup(currState, id) {
    // moveup in db
    const { status, data } = await movedownStaticItem(session.token, id);
    // verifs
    if (status != 200) {
      return;
    }
    const [item1, item2] = data;
    if (!item1 || !item2) {
      return;
    }
    // update in local
    let res = currState.map(function (item) {
      if (item.id === item1.id) return item1;
      if (item.id === item2.id) return item2;
      return item;
    });
    // sorting
    res = res.sort((a, b) => a.position - b.position);
    // return
    itemDispatcher({ type: "set", payload: res });
  }

  async function handleMovedown(currState, id) {
    // moveup in db
    const { status, data } = await moveupStaticItem(session.token, id);
    // verifs
    if (status != 200) {
      return;
    }
    const [item1, item2] = data;
    if (!item1 || !item2) {
      return;
    }
    // update in local
    let res = currState.map(function (item) {
      if (item.id === item1.id) return item1;
      if (item.id === item2.id) return item2;
      return item;
    });
    // sorting
    res = res.sort((a, b) => a.position - b.position);
    // return
    itemDispatcher({ type: "set", payload: res });
  }

  function HandleBack(e) {
    e.preventDefault();
    navigate("/mescartesstatic");
  }

  function HandleAnnulerImage(e) {
    e.preventDefault();
    setIsNewImageForm(false);
    return false;
  }

  async function HandleConfirmImage(e) {
    // verifs & init
    e.preventDefault();
    if (!image) {
      return false;
    }
    // get data
    const { status, data } = await createStaticItem(
      session.token,
      staticMenuId,
      image
    );
    // status verif
    if (status == 401) {
      setIsNewImageForm(false);
      dispatchSession({ type: "reset" });
      navigate("/login");
      return false;
    }
    // manage data
    itemDispatcher({ type: "addOne", payload: data });
    // return
    setIsNewImageForm(false);
    return false;
  }

  async function handleChangeImage(e) {
    e.preventDefault();
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Veuillez sélectionner un fichier image.");
    }
    return false;
  }

  if (isLoading) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Carte en image</h1>
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
      {staticMenu && <h1>Carte en image : {staticMenu.nom}</h1>}
      {!staticMenu && <h1>Carte en image</h1>}
      {!isNewImageForm && (
        <>
          <button
            className={styles.backbutton}
            style={{ float: "none" }}
            onClick={(e) => HandleBack(e)}
          >
            &lt;- Retour
          </button>
          &nbsp;&nbsp;
          <button
            className={styles.ctabutton}
            onClick={(e) => setIsNewImageForm(true)}
          >
            + Ajouter une image
          </button>
        </>
      )}
      {isNewImageForm && (
        <form>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => handleChangeImage(e)}
          />
          <div>
            <button
              className={styles.minibutton}
              onClick={(e) => HandleAnnulerImage(e)}
            >
              Annuler
            </button>
            &nbsp;
            <button
              className={styles.minibutton_green}
              onClick={(e) => HandleConfirmImage(e)}
            >
              Envoyer
            </button>
          </div>
        </form>
      )}
      <p>&nbsp;</p>
      <div className="grid-container">
        {items?.map((item) => {
          return (
            <StaticItem
              item={item}
              itemDispatcher={itemDispatcher}
              key={item.id}
            />
          );
        })}
      </div>
    </div>
  );
}
