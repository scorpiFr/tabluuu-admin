import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { HashLoader } from "react-spinners";
import styles from "./Login.module.css";
import Header from "../components/Header";
import {
  fetchSections,
  deleteSection,
  moveupSection,
  movedownSection,
} from "../components/SectionApiRequest";
import ItemList from "../components/ItemList";

export default function DynamicMenuRead({ session, dispatchSession }) {
  const [sections, setSections] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const { dynamicmenuid } = useParams();

  async function handleFetchSections(changeLoadinStatus = true) {
    // inits
    if (changeLoadinStatus) {
      setIsLoading(true);
    }
    setError("");

    // fetch data
    const { status, data } = await fetchSections(dynamicmenuid, session.token);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // set data
    setSections(data);

    // return
    if (changeLoadinStatus) {
      setIsLoading(false);
    }
    setError("");
  }

  async function HandleRemove(e, sectionId) {
    // inits
    e.preventDefault();
    // setIsLoading(true);
    setError("");

    // action data
    const { status, data } = await deleteSection(session.token, sectionId);
    // error management
    if (status == 401) {
      setIsLoading(false);
      dispatchSession("reset");
      navigate("/login");
    }
    // re-fetch
    handleFetchSections(false);

    // return
    setIsLoading(false);
    setError("");
  }

  async function mooveSection(direction, sectionId) {
    // move in db
    const { status, data } =
      direction === "up"
        ? await movedownSection(session.token, sectionId)
        : await moveupSection(session.token, sectionId);
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
    const [section1, section2] = data;
    if (!section1 || !section2) {
      return;
    }
    // update in local
    let res = sections.map(function (section) {
      if (section.id === section1.id) return section1;
      if (section.id === section2.id) return section2;
      return section;
    });
    // sorting
    res = res.sort((a, b) => a.position - b.position);
    // update
    setSections(res);
  }

  function HandleMoveUp(e, sectionId) {
    // inits
    e.preventDefault();
    // action
    mooveSection("up", sectionId);
    // return
    setError("");
    return false;
  }

  function HandleMoveDown(e, sectionId) {
    // inits
    e.preventDefault();
    // action
    mooveSection("down", sectionId);
    // return
    setError("");
    return false;
  }

  function HandleNewSection(e) {
    e.preventDefault();
    navigate("/section/new/" + dynamicmenuid);
    return false;
  }
  function HandleGotoEdit(e, id) {
    e.preventDefault();
    navigate("/section/edit/" + id);
    return false;
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

  if (isLoading) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Mes sections</h1>
        <p>Chaque carte comporte des sections</p>
        <p>&nbsp;</p>
        <button
          className={styles.ctabutton}
          onClick={(e) => HandleNewSection(e)}
        >
          + Ajouter une section
        </button>
        <p>&nbsp;</p>
        <center>
          <HashLoader color={"#000"} size="200px" />
        </center>
      </div>
    );
  }
  if (!sections.length) {
    return (
      <div className="centerDiv">
        <Header />
        <h1>Mes sections</h1>
        <p>Chaque carte comporte des sections</p>
        <p>&nbsp;</p>
        <button
          className={styles.ctabutton}
          onClick={(e) => HandleNewSection(e)}
        >
          + Ajouter une section
        </button>
        <p>&nbsp;</p>
        <ul>
          <li className="tab">
            <p>Aucune section trouvée</p>
          </li>
        </ul>
      </div>
    );
  }

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
      <ul className="no-bullets">
        {sections.map((section) => {
          return (
            <li key={section.id}>
              <p className="tab">
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
                  onClick={(e) => HandleMoveUp(e, section.id)}
                >
                  <i className="fas fa-arrow-up" alt="Monter"></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton}
                  onClick={(e) => HandleMoveDown(e, section.id)}
                >
                  <i className="fas fa-arrow-down" alt="Descendre"></i>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  className={styles.minibutton_red}
                  onClick={(e) => HandleRemove(e, section.id)}
                >
                  <i className="fas fa-remove" alt="Supprimer"></i>
                </button>
              </p>
              <div>
                <ItemList
                  session={session}
                  dispatchSession={dispatchSession}
                  section={section}
                  key={section.id}
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
