import Config from "../components/Config.jsx";
import axios from "axios";

async function fetchStaticItems(token, staticMenuId) {
  try {
    const url =
      Config.tabluuu_server_url +
      "/admin/staticitem/listbystaticmenuid/" +
      staticMenuId;
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

async function createStaticItem(token, staticMenuId, imageFile) {
  const formData = new FormData();
  formData.append("static_menu_id", staticMenuId);
  formData.append("image", imageFile);
  const url = Config.tabluuu_server_url + "/admin/staticitem";
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: token,
  };
  try {
    const response = await axios.post(url, formData, {
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

async function deleteStaticItem(token, id) {
  const url = Config.tabluuu_server_url + "/admin/staticitem/" + id;
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

async function moveupStaticItem(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/staticitem/moveup/" + id;
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

async function movedownStaticItem(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/staticitem/movedown/" + id;
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

export {
  fetchStaticItems,
  createStaticItem,
  deleteStaticItem,
  moveupStaticItem,
  movedownStaticItem,
};
