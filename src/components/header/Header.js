import React from "react";
import classes from "./Header.module.css";
import logo from "../../assets/images/logo.png";
import { NavLink } from "react-router-dom";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";

const Header = (props) => {
  return (
    <div className={classes.headerContainer}>
      <img
        className={classes.logo}
        src={logo}
        alt="Logo"
        style={{ width: "113px" }}
      />

      <Col className="text-right mr-5 mt-3">
        {!!props.userInfo ? (
          <h2 className="text-danger">{props.userInfo.userName}</h2>
        ) : (
          <ul className="list-inline">
            <li className="list-inline-item mr-3">
              <NavLink to="/signup" className="btn btn-info ">
                Sign up
              </NavLink>
            </li>
            <li className="list-inline-item">
              <NavLink to="/login" className="btn btn-success px-3">
                Log in
              </NavLink>
            </li>
          </ul>
        )}
      </Col>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(Header);
