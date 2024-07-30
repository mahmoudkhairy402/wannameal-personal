import React from "react";
import styles from "./logo.module.css";
import { Link } from "react-router-dom";
function Logo() {
  return (
    <>
      <Link to="/">
        <div className={`${styles.logo}`}>Fast Plate</div>
      </Link>
    </>
  );
}

export default Logo;
