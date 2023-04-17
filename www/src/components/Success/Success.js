import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Success.scss";

const Success = () => {
  const navigate = useNavigate();

  return (
    <div style={styles}>
      <div className="success">
        <div className="center-align">
          <h1 className="text-blue lighten-1">Success</h1>

          <NavLink
            to={navigate(-1)}
            className="waves-effect waves-light btn button blue lighten-1"
          >
            Ok
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Success;
