import React from "react";
import {
  Col,
  Container,
  InputGroup,
  Row,
  FormControl,
  Button,
} from "react-bootstrap";
import Article from "./article/Article";
import { connect } from "react-redux";
import { getArticles } from "../../redux/actionCreators";
import NotFoundPage from "../notFoundPage/NotFoundPage";
import { filterTitel, filterDate } from "../../helpers/utils";

class Articles extends React.PureComponent {
  state = {
    filterText: "",
    filterArticles: null,
    toggleDate: false,
  };

  componentDidMount() {
    if (!!this.props.articles) this.props.getArticles();
  }

  handleChange = (event) => {
    this.setState({ filterText: event.target.value });
  };

  handleSave = () => {
    const filterArticles = filterTitel(
      this.props.articles,
      this.state.filterText
    );
    this.setState({ ...this.state, filterArticles });
    this.setState({ filterText: "" });
  };

  toggleDateFilter = (type) => {
    if (type === "DESC") {
      this.setState({ ...this.state, toggleDate: true });
    }
    if (type === "ASC") {
      this.setState({ ...this.state, toggleDate: false });
    }
  };

  render() {
    const { userInfo, articles } = this.props;
    const { filterArticles, filterText, toggleDate } = this.state;
    let articlesComponent;
    if (!!toggleDate) {
      filterDate(articles, "DESC");
    } else {
      filterDate(articles, "ASC");
    }
    if (!!filterArticles && !!filterArticles.length) {
      articlesComponent = filterArticles.map((article, index) => {
        return (
          <Col key={index} xl={3} lg={4} md={6} sm={12} xs={12}>
            <Article article={article} />
          </Col>
        );
      });
    } else {
      articlesComponent = articles.map((article, index) => {
        return (
          <Col key={index} xl={3} lg={4} md={6} sm={12} xs={12}>
            <Article article={article} />
          </Col>
        );
      });
    }

    return (
      <>
        {!!userInfo && userInfo.email ? (
          <Container>
            <InputGroup className="mt-2">
              <FormControl
                placeholder="Filter by title"
                onChange={this.handleChange}
                value={filterText}
              />
              <InputGroup.Append>
                <Button variant="success" onClick={this.handleSave}>
                  Filter
                </Button>
                <Button
                  variant="info"
                  className="mx-1"
                  onClick={() => this.toggleDateFilter("ASC")}
                >
                  ASC
                </Button>
                <Button
                  variant="info"
                  onClick={() => this.toggleDateFilter("DESC")}
                >
                  DESC
                </Button>
              </InputGroup.Append>
            </InputGroup>

            <Row>{articlesComponent}</Row>
          </Container>
        ) : (
          <NotFoundPage />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userInfo,
    articles: state.articles,
  };
};

const mapDispatchToProps = {
  getArticles,
};

export default connect(mapStateToProps, mapDispatchToProps)(Articles);
