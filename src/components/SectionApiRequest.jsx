import Config from "../components/Config.jsx";
import axios from "axios";

async function fetchSections(dynMenuId, token) {
  try {
    const url =
      Config.tabluuu_server_url +
      "/admin/section/getsectionsfromdynmenu/" +
      dynMenuId;
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

async function createSection(token, dynamicmenuId, nom) {
  const inputs = {
    dynamic_menu_id: dynamicmenuId,
    nom: nom,
  };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/section";
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

async function fetchSection(id, token) {
  try {
    const url = Config.tabluuu_server_url + "/admin/section/" + id;
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

async function updateSection(token, id, nom) {
  const inputs = { nom: nom };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/section/" + id;
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

/*

async function moveupDynamicMenu(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/dynamicmenu/moveup/" + id;
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

async function movedownDynamicMenu(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/dynamicmenu/movedown/" + id;
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
*/
export { fetchSections, createSection, fetchSection, updateSection };
