import Config from "../components/Config.jsx";
import axios from "axios";

async function listItemsFromSectionId(token, sectionId) {
  try {
    const url =
      Config.tabluuu_server_url + "/admin/item/listbysectionid/" + sectionId;
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

async function updateItem(token, id, nom, prix, description) {
  const inputs = { nom: nom, prix: prix, description: description };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/item/partialupdate/" + id;
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
    return { status: error.response?.status || 500 };
  }
}

async function deleteItem(token, id) {
  const url = Config.tabluuu_server_url + "/admin/item/" + id;
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
    return { status: error.response?.status || 500 };
  }
}

async function createItem(token, sectionId, nom, prix, description) {
  const inputs = {
    section_id: sectionId,
    nom: nom,
    prix: prix,
    description: description,
  };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/item";
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

async function moveupItem(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/item/moveup/" + id;
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

async function movedownItem(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/item/movedown/" + id;
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

async function setImageItem(token, id, imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);
  const url = Config.tabluuu_server_url + "/admin/item/setimage/" + id;
  const headers = {
    "Content-Type": "multipart/form-data",
    Authorization: token,
  };
  try {
    const response = await axios.patch(url, formData, {
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

async function removeImageItem(token, id) {
  const inputs = {};
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/item/removeimage/" + id;
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
  listItemsFromSectionId,
  updateItem,
  deleteItem,
  createItem,
  moveupItem,
  movedownItem,
  setImageItem,
  removeImageItem,
};
