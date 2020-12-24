import React from "react";
import classes from "./Nav.module.css";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const Nav = (props) => {
  return (
    <div className={classes.navContainer}>
      {!!props.userInfo && (
        <ul>
          <li>
            <NavLink to="/articles" exact activeClassName={classes.activeLink}>
              Articles
            </NavLink>
          </li>

          <li>
            <NavLink to="/create" exact activeClassName={classes.activeLink}>
              Create articles
            </NavLink>
          </li>
          
          <li>
            <NavLink to="/account" exact activeClassName={classes.activeLink}>
              My Account
            </NavLink>
          </li>
        </ul>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

export default connect(mapStateToProps, null)(Nav);
