import { useEffect, useState, useReducer } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HashLoader } from "react-spinners";
import styles from "../pages/Login.module.css";
import Item from "./Item";

import {
  listItemsFromSectionId,
  updateItem,
  deleteItem,
  moveupItem,
  movedownItem,
} from "../components/ItemApiRequest";

export default function ItemList({ session, dispatchSession, section }) {
  const [items, itemDispatcher] = useReducer(itemReducer, []);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  async function handleUpdateItem(id, nom, prix, description) {
    const { status, data } = await updateItem(
      session.token,
      id,
      nom,
      prix,
      description
    );
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
  }

  async function handleMoveup(id) {
    const { status } = await movedownItem(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload without loadin spinner
    handleFetchItems(false);
  }

  async function handleMovedown(id) {
    const { status } = await moveupItem(session.token, id);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // reload without loadin spinner
    handleFetchItems(false);
  }

  function itemReducer(currState, action) {
    let res = "";
    let itemId = 0;
    switch (action.type) {
      case "deleteOne":
        itemId = action.payload;
        // deleting item on local data
        res = currState.filter((item) => item.id != itemId);
        // deleting item on remote data
        deleteItem(session.token, itemId);
        return res;
      case "set":
        return action.payload;
      case "moveup":
        handleMoveup(action.payload);
        return currState;
      case "movedown":
        handleMovedown(action.payload);
        return currState;
      case "updateItem":
        res = currState.map(function (item) {
          if (item.id != action.payload.id) {
            return item;
          }
          const tmp = {
            ...item,
            nom: action.payload.nom,
            prix: action.payload.prix,
            description: action.payload.description,
          };
          return tmp;
        });
        // action data
        handleUpdateItem(
          action.payload.id,
          action.payload.nom,
          action.payload.prix,
          action.payload.description
        );
        // return
        return res;
      default:
        return currState;
    }
  }
  async function handleFetchItems(changeLoadinStatus = true) {
    // inits
    if (changeLoadinStatus) {
      setIsLoading(true);
    }
    setError("");

    // fetch data
    const { status, data } = await listItemsFromSectionId(
      session.token,
      section.id
    );
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // set data
    itemDispatcher({ type: "set", payload: data });

    // return
    if (changeLoadinStatus) {
      setIsLoading(false);
    }
    setError("");
  }

  function HandleNewItem(e) {
    // inits
    e.preventDefault();
    // rerdirection
    navigate(`/item/new/${section.dynamic_menu_id}/${section.id}`);
    return false;
  }
  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchItems();
    }
  }, [session]);

  if (isLoading) {
    return (
      <div className="centerDiv">
        <center>
          <HashLoader color={"#000"} size="100px" />
        </center>
      </div>
    );
  }
  if (!items.length) {
    return (
      <div className="centerDiv">
        <button className={styles.ctabutton} onClick={(e) => HandleNewItem(e)}>
          + Ajouter un produit
        </button>
      </div>
    );
  }
  return (
    <>
      <div className="centerDiv grid-container">
        {items.map((item) => {
          return (
            <Item item={item} itemDispatcher={itemDispatcher} key={item.id} />
          );
        })}
      </div>
      <button className={styles.ctabutton} onClick={(e) => HandleNewItem(e)}>
        + Ajouter un produit
      </button>
    </>
  );
}
