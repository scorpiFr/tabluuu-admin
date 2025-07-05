import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Login.module.css";
import { HashLoader } from "react-spinners";
import { fetchEtablissement } from "../components/EtablissementApiRequests";
import Config from "../components/Config.jsx";

function QrCodeCell({ linkPrefix, cpt, isNameVisible }) {
  return (
    <>
      {isNameVisible && <p>table_{cpt}</p>}
      <img className="qrCodeImage" src={`${linkPrefix}${cpt}`} alt="Qrcode" />
    </>
  );
}

export default function MesQrCodes({ session, dispatchSession }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [etalissement, setEtalissement] = useState(null);
  const [isNameVisible, setIsNameVisible] = useState(true);

  async function handleFetchEtalissement() {
    // inits
    setIsLoading(true);
    // fetch data
    const { status, data } = await fetchEtablissement(
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
    setEtalissement(data);
    // return
    setIsLoading(false);
  }

  // verify session
  let navigate = useNavigate();
  useEffect(() => {
    if (!session) {
      navigate("/login");
    } else {
      handleFetchEtalissement();
    }
  }, [session]);

  if (isLoading) {
    return (
      <center>
        <HashLoader color={"#000000"} size="200px" />
      </center>
    );
  }

  if (etalissement) {
    let page = searchParams.get("page") ?? 1;
    if (page <= 0) page = 1;
    if (page > 4) page = 4;

    const cpt = (page - 1) * 9;
    const type = etalissement.type ?? "bar";
    const id = etalissement.id;
    const link = `${Config.tabluuu_server_url}/getqrcode/?barid=${id}&type=${type}&table=table_`;

    return (
      <center className="qrcodes">
        <Header />
        <h1>
          Mes QR codes&nbsp;&nbsp;
          {isNameVisible && (
            <button
              className={styles.minibutton}
              onClick={() => setIsNameVisible(false)}
            >
              Supprimer les titres
            </button>
          )}
          {!isNameVisible && (
            <button
              className={styles.minibutton}
              onClick={() => setIsNameVisible(true)}
            >
              Remettre les titres
            </button>
          )}
        </h1>
        <p>
          &lt; {page == 1 ? "1" : <Link to={`/mesqrcodes?page=1`}>1</Link>} -
          {page == 2 ? "2" : <Link to={`/mesqrcodes?page=2`}>2</Link>} -
          {page == 3 ? "3" : <Link to={`/mesqrcodes?page=3`}>3</Link>} -
          {page == 4 ? "4" : <Link to={`/mesqrcodes?page=4`}>4</Link>} &gt;
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <QrCodeCell
                  cpt={cpt + 1}
                  key={cpt + 1}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 2}
                  key={cpt + 2}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 3}
                  key={cpt + 3}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QrCodeCell
                  cpt={cpt + 4}
                  key={cpt + 4}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 5}
                  key={cpt + 5}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 6}
                  key={cpt + 6}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
            </tr>
            <tr>
              <td>
                <QrCodeCell
                  cpt={cpt + 7}
                  key={cpt + 7}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 8}
                  key={cpt + 8}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
              <td>
                <QrCodeCell
                  cpt={cpt + 9}
                  key={cpt + 9}
                  linkPrefix={link}
                  isNameVisible={isNameVisible}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    );
  }
}
