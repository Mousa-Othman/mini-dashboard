// src/components/Button/Button.jsx
import React from "react";
import styles from "./Button.module.css";

function Button({ text, onClick, variant = "primary" }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
