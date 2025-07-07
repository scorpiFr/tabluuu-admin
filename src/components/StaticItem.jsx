import styles from "../pages/Login.module.css";
import Config from "./Config";

export default function Item({ item, itemDispatcher }) {
  const apiGetImage = Config.tabluuu_server_url + "/getFile?";

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

  function HandleRemove(e, id) {
    e.preventDefault();
    itemDispatcher({ type: "remove", payload: id });
    return false;
  }

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
