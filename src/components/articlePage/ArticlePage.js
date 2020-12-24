import React from "react";
import classes from "./ArticlePage.module.css";
import { connect } from "react-redux";
import { getArticle, sendComment } from "../../redux/actionCreators";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import { InputGroup, Button, Form } from "react-bootstrap";

class ArticlePage extends React.PureComponent {
  state = {
    comment: "",
    comments: [],
  };

  componentDidMount() {
    const taskId = this.props.match.params.id;
    this.props.getArticle(taskId);
    const { article } = this.props;
    if (article && !!article.comments) {
      const comments = Object.values(this.props.article.comments);
      this.setState({
        ...this.state,
        comments: comments,
      });
    } else {
      return;
    }
  }

  handleChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleSave = () => {
    this.props.sendComment(this.state.comment.trim(), this.props.article.id);

    if (!!this.state.comments.length) {
      this.setState({
        ...this.state,
        comments: [this.state.comment, ...this.state.comments],
      });
    } else {
      this.setState({
        ...this.state,
        comments: [this.state.comment],
      });
    }

    this.setState({ comment: "" });
  };

  render() {
    const { article } = this.props;
    let lastComments = [];
    if (!!this.state.comments.length) {
      lastComments = this.state.comments.slice(0, 5).map((item, index) => {
        return <p key={index}>{item}</p>;
      });
    }

    return (
      <>
        {!!article && article.articleId ? (
          <div className={classes.articlePage}>
            <h1>{article.title}</h1>
            <div className={classes.info}>
              <span> Author: {article.authorName}</span>
              <br />
              <span> Category: {article.category}</span>
              <br />
              <span> Created: {article.date} </span>
            </div>
            <div>
              <p>{article.text}</p>
            </div>
            <div className={classes.comments}>
              ...comments
              {lastComments}
            </div>
            <InputGroup>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="What you think..."
                className="mt-3 m-3"
                onChange={this.handleChange}
                name="text"
                value={this.state.comment}
              />
            </InputGroup>
            <div className="text-center mb-2">
              <Button
                variant="success"
                className="mb-2"
                onClick={this.handleSave}
              >
                Send comment
              </Button>
            </div>
          </div>
        ) : (
          <NotFoundPage />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    article: state.article,
    comments: state.comments,
  };
};

const mapDispatchToProps = {
  getArticle,
  sendComment,
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticlePage);
