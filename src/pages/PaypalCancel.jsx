import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function PaypalCancel() {
  let navigate = useNavigate();
  useEffect(() => {
    navigate("/mesfactures");
  }, []);

  return "";
}
