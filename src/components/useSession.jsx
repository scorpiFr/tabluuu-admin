import { useReducer, useEffect } from "react";

export default function useSession() {
  function reducer(currState, action) {
    switch (action.type) {
      case "logout":
        return {};
      case "set":
        return action.payload;
      default:
        return currState;
    }
  }

  const [session, dispatchSession] = useReducer(
    reducer,
    null,
    getFromLocalStorage
  );

  // init
  function getFromLocalStorage() {
    const storageValue = localStorage.getItem("session");
    const res =
      typeof storageValue !== "undefined" && storageValue !== "undefined"
        ? JSON.parse(storageValue)
        : null;
    return res;
  }

  // update
  useEffect(
    function () {
      localStorage.setItem("session", JSON.stringify(session));
    },
    [session]
  );

  return { session, dispatchSession };
}
