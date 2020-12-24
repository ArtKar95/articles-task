import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import { Switch, Route } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import { connect } from "react-redux";
import Header from "./components/header/Header";
import Nav from "./components/nav/Nav";
import Articles from "./components/articles/Articles";
import Loader from "./components/loader/loader";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import InfoPage from "./components/infoPage/infoPage";
import AddArticles from "./components/articles/addArticles/AddArticles";
import ArticlePage from "./components/articlePage/ArticlePage";
import AccountPage from "./components/accountPage/AccountPage";

class App extends React.Component {
  componentDidUpdate() {
    const { successMessage, error } = this.props;
    if (successMessage) {
      toast.success(successMessage);
    }
    if (error) {
      toast.error(error);
    }
  }

  render() {
    return (
      <div className="app">
        <Header />
        <Nav />
        <div className="appContainer">
          <Switch>
            <Route path="/" exact component={InfoPage} />
            <Route path="/create" exact component={AddArticles} />
            <Route path="/articles" exact component={Articles} />
            <Route path="/account" exact component={AccountPage} />
            <Route path="/login" exact component={Login} />
            <Route path="/signup" exact component={SignUp} />
            <Route path="/article/:id" exact component={ArticlePage} />
            <Route path="*" exact component={NotFoundPage} />
          </Switch>
        </div>

        <ToastContainer
          position="bottom-left"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {this.props.loading && <Loader />}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.error,
    successMessage: state.successMessage,
    loading: state.loading,
  };
};

export default connect(mapStateToProps, null)(App);
