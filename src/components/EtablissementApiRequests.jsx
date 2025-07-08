import Config from "../components/Config.jsx";
import axios from "axios";

async function fetchEtablissements(token) {
  // only for commercials
  try {
    const url = Config.tabluuu_server_url + "/admin/etablissement/";
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

async function fetchEtablissement(id, token) {
  try {
    const url = Config.tabluuu_server_url + "/admin/etablissement/" + id;
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

// update etablissement. but juste for etablissement, not user, commercials or admins.
// limited number of fields updateable.
async function updateEtablissementForEtablissement(
  etablissement_id,
  token,
  emailFacturation,
  emailCommandes,
  nomEtablissement,
  nom,
  prenom,
  adresse,
  tel
) {
  const inputs = {
    nom: nom,
    prenom: prenom,
    nom_etablissement: nomEtablissement,
    adresse: adresse,
    tel: tel,
    email_facturation: emailFacturation,
    email_commandes: emailCommandes,
  };
  const inputData = new URLSearchParams(inputs);
  const url =
    Config.tabluuu_server_url +
    "/admin/etablissement/updateforetablissement/" +
    etablissement_id;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  };
  try {
    const response = await axios.patch(url, inputData, {
      headers: headers,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

async function updatePassword(etablissement_id, token, password) {
  const inputs = {
    password: password,
  };
  const inputData = new URLSearchParams(inputs);
  const url =
    Config.tabluuu_server_url +
    "/admin/etablissement/updatePassword/" +
    etablissement_id;

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  };
  try {
    const response = await axios.patch(url, inputData, {
      headers: headers,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

async function logout(token) {
  const url = Config.tabluuu_server_url + "/admin/logout";
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios.get(url, {
      headers: headers,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

export {
  fetchEtablissement,
  updateEtablissementForEtablissement,
  updatePassword,
  logout,
  fetchEtablissements,
};
