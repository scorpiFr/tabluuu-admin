import styles from "../pages/Login.module.css";
import { useState } from "react";

export default function Item({ item, itemDispatcher }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [nom, setNom] = useState(item.nom);
  const [description, setDescription] = useState(item.description);
  const [prix, setPrix] = useState(parseFloat(item.prix));

  function HandleSetEditMode(e) {
    e.preventDefault();
    setIsEditMode(true);
    return false;
  }

  function HandleRemove(e, itemId) {
    e.preventDefault();
    itemDispatcher({ type: "deleteOne", payload: itemId });
    return false;
  }

  function handlePrix(value) {
    value = value.trim().replace(",", ".");
    setPrix(value);
  }
  function HandleAnnuler(e) {
    e.preventDefault();
    setNom(item.nom);
    setDescription(item.description);
    setPrix(item.prix);
    setIsEditMode(false);
    return false;
  }

  function HandleConfirm(e) {
    e.preventDefault();
    const newItem = { id: item.id, nom, prix, description };
    itemDispatcher({ type: "updateItem", payload: newItem });
    setIsEditMode(false);
    return false;
  }

  if (isEditMode) {
    return (
      <div className="centerDiv grid-colonne">
        <form>
          <div className={styles.row}>
            <input
              type="text"
              id="nom"
              onChange={(e) => setNom(e.target.value)}
              value={nom}
              placeholder="Nom"
            />
          </div>
          <div className={styles.row}>
            <input
              type="text"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder="Description"
            />
          </div>
          <div
            className={styles.row}
            style={{ display: "inline", fontSize: "16px" }}
          >
            Prix :
            <input
              type="text"
              id="prix"
              onChange={(e) => handlePrix(e.target.value)}
              value={prix}
              placeholder="0.00"
              style={{ width: "75px" }}
            />
            &nbsp;€
          </div>
          <div>
            <button
              className={styles.minibutton}
              onClick={(e) => HandleAnnuler(e)}
            >
              Annuler
            </button>
            &nbsp;
            <button
              className={styles.minibutton_green}
              onClick={(e) => HandleConfirm(e)}
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    );
  }
  if (!isEditMode) {
    return (
      <div className="grid-colonne">
        <p>
          {nom} - {prix}&nbsp;€
        </p>
        <p>{description}</p>
        <p>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton}
            onClick={(e) => HandleSetEditMode(e, item.id)}
          >
            <i className="fas fa-edit" alt="Modifier"></i>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton}
            onClick={(e) => HandleMoveUp(e, item.id)}
          >
            <i className="fas fa-arrow-up" alt="Monter"></i>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton}
            onClick={(e) => HandleMoveDown(e, item.id)}
          >
            <i className="fas fa-arrow-down" alt="Descendre"></i>
          </button>
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button
            className={styles.minibutton_red}
            onClick={(e) => HandleRemove(e, item.id)}
          >
            <i className="fas fa-remove" alt="Supprimer"></i>
          </button>
        </p>
      </div>
    );
  }
}
