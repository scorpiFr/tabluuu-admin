import Config from "../components/Config.jsx";
import axios from "axios";

async function fetchBills(token, etablissement_id) {
  try {
    const url =
      Config.tabluuu_server_url +
      "/admin/bill/listbyetablissement/" +
      etablissement_id;
    const response = await axios.get(url, {
      headers: {
        Authorization: token,
      },
    });
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
  }
}

async function setBillPaid(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/bill/setpaid/" + id;
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
    return {
      status: error.response?.status || 500,
    };
  }
}

/*


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
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
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
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
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
    return {
      status: error.response?.status || 500,
    };
  }
}

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
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
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
    return { status: response.status, data: response.data };
  } catch (error) {
    console.log(error);
    return {
      status: error.response?.status || 500,
      data: error.response?.data || {},
    };
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
    return {
      status: error.response?.status || 500,
    };
  }
}
  */

export { fetchBills, setBillPaid };
