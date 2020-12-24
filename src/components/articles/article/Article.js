import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { formatDate, shortStr } from "../../../helpers/utils";

const Article = (props) => {
  let { article } = props;

  return (
    <Card className={"my-3 mx-3"}>
      <Card.Body>
        <Link to={`article/${article.articleId}`}>
          <Card.Title>
            {shortStr(article.title, 6)}{" "}
            <FontAwesomeIcon icon={faArrowAltCircleLeft} />
          </Card.Title>
        </Link>

        <Card.Text className="text-info">
          Category: {article.category}
        </Card.Text>

        <Card.Text>Description: {shortStr(article.text, 4)}</Card.Text>

        <Card.Text className="text-danger">
          Date: {formatDate(article.date)}
        </Card.Text>
        <Card.Text className="font-weight-bold">
          Author: {shortStr(article.authorName, 6)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Article;
