import { useState } from "react";
import { HashLoader } from "react-spinners";
import styles from "../pages/Login.module.css";
import Config from "./Config";

export default function Item({ item, itemDispatcher }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isEditImageMode, setIsEditImageMode] = useState(false);
  const [nom, setNom] = useState(item.nom);
  const [description, setDescription] = useState(item.description);
  const [prix, setPrix] = useState(parseFloat(item.prix));
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const apiGetImage = Config.tabluuu_server_url + "/getFile?";

  function HandleSetEditMode(e) {
    e.preventDefault();
    setIsEditMode(true);
    return false;
  }
  function HandleSetEditImageMode(e) {
    e.preventDefault();
    setIsEditImageMode(true);
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
  function HandleAnnulerImage(e) {
    e.preventDefault();
    setIsEditImageMode(false);
    return false;
  }

  function HandleConfirm(e) {
    e.preventDefault();
    const newItem = { id: item.id, nom, prix, description };
    itemDispatcher({ type: "updateItem", payload: newItem });
    setIsEditMode(false);
    return false;
  }
  function HandleConfirmImage(e, id) {
    // init
    e.preventDefault();
    // verif
    if (!image) {
      return false;
    }
    // action
    setIsLoading(true);
    itemDispatcher({
      type: "HandleSetImage",
      payload: { id: id, image: image },
    });
    // return
    setIsEditImageMode(false);
    setIsLoading(false);
    return false;
  }

  function HandleMoveUp(e, id) {
    e.preventDefault();
    itemDispatcher({ type: "moveup", payload: id });
    return false;
  }

  function HandleMoveDown(e, id) {
    e.preventDefault();
    itemDispatcher({ type: "movedown", payload: id });
    return false;
  }

  function handleChangeImage(e) {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImage(file);
    } else {
      alert("Veuillez sélectionner un fichier image.");
    }
  }

  function HandleRemoveImage(e, id) {
    e.preventDefault();
    itemDispatcher({ type: "HandleRemoveImage", payload: id });
    // return
    setIsEditImageMode(false);
    setIsLoading(false);
    return false;
  }

  if (isLoading) {
    return (
      <center>
        <HashLoader color={"#000"} size="100px" />
      </center>
    );
  }

  if (isEditImageMode) {
    return (
      <div className="centerDiv grid-colonne">
        <form>
          {item.thumbnail && (
            <div>
              <a href={`${apiGetImage}${item.image}`} target="_blank">
                <img src={`${apiGetImage}${item.thumbnail}`} alt="thumbnail" />
              </a>
            </div>
          )}

          <div className={styles.row}>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => handleChangeImage(e)}
            />
          </div>
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
              onClick={(e) => HandleConfirmImage(e, item.id)}
            >
              Envoyer
            </button>
            {item.thumbnail && (
              <button
                className={styles.minibutton_red}
                onClick={(e) => HandleRemoveImage(e, item.id)}
              >
                <i className="fas fa-remove" alt="Supprimer l'image"></i>
              </button>
            )}
          </div>
        </form>
      </div>
    );
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
  if (!isEditMode && !isEditImageMode) {
    return (
      <div className="grid-colonne">
        {item.thumbnail && (
          <p>
            <a href={`${apiGetImage}${item.image}`} target="_blank">
              <img src={`${apiGetImage}${item.thumbnail}`} alt="thumbnail" />
            </a>
          </p>
        )}
        <p>
          {nom} - {prix}&nbsp;€ <br />
          {description}
        </p>
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
            onClick={(e) => HandleSetEditImageMode(e, item.id)}
          >
            <i className="fas fa-file-image" alt="Modifier l'image"></i>
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
