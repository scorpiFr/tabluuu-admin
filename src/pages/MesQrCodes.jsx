import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./Login.module.css";
import { HashLoader } from "react-spinners";
import { fetchEtablissement } from "../components/EtablissementApiRequests";
import Config from "../components/Config.jsx";

export default function MesQrCodes({ session, dispatchSession }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [etalissement, setEtalissement] = useState(null);

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
        <h1>Mes QR codes</h1>
        <p>
          &lt; {page == 1 ? "1" : <Link to={`/mesqrcodes?page=1`}>1</Link>} -
          {page == 2 ? "2" : <Link to={`/mesqrcodes?page=2`}>2</Link>} -
          {page == 3 ? "3" : <Link to={`/mesqrcodes?page=3`}>3</Link>} -
          {page == 4 ? "4" : <Link to={`/mesqrcodes?page=4`}>4</Link>}
          &gt;
        </p>
        <table>
          <tbody>
            <tr>
              <td>
                <p>table_{cpt + 1}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 1}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 2}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 2}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 3}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 3}`}
                  alt="Qrcode"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>table_{cpt + 4}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 4}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 5}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 5}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 6}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 6}`}
                  alt="Qrcode"
                />
              </td>
            </tr>
            <tr>
              <td>
                <p>table_{cpt + 7}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 7}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 8}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 8}`}
                  alt="Qrcode"
                />
              </td>
              <td>
                <p>table_{cpt + 9}</p>
                <img
                  className="qrCodeImage"
                  src={`${link}${cpt + 9}`}
                  alt="Qrcode"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </center>
    );
  }
}
