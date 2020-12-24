import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { connect } from "react-redux";
import { logInAccount } from "../../redux/actionCreators";

const Login = (props) => {
  const { logInAccount, userInfo } = props;

  const [params, setParams] = useState({
    email: "",
    password: "",
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
      <h1 className="text-center my-2 text-white">Log in</h1>

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
      <Form.Group className="text-center">
        <Button
          variant="success"
          className="text-center px-5"
          onClick={() => {
            logInAccount(params);
          }}
        >
          Log in
        </Button>
      </Form.Group>
    </Form>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
  };
};

const mapDispatchToProps = {
  logInAccount,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
