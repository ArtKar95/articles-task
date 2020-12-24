import React, { useEffect, useState } from "react";
import {
  Button,
  InputGroup,
  FormControl,
  Form,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";
import classes from "./AddArticles.module.css";
import {
  showAlert,
  createArticle,
  getArticles,
} from "../../../redux/actionCreators";
import { Alert } from "../../alert/Alert";
import idGenerator from "../../../helpers/idGenerator";

const AddArticles = (props) => {
  useEffect(() => {
    (() => {
      !props.userInfo && props.history.push("/");
    })();
  });

  const [params, setParams] = useState({
    title: "",
    text: "",
    authorName: "",
  });

  const [category, setCategory] = useState("");
  const categoryOptions = [
    "Education",
    "Tourism",
    "Footbole",
    "Animals",
    "Other",
  ];

  const handleChange = ({ target: { name, value } }) => {
    setParams({ ...params, [name]: value }); 
  };

  const handelSave = () => {
    let articleId = idGenerator();
    let date = new Date().toLocaleString().slice(0, 20);
    const data = { ...params, category, date, articleId };

    for (let key in data) {
      if (!data[key].trim()) {
        return props.showAlert(`All fields arr requard`);
      }
    }
    props.createArticle(data);
    setTimeout(() => {
      props.getArticles();      //backandum usha id-in generacnum ,ete shut aner kanchelu kariqel cher lini
    }, 2000);
    props.history.push("/articles");
  };

  return (
    <>
      <div className={classes.taskPage}>
        {props.alert ? (
          <Alert text={props.alert} />
        ) : (
          <h1>Create your article</h1>
        )}

        <InputGroup className="mx-auto mt-5 w-50 ">
          <FormControl
            placeholder="Article title"
            name="title"
            onChange={handleChange}
          />
        </InputGroup>

        <InputGroup>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Article text"
            className="m-3"
            onChange={handleChange}
            name="text"
          />
        </InputGroup>

        <InputGroup className="ml-3">
          <FormControl
            placeholder="Author name"
            className="mr-3"
            name="authorName"
            onChange={handleChange}
          />

          <DropdownButton
            title={category ? category : "Category"}
            className="mr-5"
          >
            {categoryOptions.map((item, index) => (
              <Dropdown.Item
                onClick={() => setCategory(item)}
                key={index}
                active={item === category}
              >
                {item}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </InputGroup>

        <div className="text-center">
          <Button variant="success" className="mt-4" onClick={handelSave}>
            <FontAwesomeIcon icon={faSave} /> Create article
          </Button>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    alert: state.alert,
  };
};

const mapDispatchToProps = {
  showAlert,
  createArticle,
  getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddArticles);
