import React, { useEffect, useState } from "react";
import classes from "./AccountPage.module.css";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import {
  logOutAccount,
  changePassword,
  changeUserName,
} from "../../redux/actionCreators";
import NotFoundPage from "../notFoundPage/NotFoundPage";

const AccountPage = (props) => {
  const { userInfo, idToken } = props;
  useEffect(() => {
    (() => {
      !userInfo && props.history.push("/");
    })();
  });

  const [params, setParams] = useState({
    userName: "",
    password: "",
  });

  const handleChange = ({ target: { name, value } }) => {
    setParams({ ...params, [name]: value });
  };
  return (
    <>
      {!!userInfo && userInfo.email ? (
        <div className={classes.accountPage}>
          <div>Your Email: {userInfo.email}</div>
          <div>Your Nickname: {userInfo.userName}</div>

          <InputGroup className="mb-3 w-50 mx-auto">
            <FormControl
              placeholder="Change Nickname"
              onChange={handleChange}
              className="w-50"
              name="userName"
            />
            <InputGroup.Append>
              <Button
                variant="success"
                onClick={() =>
                  props.changeUserName({
                    ...userInfo,
                    userName: params.userName,
                  })
                }
              >
                Change
              </Button>
            </InputGroup.Append>
          </InputGroup>

          <InputGroup className="mb-3 w-50 mx-auto">
            <FormControl
              type="password"
              placeholder="Change password"
              className="w-50"
              name="password"
              onChange={handleChange}
            />
            <InputGroup.Append>
              <Button
                variant="success"
                onClick={() => props.changePassword(idToken, params.password)}
              >
                Change
              </Button>
            </InputGroup.Append>
          </InputGroup>
          <div>
            <Button size="lg" variant="danger" onClick={props.logOutAccount}>
              logout
            </Button>
          </div>
        </div>
      ) : (
        <NotFoundPage />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    idToken: state.idToken,
  };
};

const mapDispatchToProps = {
  logOutAccount,
  changePassword,
  changeUserName,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountPage);
