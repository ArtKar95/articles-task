import * as actionTypes from "./actionTypes";
import firebase from "firebase";
import request from "../helpers/request";

const authUrl = "https://identitytoolkit.googleapis.com/v1/accounts:",
  apiKey = "AIzaSyDDC49L5eUH3-ylPjl3AhwDpOGQifGHsVA",
  apiUrl = "https://react-articles-64045-default-rtdb.firebaseio.com";

export const showAlert = (text) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.SHOW_ALERT, payload: text });
    setTimeout(() => {
      dispatch({ type: actionTypes.HIDE_ALERT });
    }, 2000);
  };
};

export const createAccount = ({ email, password, userName }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const info = await request(`${authUrl}signUp?key=${apiKey}`, "POST", {
        email,
        password,
      });

      const res = await request(`${apiUrl}/store/user.json`, "POST", {
        email,
        userName,
      });

      await request(`${apiUrl}/store/user/${res.name}.json`);

      const response = await request(
        `${apiUrl}/store/user/${res.name}/.json`,
        "PUT",
        {
          email,
          userName,
          id: res.name,
        }
      );

      dispatch({
        type: actionTypes.CREATE_ACCOUNT,
        payload: response,
        info,
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const logInAccount = ({ email, password }) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await request(
        `${authUrl}signInWithPassword?key=${apiKey}`,
        "POST",
        {
          email,
          password,
        }
      );
      const users = await request(`${apiUrl}/store/user.json`);

      dispatch({ type: actionTypes.LOGIN, payload: response, users });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const logOutAccount = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      await firebase.auth().signOut();
      dispatch({ type: actionTypes.LOGOUT });
    } catch (err) {}
  };
};

export const createArticle = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const articleInfo = await request(
        `${apiUrl}/store/articles.json`,
        "POST",
        data
      );

      await request(
        `${apiUrl}/store/articles/${articleInfo.name}/.json`,
        "PUT",
        {
          ...data,
          id: articleInfo.name,
        }
      );
      dispatch({ type: actionTypes.CREATE_ARTICLE });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const getArticles = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await request(`${apiUrl}/store/articles.json`);
      dispatch({ type: actionTypes.GET_ARTICLES, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE });
    }
  };
};

export const getArticle = (articleId) => {
  return (dispatch) => {
    dispatch({ type: actionTypes.LOADING });
    dispatch({ type: actionTypes.GET_ARTICLE, payload: articleId });
  };
};

export const changePassword = (idToken, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      await request(`${authUrl}update?key=${apiKey}`, "POST", {
        idToken,
        password,
      });
      dispatch({ type: actionTypes.CHANGE_PASSWORD });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const changeUserName = (userInfo) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      const response = await request(
        `${apiUrl}/store/user/${userInfo.id}/.json`,
        "PUT",
        { ...userInfo }
      );
      dispatch({ type: actionTypes.CHANGE_USERNAME, payload: response });
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};

export const sendComment = (comment, id) => {
  return async (dispatch) => {
    try {
      dispatch({ type: actionTypes.LOADING });
      await request(
        `${apiUrl}/store/articles/${id}/comments.json`,
        "POST",
        comment
      );
      dispatch({ type: actionTypes.SEND_COMMENT });
      getArticles();
    } catch (err) {
      dispatch({ type: actionTypes.FAILURE, payload: err.message });
    }
  };
};
