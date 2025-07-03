import Config from "../components/Config.jsx";
import axios from "axios";

async function fetchDynamicMenus(etablissement_id, token) {
  try {
    const url =
      Config.tabluuu_server_url +
      "/admin/dynamicmenu/listetablissementdynmenus/" +
      etablissement_id;
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

async function fetchDynamicMenu(id, token) {
  try {
    const url = Config.tabluuu_server_url + "/admin/dynamicmenu/" + id;
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

async function createDynamicMenus(etablissement_id, token, nom) {
  const inputs = {
    etablissement_id: etablissement_id,
    nom: nom,
  };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/dynamicmenu";
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  };
  try {
    const response = await axios.post(url, inputData, {
      headers: headers,
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return { status: error.response.status, data: error.response.statusText };
  }
}

async function setDynamicMenuSelected(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url =
    Config.tabluuu_server_url + "/admin/dynamicmenu/setselected/" + id;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  };
  try {
    const response = await axios.patch(url, inputData, {
      headers: headers,
    });
    return { status: response.status };
  } catch (error) {
    console.log(error);
    return { status: error.response.status };
  }
}

async function updateDynamicMenu(token, id, nom) {
  const inputs = { nom: nom };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/dynamicmenu/" + id;
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization: token,
  };
  try {
    const response = await axios.patch(url, inputData, {
      headers: headers,
    });
    return { status: response.status };
  } catch (error) {
    console.log(error);
    return { status: error.response.status };
  }
}

async function deleteDynamicMenu(token, id) {
  const url = Config.tabluuu_server_url + "/admin/dynamicmenu/" + id;
  const headers = {
    Authorization: token,
  };
  try {
    const response = await axios.delete(url, {
      headers: headers,
    });
    return { status: response.status };
  } catch (error) {
    console.log(error);
    return { status: error.response.status };
  }
}

export {
  fetchDynamicMenus,
  fetchDynamicMenu,
  createDynamicMenus,
  setDynamicMenuSelected,
  updateDynamicMenu,
  deleteDynamicMenu,
};
