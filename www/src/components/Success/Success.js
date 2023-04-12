import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./Success.scss";

const Success = () => {
  return (
    <div style={styles}>
      <NavLink to="/link">
        <div className="success">
          <h1 className="text-blue lighten-1">Success</h1>
        </div>
      </NavLink>
    </div>
  );
};

export default Success;
