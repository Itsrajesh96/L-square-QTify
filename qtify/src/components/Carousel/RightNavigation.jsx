
import React from "react";
import rightArrow from "../../assets/right-arrow.svg";
import styles from "./RightNavigation.module.css";

function RightNavigation({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={styles.navigationButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Next albums"
    >
      <img src={rightArrow} alt="" />
    </button>
  );
}

export default RightNavigation;
