import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import { fetchSections } from "../components/SectionApiRequest";

export default function DynamicMenuRead({ session, dispatchSession }) {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { dynamicmenuid } = useParams();

  async function handleFetchSections(changeReload = false) {
    // inits
    if (changeReload) {
      setIsLoading(true);
    }
    setError("");

    // fetch data
    const { status, data } = await fetchSections(dynamicmenuid, session.token);
    console.log(status, data);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // set data
    setSections(data);

    // return
    if (changeReload) {
      setIsLoading(false);
    }
    setError("");
  }

  function HandleNewSection() {
    navigate("/section/new/" + dynamicmenuid);
  }
  function HandleGotoEdit() {
    navigate("/section/edit/" + dynamicmenuid);
  }

  // verify session & get etablissement
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchSections();
    }
  }, [session]);

  return (
    <div className="centerDiv">
      <Header />
      <h1>Mes sections</h1>
      <p>Chaque carte comporte des sections</p>
      <p>&nbsp;</p>
      <button className={styles.ctabutton} onClick={(e) => HandleNewSection(e)}>
        + Ajouter une section
      </button>
      <p>&nbsp;</p>
      <ul>
        {sections.map((section) => {
          return (
            <li className="tab" key={section.id}>
              <p>
                {section.nom}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton}
                  onClick={(e) => HandleGotoEdit(e, section.id)}
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
