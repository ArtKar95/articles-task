import React, { useEffect, useState } from "react";
import { Alert } from "../alert/Alert";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { createAccount, showAlert } from "../../redux/actionCreators";

const Login = (props) => {
  const { createAccount, userInfo } = props;

  const [params, setParams] = useState({
    email: "",
    password: "",
    userName: "",
  });
  useEffect(() => {
    (() => {
      !!userInfo && props.history.push("/articles");
    })();
  });

  const handleChange = ({ target: { name, value } }) => {
    setParams({ ...params, [name]: value }); 
  };

  return (
    <Form className="w-50 mx-auto mt-4 bg-dark p-5">
      <h1 className="text-center my-2 text-white">Sign up</h1>

      <Form.Group>
        <Form.Label className="text-white">Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="email@example.com"
          name="email"
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="text-white">Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="text-white">Password</Form.Label>
        {!props.alert ? (
          <Form.Control
            type="text"
            placeholder="Nickname"
            name="userName"
            onChange={handleChange}
          />
        ) : (
          <Alert text={props.alert} />
        )}
      </Form.Group>
      <Form.Group className="text-center">
        <Button
          variant="info"
          className=" px-5"
          onClick={() => {
            !!params.userName.trim()
              ? createAccount(params)
              : props.showAlert(`Nickname is requard`);
          }}
        >
          Sign up
        </Button>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  createAccount,
  showAlert,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
