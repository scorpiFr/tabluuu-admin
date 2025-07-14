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

async function createBill(
  token,
  etablissement_id,
  month,
  year,
  month_amount,
  qr_board_quantity,
  qr_board_unit_price,
  menu_edit_amount
) {
  const inputs = {
    etablissement_id,
    month,
    year,
    month_amount,
    qr_board_quantity,
    qr_board_unit_price,
    menu_edit_amount,
  };
  const inputData = new URLSearchParams(inputs);
  const url = Config.tabluuu_server_url + "/admin/bill";
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

async function getBillPaypalLink(token, billId) {
  try {
    const url =
      Config.tabluuu_server_url + "/admin/bill/getpaypalapprovelink/" + billId;
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

async function checkPaypalOrderByPaypalId(token, paypalOrderId) {
  try {
    const url =
      Config.tabluuu_server_url +
      "/admin/bill/checkpaypalorderbypaypalid/" +
      paypalOrderId;
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

async function checkPaypalOrder(token, billId) {
  try {
    const url =
      Config.tabluuu_server_url + "/admin/bill/checkpaypalorder/" + billId;
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

export {
  fetchBills,
  setBillPaid,
  createBill,
  getBillPaypalLink,
  checkPaypalOrder,
  checkPaypalOrderByPaypalId,
};
