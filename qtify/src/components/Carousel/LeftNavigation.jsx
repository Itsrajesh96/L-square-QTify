
import React from "react";
import leftArrow from "../../assets/left-arrow.svg";
import styles from "./LeftNavigation.module.css";

function LeftNavigation({ onClick, disabled = false }) {
  return (
    <button
      type="button"
      className={styles.navigationButton}
      onClick={onClick}
      disabled={disabled}
      aria-label="Previous albums"
    >
      <img src={leftArrow} alt="" />
    </button>
  );
}

export default LeftNavigation;
