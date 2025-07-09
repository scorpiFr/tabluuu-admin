import { useState, useEffect } from "react";

export default function ToggleSwitch({ initial = false, onToggle = () => {} }) {
  const [active, setActive] = useState(initial);

  useEffect(() => {
    setActive(initial); // synchronise en cas de changement de `initial`
  }, [initial]);

  const handleClick = () => {
    const newState = !active;
    setActive(newState);
    onToggle(newState); // Appelle la callback avec le nouvel état
  };

  return (
    <div
      onClick={handleClick}
      style={{
        width: "80px",
        height: "34px",
        backgroundColor: active ? "#4ade80" : "#ccc",
        borderRadius: "34px",
        padding: "4px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: active ? "flex-end" : "flex-start",
        transition: "background-color 0.3s",
        fontFamily: "sans-serif",
        fontSize: "14px",
        color: "#000",
      }}
    >
      <div
        style={{
          width: "40px",
          height: "26px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "bold",
          transition: "transform 0.3s",
        }}
      >
        {active ? "oui" : "non"}
      </div>
    </div>
  );
}
